import '../style/type-printer.css'
import React from 'react'
import { throttle } from 'lodash'

const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', null,
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', null,
                'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', null,
                'space']
class TypeWriter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      letters,
      activeLetterIndex: -1
    }
    this.setActiveLetterIndex = this.setActiveLetterIndex.bind(this)
  }
  componentDidMount () {

  }
  setActiveLetterIndex (index) {
    this.setState({
      activeLetterIndex: index
    })
  }
  render () {
    let setIndexFunc = throttle(this.setActiveLetterIndex, 10)
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
          <div className="TypePrinter-keyboard">
            {
              letters.map((letter, index) => {
                if (letter !== null) {
                  return <span key={index} className={`TypePrinter-key ${activeIndex === index ? 'is-active' : ''}`} data-keyname={letter} onMouseDown={e => setIndexFunc(index)} onMouseUp={() => setIndexFunc(-1)}></span>
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

export default TypeWriter
