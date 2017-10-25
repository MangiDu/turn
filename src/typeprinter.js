import './style/type-printer.css'
import { throttle } from 'lodash'

const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', null, 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', null, 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', null, 'space']
const loading = 'loading...'.split('')

export default class TypePrinter {
  constructor (el) {
    this.init()
  }
  init () {
    let el = document.createElement('div')
    el.classList.add('TypePrinter')
    el.innerHTML = `
      <div class="TypePrinter-paperSlot">
        <div class="TypePrinter-paper">
          <p class="js-content">loading...</p>
        </div>
        <div class="TypePrinter-handler"></div>
      </div>
      <div class="TypePrinter-body">
        <div class="TypePrinter-rod"></div>
        <div class="TypePrinter-keyboard">
          <div class="js-keys">${this._getKeys()}</div>
        </div>
      </div>
    `
    // document.body.appendChild(el)


    let funcMap = {
      keydown: 'add',
      keyup: 'remove'
    }
    this._keyHandler = throttle((e) => {
      let key = e.key === ' ' ? 'space' : e.key
      let keyEl = el.querySelector(`[data-keyname="${key}"]`)
      keyEl ? keyEl.classList[funcMap[e.type]]('is-active') : null
    }, 10)
    window.addEventListener('keyup', this._keyHandler)
    window.addEventListener('keydown', this._keyHandler)

    this.el = el

    window.start = () => {
      window.stop = this.loadLoop()
    }
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
  loadLoop (callback = () => {}) {
    let p = this.loadingOnce()
    let flag = true
    let loop = () => {
      if (flag) {
        this.el.querySelector('.js-content').innerHTML = ''
        return this.loadingOnce(loop)
      }
      return Promise.reject()
    }
    p.then(loop).catch((e) => {
      if (typeof callback === 'function') {
        callback()
      }
    })
    return () => {
      flag = false
    }
  }
  loadingOnce (func = () => {}) {
    let p = Promise.resolve()
    let contentEl = this.el.querySelector('.js-content')
    contentEl.innerHTML = ''
    loading.forEach((letter) => {
      p = p.then(() => {
        let e = new Event('keydown')
        e.key = letter
        window.dispatchEvent(e)
        contentEl.innerHTML = contentEl.innerHTML + letter
        return new Promise((resolve) => {
          setTimeout(function () {
            let e = new Event('keyup')
            e.key = letter
            window.dispatchEvent(e)
            setTimeout(resolve, 150)
          }, 100)
        })
      })
    })
    return p.then(func)
  }
}
