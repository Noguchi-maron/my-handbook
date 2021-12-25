
export default  ({ store, route, redirect }) => {
  if (!store.getters.isAuthenticated && route.name !== 'login' && route.name !== 'signUp' && route.name !== 'timeLine' && route.name !== 'timeLine-authorId-bookId' && route.name !== 'emailConfirm') {
    redirect('/signup')
  }
  if (store.getters.isAuthenticated && route.name === 'index' && (route.name === 'login' || route.name === 'signUp')) {
    redirect('/mypage')
  }
  
}