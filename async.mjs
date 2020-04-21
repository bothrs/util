export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
