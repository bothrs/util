/**
 * Memoize function
 *
 * @param {Function} func - Expensive function
 * @param {number} [timeout] - Milliseconds to wait before running the function again
 * @returns {Function} Function that returns optimistic value of `func`
 */
export function memo(func, timeout) {
  const cache = {}
  const f = function (a, b, c) {
    const key = JSON.stringify([a, b, c])
    if (!cache[key]) {
      const val = func(a, b, c)
      cache[key] = val
      timeout &&
        setTimeout(() => {
          cache[key] = null
        }, timeout)
    }
    return cache[key]
  }
  // TODO: expire this?
  f.set = (key, value) => (cache[JSON.stringify(key)] = value)
  f.reset = (a, b, c) => (cache[JSON.stringify([a, b, c])] = null)
  return f
}

/**
 * Runs functions optimistically
 *
 * @param {Function} func - Expensive function
 * @param {number} [timeout] - Milliseconds to wait before running the function again
 * @returns {Function} Function that returns optimistic value of `func`
 */
export function optimist(func, timeout = 60000) {
  const cache = {}
  const time = {}
  const f = function (a, b, c) {
    const key = JSON.stringify([a, b, c])
    const now = Date.now()
    if (!cache[key]) {
      time[key] = now + timeout
      return (cache[key] = func(a, b, c))
    }
    if (time[key] < now) {
      time[key] = now + timeout
      Promise.resolve(func(a, b, c))
        .then(val => (cache[key] = val))
        .catch(e => console.log('optimist catch', e && e.message, a, b, c))
    }
    return cache[key]
  }
  f.set = (key, value) => (cache[JSON.stringify(key)] = value)
  f.reset = (a, b, c) => (cache[JSON.stringify([a, b, c])] = null)
  return f
}
