import './style/index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

import TypePrinter from './typeprinter'
let tp = new TypePrinter()

window.start = () => {
  window.stop = tp.loadLoop()
}

document.querySelector('#loading').appendChild(tp.el)
window.start()

let renderFunc = () => {
  ReactDOM.render(
    <App></App>,
    document.querySelector('#app')
  )
}

renderFunc()
