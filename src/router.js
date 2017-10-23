import View from './view'

class Router {
  constructor (routes) {
    this.routes = routes
    this._currentView = null
    this.start()
    this._matchRoute()
  }
  start () {
    window.onhashchange = (e) => {
      this._matchRoute(e)
    }
  }
  route (path = '/') {
    window.location.hash = path[0] === '/' ? path : `/${path}`
  }
  _matchRoute (e) {
    let hash = window.location.hash
    hash = hash.replace(/^#/, '')
    let onRoute = this.routes[hash]
    try {
      let cv = this._currentView
      if (cv instanceof View) {
        cv.destroy()
      }
      this._currentView = onRoute()
    } catch (e) {
      console.log(e)
    }
  }
}

export default Router
