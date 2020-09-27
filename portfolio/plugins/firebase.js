import firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyBcuCB_7PnEvUPhX6qxlkCv5QMrk_dn0qo",
      authDomain: "my-portfolio-37cc8.firebaseapp.com",
      databaseURL: "https://my-portfolio-37cc8.firebaseio.com",
      projectId: "my-portfolio-37cc8",
      storageBucket: "my-portfolio-37cc8.appspot.com",
      messagingSenderId: "503122592716",
      appId: "1:503122592716:web:247bf86f03902257e65369"
    }
  )
}
export default firebase;