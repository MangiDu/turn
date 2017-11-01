import React from 'react'
import Posts from './components/posts'
import TypeWriter from './components/type-writer'
import Model from './model'

const user = new Model({
  query: `{
    user(login: "MangiDu") {
      name
      avatarUrl
      email
      websiteUrl
      url
      bio
      login
    }
  }`,
  dealRes ({data}) {
    return data.data && data.data.user
  }
})

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {user: {}}
  }
  componentDidMount () {
    user.request().then((data) => {
      this.setState({
        user: user.getData()
      })
      if (window.stop) window.stop()
    })
  }
  componentWillUnmount () {
  }
  render () {
    return (
      <div>
        <User user={this.state.user}></User>
        <Posts></Posts>
        <div className="loading">
          <TypeWriter></TypeWriter>
        </div>
      </div>
    )
  }
}

function User (props) {
  return (
    <div className="User">
      <a className="User-link" href={props.user.url} target="_blank"><img className="User-avatar" src={props.user.avatarUrl} alt={props.user.name}></img></a>
      <div className="User-name">{props.user.name}</div>
      <div className="User-bio">{props.user.bio}</div>
    </div>
  )
}

export default App
