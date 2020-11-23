// rollup-plugin-json
import config from 'config/firebase-adminsdk.json'
import db from 'config/firebase'

/** @deprecated Removed in v2 */
export const instance = require('firebase-admin')
instance.initializeApp({
  credential: instance.credential.cert(config),
  databaseURL: db.databaseURL,
})

/** @deprecated Removed in v2 */
export function admin() {
  return instance
}

/** @deprecated Removed in v2 */
export const auth = instance.auth()

/** @deprecated Removed in v2 */
export const firestore = instance.firestore()

/** @deprecated Removed in v2 */
export const collection = firestore.collection

/** @deprecated Removed in v2 */
export function createCustomToken(uid) {
  if (!uid) {
    return
  }
  return auth.createCustomToken(uid)
}
