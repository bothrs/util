import { getJSON } from './fetch.mjs'
import { optimist } from './memo.mjs'

export const feed2json = optimist(get, 1e9)

function get(url) {
  if (!url) {
    return
  }
  return getJSON('https://feed2json.org/convert?url=' + encodeURIComponent(url))
}
