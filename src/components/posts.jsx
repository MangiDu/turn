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
            bodyHTML
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

class Post extends React.Component {
  constructor (props) {
    super(props)

    let number = props.data.number
    this.state = {
      number,
      post: props.data,
      showContent: false
    }
  }
  toggleContent (isShowContent = !this.state.showContent) {
    if (!isShowContent && (this.el.getBoundingClientRect().top < 0)) {
      window.scroll(0, this.el.offsetTop)
    }
    this.setState({
      showContent: isShowContent
    })
  }
  render () {
    let data = this.state.post
    let labels = data.labels.edges.map(({ node }, index) => {
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

    let content = null
    if (this.state.showContent) {
      content = (
        <div>
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: data.bodyHTML }}></div>
          <div className="Posts-itemOperations">
            <a href="javascript:;" onClick={() => toggleContent(false)}>收起</a>
            <a className="Posts-itemRealUrl" href={data.url} target="_blank">原文地址</a>
          </div>
        </div>
      )
    }

    let toggleContent = this.toggleContent.bind(this)
    return (
      <li ref={el => this.el = el} className={`Posts-item ${this.state.showContent ? 'Posts-item--expanded' : ''}`}>
        <div className="Posts-itemHead">
          <a className="Posts-itemTitle" href="javascript:;" onClick={() => toggleContent()} title={data.title}>{data.title}</a>
          <ul className="Posts-labelList">
            {labels}
          </ul>
          <div className="Posts-itemDate">{new Date(data.publishedAt).toLocaleDateString()}</div>
        </div>
        {/* <a className="Posts-itemTitle" href={data.url} target="_blank" title={data.title}>{data.title}</a> */}
        {content}
      </li>
    )
  }
}

function Label (props) {
  return (
    <div className="Label" style={{ backgroundColor: props.color }}>
      <span className="Label-tip" style={{borderBottomColor: props.color}}></span>
    </div>
  )
}

export default Posts
