import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDC-ynUqcD8Vtwutf_-Tdmxelp7BHnZpkE",
    authDomain: "dsjs-7bf10.firebaseapp.com",
    databaseURL: "https://dsjs-7bf10.firebaseio.com",
    projectId: "dsjs-7bf10",
    storageBucket: "dsjs-7bf10.appspot.com",
    messagingSenderId: "185845221249",
    appId: "1:185845221249:web:97f1804966694b39544a80",
    measurementId: "G-F2WE6JMEE5"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({
      prompt : 'select_account'
  });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
