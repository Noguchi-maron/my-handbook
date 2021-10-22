export const state =  () => {
  return {
    loginStatus: false,
    user: {},
  }
}

export const mutations = {
  loadLogin (state, boolean) {
    state.loginStatus = boolean
  },
  getUser (state, user) {
    state.user = user
  }
}

export const actions = {
  async loadLogin ({ dispatch, commit }) {
    await this.$fb.auth().onAuthStateChanged((user) => {
      if (user) {
        commit('loadLogin', true)
        dispatch('getUser', user.uid)
      } else {
        commit('loadLogin', false)
        this.$router.push('/')
      }
    })
  },
  async getUser ({ commit }, uid) {
    const userData = this.$fb.firestore().collection('users').doc(uid)
    await userData.get().then(d => {
      if(d.exists) {
        commit('getUser', d.data())
      } else {
        console.log('Error')
      }
    })
  }
}