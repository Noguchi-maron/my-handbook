export const state = () => {
  return {
    user: null,
    bookmarks: [],
    email: ""
  };
};

export const mutations = {
  //user情報をset
  getUser(state, user) {
    state.user = user;
  },
  //userIdをset
  setUserId(state, uid) {
    state.userId = uid;
  },
  //user情報を空にする
  logout(state) {
    state.user = null;
  },
  //ブックマーク情報をset
  setBookmark(state, bookmark) {
    state.bookmarks.unshift(bookmark);
  },
  //ブックマークの情報を削除
  removeBookmark(state, index) {
    state.bookmarks.splice(index, 1);
    console.log(state.bookmarks);
  },
  //Emailアドレスをset
  setEmail(state, email) {
    state.email = email;
  }
};

export const actions = {
  //user情報を取得
  async getUser({ commit }, uid) {
    if (uid !== "") {
      const userData = this.$fb
        .firestore()
        .collection("users")
        .doc(uid);
      await userData.get().then(d => {
        if (d.exists) {
          commit("getUser", d.data());
          this.$router.push("/mypage");
        } else {
          console.log("Error");
        }
      });
    }
  },
  //ログアウト処理
  async logout({ commit }) {
    await this.$fb.auth().signOut();
    commit("logout");
  },
  //ブックマークをfirebaseから取得
  async getBookmarks({ commit }, uid) {
    const books = await this.$fb
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("bookmarks")
      .orderBy("date", "desc")
      .get();
    const bookmarks = books.docs.map(bookmarkData => bookmarkData.data());
    bookmarks.forEach(bookmark => {
      commit("setBookmark", bookmark);
    });
  },
  //ブックマークの登録・解除
  async updateBookmarks(context, book) {
    const collection = this.$fb
      .firestore()
      .collection("users")
      .doc(context.getters.userId)
      .collection("bookmarks");
    const containsBookmark = context.getters.bookmarks.findIndex(({ id }) => {
      return id === book.id;
    });
    if (containsBookmark === -1) {
      const bookmark = {
        date: this.$fb.firestore.FieldValue.serverTimestamp(),
        id: book.id,
        authorId: book.authorId
      };
      await collection.doc(book.id).set({ ...bookmark });
      context.commit("setBookmark", bookmark);
    } else {
      await collection.doc(book.id).delete();
      context.commit("removeBookmark", containsBookmark);
    }
  },
  //Emailアドレスの取得
  getEmail({ commit }, email) {
    commit("setEmail", email);
  }
};

export const getters = {
  user(state) {
    return state.user;
  },
  userId(state) {
    return state.user.id;
  },
  isAuthenticated(state) {
    return !!state.user;
  },
  bookmarks(state) {
    return state.bookmarks;
  },
  email(state) {
    return state.email;
  }
};
