import { template } from 'lodash'

import Model from './model'

class View {
  constructor (option = {}) {
    this._option = option
    this._getEl(option.el)
    this.tplStr = option.tplStr

    this.model = option.model
    this.model.requestData().then((data) => {
      if (data) {
        console.log(this.model.getData())
        if (this.el) this.render()
      }
    })
  }
  _getEl (el = '') {
    if (el instanceof Element) {
      this.el = el
    }
    else {
      this.el = document.querySelector(el.toString())
    }
  }
  template (data) {
    let compiled = template(this.tplStr)
    return compiled(data)
  }
  render () {
    let tpl = this.template(this.model.getData())
    console.log(tpl)
    this.el.innerHTML = tpl
  }
  destroy () {
    this.el.innerHTML = ''
    // TODO: freeze
  }
}

export default View
