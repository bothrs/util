import { createHash } from 'crypto'

export function md5(str) {
  return createHash('md5')
    .update(str)
    .digest('hex')
}

export function sha256(str) {
  return createHash('sha256')
    .update(str)
    .digest('hex')
}
