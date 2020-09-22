import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const fbConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPLICATION_ID
}

interface FirebaseApp extends firebase.app.App {
  length?: number;
}

let app: FirebaseApp = firebase.initializeApp(fbConfig)

async function init() {
  app = app.length ? firebase.initializeApp(fbConfig) : firebase.app()
}
(async () => await init())()

const firestore = app.firestore()
const storage = app.storage()
const auth = app.auth()

firestore.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
})

firestore.enablePersistence({
  synchronizeTabs: true
})

export {
  firebase,
  firestore,
  storage,
  auth
}
