import './style/index.css'

import Router from './router'
import View from './view'
import Model from './model'

import config from './config'

let user = new Model({
  useCache: true,
  query: `
  {
    user(login: "${config.user}") {
      name
      avatarUrl
      email
      websiteUrl
      url
      bio
      login
    }
  }`,
  onResProcess (res) {
    return res.data && res.data.data
  }
})

let router = new Router({
  '/': function () {
    return new View({
      el: '#app',
      model: user,
      tplStr: `
        <div>HELLO <%= user.name %></div>
      `
    })
  },
  '/name': function () {

  }
})

router.route('/')
