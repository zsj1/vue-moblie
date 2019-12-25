// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'amfe-flexible/index.js'
import axios from 'axios';

import { Tabbar, TabbarItem, Icon, Search, Panel, Row, Col, Image, List, Toast, Cell, NavBar } from 'vant';

Vue.use(Tabbar).use(TabbarItem).use(Icon).use(Search).use(Panel).use(Row).use(Col).use(Image).use(List).use(Toast).use(Cell).use(NavBar);
Vue.prototype.$axios = axios; // 引入axios，并加到原型链中
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

