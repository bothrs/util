import config from 'config/firebase'

export default function firebaseJS(req, res, next) {
  if (req.url === '/__/firebase/init.js') {
    return res.end(`firebase.initializeApp(${JSON.stringify(config)})`)
  }
  if (req.url.startsWith('/__/firebase/6')) {
    return res.redirect(
      301,
      req.url.replace('/__/firebase/', 'https://unpkg.com/firebase@')
    )
  }
  next()
}
