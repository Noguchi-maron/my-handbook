export const BookParts = () => import('../..\\components\\BookParts.vue' /* webpackChunkName: "components/book-parts" */).then(c => wrapFunctional(c.default || c))
export const BooksPage = () => import('../..\\components\\BooksPage.vue' /* webpackChunkName: "components/books-page" */).then(c => wrapFunctional(c.default || c))
export const CommentForm = () => import('../..\\components\\CommentForm.vue' /* webpackChunkName: "components/comment-form" */).then(c => wrapFunctional(c.default || c))
export const LoggedIn = () => import('../..\\components\\LoggedIn.vue' /* webpackChunkName: "components/logged-in" */).then(c => wrapFunctional(c.default || c))
export const LoginGoogle = () => import('../..\\components\\LoginGoogle.vue' /* webpackChunkName: "components/login-google" */).then(c => wrapFunctional(c.default || c))
export const LoginParts = () => import('../..\\components\\LoginParts.vue' /* webpackChunkName: "components/login-parts" */).then(c => wrapFunctional(c.default || c))
export const LogoutParts = () => import('../..\\components\\LogoutParts.vue' /* webpackChunkName: "components/logout-parts" */).then(c => wrapFunctional(c.default || c))
export const MapParts = () => import('../..\\components\\MapParts.vue' /* webpackChunkName: "components/map-parts" */).then(c => wrapFunctional(c.default || c))
export const NuxtLogo = () => import('../..\\components\\NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const ProfilePage = () => import('../..\\components\\ProfilePage.vue' /* webpackChunkName: "components/profile-page" */).then(c => wrapFunctional(c.default || c))
export const Tutorial = () => import('../..\\components\\Tutorial.vue' /* webpackChunkName: "components/tutorial" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
