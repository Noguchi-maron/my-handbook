import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _204c197b = () => interopDefault(import('..\\pages\\bookmark\\index.vue' /* webpackChunkName: "pages/bookmark/index" */))
const _01dbcbf5 = () => interopDefault(import('..\\pages\\emailConfirm.vue' /* webpackChunkName: "pages/emailConfirm" */))
const _0308b070 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _2ed3ccd6 = () => interopDefault(import('..\\pages\\MyPage\\index.vue' /* webpackChunkName: "pages/MyPage/index" */))
const _67cfc73a = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "pages/profile/index" */))
const _377d856f = () => interopDefault(import('..\\pages\\setting.vue' /* webpackChunkName: "pages/setting" */))
const _328fab2e = () => interopDefault(import('..\\pages\\signUp.vue' /* webpackChunkName: "pages/signUp" */))
const _bce74520 = () => interopDefault(import('..\\pages\\timeLine\\index.vue' /* webpackChunkName: "pages/timeLine/index" */))
const _594bceb0 = () => interopDefault(import('..\\pages\\MyPage\\create.vue' /* webpackChunkName: "pages/MyPage/create" */))
const _d8a8b698 = () => interopDefault(import('..\\pages\\bookmark\\_authorId\\index.vue' /* webpackChunkName: "pages/bookmark/_authorId/index" */))
const _1c373b1b = () => interopDefault(import('..\\pages\\MyPage\\_bookId\\index.vue' /* webpackChunkName: "pages/MyPage/_bookId/index" */))
const _b49274c2 = () => interopDefault(import('..\\pages\\timeLine\\_authorId\\index.vue' /* webpackChunkName: "pages/timeLine/_authorId/index" */))
const _b818ce5e = () => interopDefault(import('..\\pages\\MyPage\\_bookId\\edit.vue' /* webpackChunkName: "pages/MyPage/_bookId/edit" */))
const _f5c4401a = () => interopDefault(import('..\\pages\\MyPage\\_bookId\\search\\index.vue' /* webpackChunkName: "pages/MyPage/_bookId/search/index" */))
const _821d4606 = () => interopDefault(import('..\\pages\\bookmark\\_authorId\\_bookId\\index.vue' /* webpackChunkName: "pages/bookmark/_authorId/_bookId/index" */))
const _1e75db5d = () => interopDefault(import('..\\pages\\MyPage\\_bookId\\_destId\\index.vue' /* webpackChunkName: "pages/MyPage/_bookId/_destId/index" */))
const _36d51472 = () => interopDefault(import('..\\pages\\timeLine\\_authorId\\_bookId\\index.vue' /* webpackChunkName: "pages/timeLine/_authorId/_bookId/index" */))
const _34d404b1 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/bookmark",
    component: _204c197b,
    name: "bookmark"
  }, {
    path: "/emailConfirm",
    component: _01dbcbf5,
    name: "emailConfirm"
  }, {
    path: "/login",
    component: _0308b070,
    name: "login"
  }, {
    path: "/MyPage",
    component: _2ed3ccd6,
    name: "MyPage"
  }, {
    path: "/profile",
    component: _67cfc73a,
    name: "profile"
  }, {
    path: "/setting",
    component: _377d856f,
    name: "setting"
  }, {
    path: "/signUp",
    component: _328fab2e,
    name: "signUp"
  }, {
    path: "/timeLine",
    component: _bce74520,
    name: "timeLine"
  }, {
    path: "/MyPage/create",
    component: _594bceb0,
    name: "MyPage-create"
  }, {
    path: "/bookmark/:authorId",
    component: _d8a8b698,
    name: "bookmark-authorId"
  }, {
    path: "/MyPage/:bookId",
    component: _1c373b1b,
    name: "MyPage-bookId"
  }, {
    path: "/timeLine/:authorId",
    component: _b49274c2,
    name: "timeLine-authorId"
  }, {
    path: "/MyPage/:bookId/edit",
    component: _b818ce5e,
    name: "MyPage-bookId-edit"
  }, {
    path: "/MyPage/:bookId/search",
    component: _f5c4401a,
    name: "MyPage-bookId-search"
  }, {
    path: "/bookmark/:authorId/:bookId",
    component: _821d4606,
    name: "bookmark-authorId-bookId"
  }, {
    path: "/MyPage/:bookId/:destId",
    component: _1e75db5d,
    name: "MyPage-bookId-destId"
  }, {
    path: "/timeLine/:authorId/:bookId",
    component: _36d51472,
    name: "timeLine-authorId-bookId"
  }, {
    path: "/",
    component: _34d404b1,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
