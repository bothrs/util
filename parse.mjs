import loadScript from './loadScript.mjs'

// Lazy parse
let instance
export function initParse() {
  if (!instance) {
    instance = init()
  }
  return instance

  async function init() {
    await loadScript(
      'https://unpkg.com/@babel/polyfill@7.2.5/dist/polyfill.min.js'
    )
    await loadScript('https://unpkg.com/parse@2.2.0/dist/parse.min.js')
    const Parse = window.Parse
    Parse.serverURL = process.env.PARSE_SERVER_URL // This is your Server URL
    Parse.initialize(
      process.env.PARSE_APP_ID, // This is your Application ID
      process.env.PARSE_JS_KEY // This is your Javascript key
    )

    const client = new Parse.LiveQueryClient({
      applicationId: process.env.PARSE_APP_ID,
      serverURL: process.env.PARSE_LIVE_URL,
      javascriptKey: process.env.PARSE_JS_KEY
    })
    client.open()
    return [Parse, client]
  }
}

export function unpacker(callback) {
  return data => callback(unpack(data))
}

export function unpack(obj) {
  if (Array.isArray(obj)) {
    return obj.map(unpack)
  }
  const { objectId: _id, attributes, createdAt, updatedAt } = obj
  return Object.assign(
    {
      _id,
      createdAt,
      updatedAt
    },
    attributes
  )
}

// export function pack(attributes) {
//   return {
//     id: attributes._id,
//     createdAt: attributes.createdAt,
//     updatedAt: attributes.updatedAt,
//     attributes: Object.assign(attributes, { _id: null, createdAt: null, updatedAt: null }),
//   }
// }
