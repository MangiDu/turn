import '../style/type-printer.css'
import React from 'react'
import { throttle } from 'lodash'

const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', null,
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', null,
                'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', null,
                'space']
const GAP_TIME = 10
class TypeWriter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      letters,
      activeLetterIndex: -1
    }
    this.setActiveLetterIndex = this.setActiveLetterIndex.bind(this)
    this.getKeyIndex = this.getKeyIndex.bind(this)
    this.keyHandler = this.keyHandler.bind(this)
  }
  componentDidMount () {
    this._throttledKeyHandler = throttle(this.keyHandler, GAP_TIME)
    window.addEventListener('keydown', this._throttledKeyHandler)
    window.addEventListener('keyup', this._throttledKeyHandler)
  }
  componentWillUnmount () {

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
          <div className="TypePrinter-paper">
            <p>loading...</p>
          </div>
          <div className="TypePrinter-handler"></div>
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
                  // return <span key={index} className={`TypePrinter-key ${activeIndex === index ? 'is-active' : ''}`} data-keyname={letter} onMouseDown={e => setIndexFunc(index)} onMouseUp={() => setIndexFunc(-1)}></span>
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

export default TypeWriter
