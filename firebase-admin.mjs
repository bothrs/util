// rollup-plugin-json
import config from 'config/firebase-adminsdk.json'
import db from 'config/firebase'

export const instance = require('firebase-admin')
instance.initializeApp({
  credential: instance.credential.cert(config),
  databaseURL: db.databaseURL,
})

export function admin() {
  return instance
}

export const auth = instance.auth()

export const firestore = instance.firestore()

export const collection = firestore.collection

export function createCustomToken(uid) {
  if (!uid) {
    return
  }
  return auth.createCustomToken(uid)
}
