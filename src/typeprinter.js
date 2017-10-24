import './style/type-printer.css'

const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', null, 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', null, 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', null, 'space']
const loading = 'loading...'.split('')

export default class TypePrinter {
  constructor () {
    this.init()
  }
  init () {
    let el = document.createElement('div')
    el.classList.add('TypePrinter')
    el.innerHTML = `
      <div class="TypePrinter-body">
        <div class="TypePrinter-keyboard">
          <div class="js-keys">${this._getKeys()}</div>
        </div>
      </div>
    `
    document.body.appendChild(el)

    this._keyHandler = (e) => {
      let key = e.key === ' ' ? 'space' : e.key
      let keyEl = el.querySelector(`[data-keyname="${key}"]`)
      keyEl ? keyEl.classList.toggle('is-active') : null
    }
    window.addEventListener('keyup', this._keyHandler)
    window.addEventListener('keydown', this._keyHandler)

    this.el = el

    this.loading()
  }
  _getKeys () {
    return letters.reduce(function (data = '', letter) {
      if ((data && data.length === 1) || typeof data !== 'string') {
        data = `<span class="TypePrinter-key" data-keyname="${data}"></span>`
      }
      if (letter !== null) {
        data += `<span class="TypePrinter-key" data-keyname="${letter}"></span>`
      }
      else {
        data += '<br>'
      }
      return data
    })
  }
  loading () {
    let p = Promise.resolve()
    loading.forEach((letter) => {
      p = p.then(() => {
        let e = new Event('keydown')
        e.key = letter
        window.dispatchEvent(e)
        return new Promise((resolve) => {
          setTimeout(function () {
            let e = new Event('keyup')
            e.key = letter
            window.dispatchEvent(e)
            setTimeout(resolve, 100)
          }, 300)
        })
      })
    })
    return p.then(() => {
      console.log('one turn loading finished')
    })
  }
}
