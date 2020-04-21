// Usage:
// items.filter(uniq)
export function uniq(v: any, i: number, a: any[]) {
  return a.findIndex(b => b === v) === i
}

// Usage:
// items.filter(uniqBy('id'))
export function uniqBy(prop: string) {
  return (v, i, a) => a.findIndex(v2 => v[prop] === v2[prop]) === i
}
