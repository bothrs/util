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
