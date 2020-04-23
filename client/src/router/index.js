import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from "../views/Login";

import failure from "../views/failure/failure";
import newfailure from "../views/failure/newfailure";
import failureHistory from "../views/failure/failureHistory";

import notification from "../views/notification/notification";
import newnotification from "../views/notification/newnotification";
import AllfailureHistory from "../views/failure/AllfailureHistory";


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
    path: '/notification/new/:IDS',
    name: 'newnotification',
    component: newnotification,
    beforeEnter: IsLogin
  },

    {
        path: '/failure',
        name: 'failure',
        component: failure,
        beforeEnter: IsLogin
    },
    {
        path: '/failure/new/:IDS',
        name: 'newfailure',
        component: newfailure,
        beforeEnter: IsLogin
    },
    {
        path: '/failure/history/:IdMaszyna',
        name: 'failureHistory',
        component: failureHistory,
        beforeEnter: IsLogin
    },
    {
        path: '/failure/all',
        name: 'failureAll',
        component: AllfailureHistory,
        beforeEnter: IsLogin
    },
]

const router = new VueRouter({
  routes
})

export default router
