import React from 'react'
import Model from '../model'

const repository = new Model({
  query: `{
    repository(owner: "MangiDu", name: "blog") {
      issues(first: 2, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            number
            title
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
  return (
    <li className="Posts-item">
      <a href={`https://github.com/MangiDu/blog/issues/${data.number}`} target="_blank">{data.title}</a>
    </li>
  )
}

export default Posts
