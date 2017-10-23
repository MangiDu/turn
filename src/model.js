import axios from 'axios'

let mid = 0
const ls = window.localStorage
class Model {
  constructor (option = {}) {
    this._option = option
    this.query = option.query
    this.onResProcess = option.onResProcess
    this.useCache = option.useCache || false
    this.data = null
    this.mid = mid++
  }
  requestData () {
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
        Authorization: 'bearer 247e16c4285a56e08a33b4bb37ee90684cd248ea'
      },
      data: {
        query: this.query
      }
    }).then((res) => {
      this.data = this.onResProcess(res)
      if (this.useCache) {
        ls.setItem(key, JSON.stringify(this.data))
      }
    }, (err) => {
      console.log(err)
    })
  }
  getData() {
    return this.data
  }
}

export default Model
