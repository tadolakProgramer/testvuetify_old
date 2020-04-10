import Vue from 'vue'
import VueRouter from 'vue-router'

import IsLogin from './isLogin'

import notification from "../views/notification/notification";
import newnotification from "../views/notification/newnotification";


Vue.use(VueRouter)

const routes = [

  {
    path: '/notification',
    name: 'notification',
    component: notification,
    beforeEnter: IsLogin
  },
  {
    path: '/notification/new/:maszynaId',
    name: 'newnotification',
    component: newnotification,
    beforeEnter: IsLogin
  }
]

const router = new VueRouter({
  routes
})

export default router
