import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBTUNt8DepZKs4_sI5soUcoJeIsWHt7V1Q",
  authDomain: "react-messenger-redux.firebaseapp.com",
  databaseURL: "https://react-messenger-redux.firebaseio.com",
  projectId: "react-messenger-redux",
  storageBucket: "react-messenger-redux.appspot.com",
  messagingSenderId: "838533828142",
  appId: "1:838533828142:web:4390eecdcdbd0bddf719bf"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;