import { getJSON } from 'util/fetch'
import { optimist } from 'util/memo'

export const getmeta = optimist(get, 1e9)

function get(url) {
  if (!url) {
    return
  }
  return getJSON('https://getmeta.info/json?url=' + encodeURIComponent(url))
}
