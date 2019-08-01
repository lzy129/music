// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { NavBar, Lazyload, Loading, Tabbar, TabbarItem, Toast } from "vant"
import Vuex from "vuex"
import axios from "axios"

Vue.prototype.axios = axios

Vue.use(Vuex)
Vue.use(NavBar).use(Lazyload).use(Loading).use(Tabbar).use(TabbarItem).use(Toast)
var store = new Vuex.Store({
  state: {
  },
  mutations: {
    VisibilityChange(state, data) {
      var data = data
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          data.play();
        }
      });
    }

  },
  getters: {

  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
