import * as firebase from 'firebase/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBiP9BeDV9iExImCN5-Hb4iQGD8zUpP7e4',
  authDomain: 'regiotram-react-firebase.firebaseapp.com',
  projectId: 'regiotram-react-firebase',
  storageBucket: 'regiotram-react-firebase.appspot.com',
  messagingSenderId: '722679386828',
  appId: '1:722679386828:web:c2496ff16a5520bd432869',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default {
  firebase,
  db,
}
