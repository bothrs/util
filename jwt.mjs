/** Decode base64 in browser and node.js */
export const atob =
  typeof window !== 'undefined'
    ? window.atob
    : str => Buffer.from(str, 'base64').toString('binary')

/** Decode JWT without signature check */
export function unsafeDecode(token) {
  const [, data] = token.split('.')
  return JSON.parse(atob(data))
}
