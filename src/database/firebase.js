import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
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
// firebase.initializeApp(firebaseConfig)
let app
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore()

export { auth, db }
