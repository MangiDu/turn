import React from 'react'

const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', null,
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', null,
                'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', null,
                'space']
class TypeWriter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      letters
    }
  }
  componentDidMount () {

  }
  render () {
    return (
      <div className="TypePrinter">
        <div className="TypePrinter-paperSlot">
          <div className="TypePrinter-paper" ref={(p) => {this.paper = p}}>
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
                  return <span key={index} className="TypePrinter-key" data-keyname={letter}></span>
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
