export function id(len = 10) {
  return Array.from(new Array(len))
    .map(() =>
      Math.random()
        .toString(36)
        .charAt(5)
    )
    .join('')
}
