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
