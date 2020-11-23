/**
 * Store a value in localStorage
 *
 * @param {string} key
 * @param [value] - JSON-stringifyable value
 */
export function ls(key, value) {
  try {
    if (typeof value === 'undefined') {
      return JSON.parse(window.localStorage[key] || 'null')
    } else {
      window.localStorage[key] = JSON.stringify(value)
      return value
    }
  } catch (e) {}
}
