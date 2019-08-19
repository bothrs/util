// Usage:
// items.filter(uniq)
export function uniq(v, i, a) {
  return a.findIndex(b => b === v) === i
}

// Usage:
// items.filter(uniqBy('id'))
// items.filter(uniqBy(item => item.origin + item.path))
export function uniqBy(prop) {
  return typeof prop === 'function'
    ? (v, i, a) => a.findIndex(v2 => func(v) === func(v2)) === i
    : (v, i, a) => a.findIndex(v2 => v[prop] === v2[prop]) === i
}
