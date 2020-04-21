/**
 * Memoize function
 *
 * @param {Function} func - Expensive function
 * @param {number} [timeout] - Milliseconds to wait before running the function again
 * @returns {Function} Function that returns optimistic value of `func`
 */
export function memo<T extends (...args: any[]) => any>(
  func: T,
  timeout?
): (...funcArgs: Parameters<T>) => ReturnType<T> {
  const cache = {}
  const f = function(...[a, b, c]: Parameters<T>): ReturnType<T> {
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

export function optimist<T extends (...args: any[]) => any>(
  func: T,
  timeout = 60000
): (...funcArgs: Parameters<T>) => ReturnType<T> {
  const cache = {}
  const time = {}
  const f = function(...[a, b, c]: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify([a, b, c])
    if (!cache[key]) {
      time[key] = Date.now() + timeout
      return (cache[key] = func(a, b, c))
    }
    if (time[key] < Date.now()) {
      time[key] = Date.now() + timeout
      Promise.resolve(func(a, b, c))
        .then(val => (cache[key] = val))
        .catch(() => console.log('optimist catch', a, b, c))
    }
    return cache[key]
  }
  f.set = (key, value) => (cache[JSON.stringify(key)] = value)
  f.reset = (a, b, c) => (cache[JSON.stringify([a, b, c])] = null)
  return f
}
