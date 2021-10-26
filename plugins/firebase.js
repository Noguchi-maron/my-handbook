import Firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
if(!Firebase.apps.length){
  Firebase.initializeApp({
    apiKey: "AIzaSyCtO4Xs4gUPqfVSb_LFISTHKbhPcHJng7Y",
    authDomain: "my-handbook-328611.firebaseapp.com",
    projectId: "my-handbook-328611",
    storageBucket: "my-handbook-328611.appspot.com",
    messagingSenderId: "83790573202",
    appId: "1:83790573202:web:f9055db1c652d40249004b",
    measurementId: "G-W7NE85MY1G"
  })
  
};

export default( context, inject ) => {
  const $fb = {
    app: Firebase.app,
    auth: Firebase.auth,
    firestore: Firebase.firestore
  }
  inject('fb', $fb)
}
