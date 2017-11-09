import React from 'react'
import Model from '../model'

const repository = new Model({
  query: `{
    repository(owner: "MangiDu", name: "blog") {
      issues(first: 5, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            number
            title
            publishedAt
            url
            labels(first: 3) {
              edges {
                node {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  }`,
  dealRes ({data}) {
    return data.data && data.data.repository
  }
})

class Posts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: []
    }
  }
  componentDidMount () {
    repository.request().then((data) => {
      this.setState({
        posts: data.issues.edges
      })
      console.log(this.state.posts)
    })
  }
  render () {
    const posts = this.state.posts.map((post, index) => (
      <Post key={index} data={post.node}></Post>
    ))
    return (
      <ul className="Posts">
        {posts}
      </ul>
    )
  }
}

function Post ({data}) {
  let labels = data.labels.edges.map(({node}, index) => {
    let color = `#${node.color}`
    return (
      <li className="Posts-label" key={index}>
        <a href={`https://github.com/MangiDu/blog/labels/${node.name}`} target="_blank" style={{ color }}>
          <Label color={color}></Label>
          <span>{node.name}</span>
        </a>
      </li>
    )
  })
  return (
    <li className="Posts-item">
      <a className="Posts-itemTitle" href={data.url} target="_blank" title={data.title}>{data.title}</a>
      <ul className="Posts-labelList">
        {labels}
      </ul>
      <div className="Posts-itemDate">{new Date(data.publishedAt).toLocaleDateString()}</div>
    </li>
  )
}

function Label (props) {
  return (
    <div className="Label" style={{ backgroundColor: props.color }}>
      <span className="Label-tip" style={{borderBottomColor: props.color}}></span>
    </div>
  )
}

export default Posts
