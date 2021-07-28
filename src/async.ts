export function timeout(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isPending<T>(promise: T) {
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
export function to<T>(promise: PromiseLike<T> | T) {
  return Promise.resolve(promise)
    .then(data => [undefined, data] as [undefined, T])
    .catch(err => [err, undefined] as [Error, undefined])
}
