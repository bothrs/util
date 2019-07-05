export function id(len = 10) {
  return Array.from(new Array(len))
    .map(() =>
      Math.random()
        .toString(36)
        .charAt(5)
    )
    .join('')
}

export function str62(len = 10) {
  return Array.apply(null, Array(len))
    .map(char62)
    .join('')
}

export function str36(len = 10) {
  return Array.apply(null, Array(len))
    .map(() =>
      Math.random()
        .toString(36)
        .charAt(5)
    )
    .join('')
}

export function char62() {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
    Math.floor(Math.random() * 62)
  )
}
