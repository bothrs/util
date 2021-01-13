export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isPending(promise) {
  const test = {}
  return Promise.race([promise, test]).then(
    value => value === test,
    () => false
  )
}

/**
 * @summary Convenience wrapper for error handling without try/catch
 * @example
 *    const [ err, items ] = await to(fetchJSON('/api/items'))
 *    if (err) console.error('Something happened')
 */
export function to(promise) {
  return Promise.resolve(promise)
    .then(data => [undefined, data])
    .catch(err => [err, undefined])
}
