import axios from 'axios'
import common from './common'

let mid = 0
const ls = window.localStorage
class Model {
  constructor (option = {}) {
    this.update(option)
    this.data = null
    this.mid = mid++
  }
  update (option = {}) {
    this.query = option.query
    this.dealRes = option.dealRes || ((data) => (data))
    this.useCache = option.useCache || false
    return this
  }
  request () {
    if (this.useCache) {
      let key = `model${this.mid}`
      let lsData = ls.getItem(key)
      if (lsData && lsData.length) {
        this.data = JSON.parse(lsData)
        return Promise.resolve()
      }
    }

    return axios({
      url: 'https://api.github.com/graphql',
      method: 'post',
      headers: {
        Authorization: `bearer ${common.token}`
      },
      data: {
        query: this.query
      }
    }).then((res) => {
      this.data = this.dealRes(res)
      if (this.useCache) {
        ls.setItem(key, JSON.stringify(this.data))
      }
      return Promise.resolve(this.data)
    }, (err) => {
      return Promise.reject(err)
    })
  }
  getData() {
    return this.data
  }
}

export default Model
