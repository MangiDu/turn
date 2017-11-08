import './style/index.css'

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
