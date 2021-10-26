export const state =  () => {
  return {
    loginStatus: false,
    user: {},
    destsLength: 0,
  
  }
}

export const mutations = {
  loadLogin (state, boolean) {
    state.loginStatus = boolean
  },
  getUser (state, user) {
    state.user = user
  },
  logout (state) {
    state.user = {}
  },
  getDestsLength (state, l) {
    state.destsLength = l
  }
}

export const actions = {
  //ログイン中かを判断
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
  //user情報を取得
  async getUser ({ commit }, uid) {
    const userData = this.$fb.firestore().collection('users').doc(uid)
    await userData.get().then(d => {
      if(d.exists) {
        commit('getUser', d.data())
      } else {
        console.log('Error')
      }
    })
  },
  getDestsLength ({commit}, l) {
    commit('getDestsLength', l)
  },

}

export const getters = {
  usersCollection () {
    return this.$fb.firestore().collection('users')
  },
  booksCollection (state) {
    return $fb.firestore().collection('users').doc(state.user.id).collection('books')
  }
}