import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'CreateWindow',
      component: () => import('./components/CreateWindow.vue')
    },
    {
      path: '/Window',
      name: 'Window',
      component: () => import('./components/Window.vue')
    }
  ]
})
