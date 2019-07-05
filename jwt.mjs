export const atob =
  typeof window !== 'undefined'
    ? window.atob
    : str => Buffer.from(str, 'base64').toString('binary')

export function unsafeDecode(token) {
  const [, data] = token.split('.')
  return JSON.parse(atob(data))
}
