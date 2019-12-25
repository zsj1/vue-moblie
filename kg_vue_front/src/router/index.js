import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Me from '../pages/Me'
import Enterprise from '../pages/Enterprise'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        showTab: true
      }
    },
    {
      path: '/me',
      name: 'me',
      component: Me, meta: {
        showTab: true
      }
    },
    {
      path: '/enterprise/:entName',
      name: 'enterprise',
      component: Enterprise, 
      meta: {
        showTab: false
      }
    }
  ]
})
