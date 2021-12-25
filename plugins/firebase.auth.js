import { auth } from "~/plugins/firebase.js";
//ロード時にログイン状態を調べる
export default context => {
  const { store } = context;
  auth().onAuthStateChanged(user => {
    if (user) {
      store.dispatch("getBookmarks", user.uid);
      store.dispatch("getUser", user.uid);
      store.dispatch("getEmail", user.email);
    } else {
      store.dispatch("getUser", "");
    }
  });
};
