import { template } from 'lodash'

import Model from './model'

class View {
  constructor (option = {}) {
    this._option = option
    this._getEl(option.el)
    this.tplStr = option.tplStr

    this.model = option.model
    this.model.requestData().then(() => {
      if (this.el) this.render()
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
    this.el.innerHTML = this.template(this.model.getData())
  }
  destroy () {
    this.el.innerHTML = ''
    // TODO: freeze
  }
}

export default View
