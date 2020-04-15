import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from "../views/Login";

import notification from "../views/notification/notification";
import newnotification from "../views/notification/newnotification";

import IsLogin from './isLogin'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: IsLogin
  },
  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/notification',
    name: 'notification',
    component: notification,
    beforeEnter: IsLogin
  },
  {
    path: '/notification/new/',
    name: 'newnotification',
    component: newnotification,
    beforeEnter: IsLogin
  }
]

const router = new VueRouter({
  routes
})

export default router
