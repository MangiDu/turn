import '../style/type-printer.css'
import React from 'react'
import { throttle } from 'lodash'

const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', null,
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', null,
                'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', null,
                'space']
const GAP_TIME = 10
const LOADING_TEXT = 'loading.please wait.'
class TypeWriter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      letters,
      activeLetterIndex: -1,
      progress: 0,
      isHandlerPressed: false
    }
    this.setActiveLetterIndex = this.setActiveLetterIndex.bind(this)
    this.getKeyIndex = this.getKeyIndex.bind(this)
    this.keyHandler = this.keyHandler.bind(this)
  }
  componentDidMount () {
    this._throttledKeyHandler = throttle(this.keyHandler, GAP_TIME)
    window.addEventListener('keydown', this._throttledKeyHandler)
    window.addEventListener('keyup', this._throttledKeyHandler)
    this.setTypeTimer()
  }
  componentWillUnmount () {
    window.removeEventListener('keydown', this._throttledKeyHandler)
    window.removeEventListener('keyup', this._throttledKeyHandler)
    clearInterval(this._paperTimer)
  }
  setTypeTimer () {
    clearInterval(this._paperTimer)
    this._paperTimer = setInterval(() => {
      let progress = this.state.progress
      let isHandlerPressed = false
      if (progress % 20 === 19) {
        isHandlerPressed = true
      }
      if (progress % 2) {
        let index = Math.floor(progress / 2)
        this.setActiveLetterIndex(this.getKeyIndex(LOADING_TEXT[index % 20]))
      }

      progress = (progress + 1) % 100
      this.setState({
        progress,
        isHandlerPressed
      })
    }, 100)
  }
  setActiveLetterIndex (index) {
    this.setState({
      activeLetterIndex: index
    })
  }
  getKeyIndex (key) {
    return this.state.letters.findIndex((letter) => {
      return letter === key
    })
  }
  keyHandler (e) {
    let index = -1
    if (e.type === 'keydown') {
      let key = e.key === ' ' ? 'space' : e.key
      index = this.getKeyIndex(key)
    }

    this.setActiveLetterIndex(index)
  }
  render () {
    let setIndexFunc = throttle(this.setActiveLetterIndex, GAP_TIME)
    let activeIndex = this.state.activeLetterIndex
    return (
      <div className="TypePrinter">
        <div className="TypePrinter-paperSlot">
          <div className={`TypePrinter-handler ${this.state.isHandlerPressed ? 'pressed' : ''}`}></div>
          <Paper progress={this.state.progress}></Paper>
        </div>
        <div className="TypePrinter-body">
          <div className="TypePrinter-rod"></div>
          <div className="TypePrinter-keyboard" onMouseDown={({target: {dataset = {}}}) => {
            let keyname = dataset.keyname
            if (keyname && keyname.length) {
              setIndexFunc(this.getKeyIndex(keyname))
            }
          }} onMouseUp={() => setIndexFunc(-1)}>
            {
              letters.map((letter, index) => {
                if (letter !== null) {
                  return <Key key={index} letter={letter} isActive={activeIndex === index}></Key>
                }
                return <br key={index}/>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

function Key (props) {
  return (
    <span className={`TypePrinter-key ${props.isActive ? 'is-active' : ''}`} data-keyname={props.letter}></span>
  )
}

function Paper (props) {
  let progress = Math.min(Math.max(props.progress, 0), 100)
  let lineCount = Math.ceil(progress / 20)
  let ratio = (progress % 20) * 5
  const style = {
    'transform': `translate(${60 - 1.4 * ratio}px ,${25 - 15 * (lineCount - 4)}px)`
  }
  let lines = []
  for (let i = 0; i < lineCount; i++) {
    if (i === lineCount - 1) {
      lines.push(<div key={i} className="TypePrinter-text" style={{width: `${ratio ? ratio : 100}%`}}></div>)
    }
    else {
      lines.push(<div key={i} className="TypePrinter-text"></div>)
    }
  }
  return (
    <div className="TypePrinter-paper" style={style}>
      {lines}
    </div>
  )
}

export default TypeWriter
