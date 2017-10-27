import React from 'react'
import axios from 'axios'

class Posts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [{
        title: 'killer\'s fate'
      }, {
        title: 'name unknown'
      }, {
        title: 'civializaiton'
      }]
    }
  }
  render () {
    const posts = this.state.posts.map((post, index) => (
      <Post key={index} title={post.title}></Post>
    ))
    return (
      <div>
        {posts}
      </div>
    )
  }
}

function Post (props) {
  return (
    <div>{props.title}</div>
  )
}

export default Posts
