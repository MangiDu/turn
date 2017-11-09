import './style/index.css'
import '../node_modules/github-markdown-css/github-markdown.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

let renderFunc = () => {
  ReactDOM.render(
    <App></App>,
    document.querySelector('#app')
  )
}

renderFunc()
