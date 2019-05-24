const scripts = {}
export default function loadScript(src, id) {
  if (id && scripts[id]) {
    return scripts[id]
  }
  return (scripts[id] = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.id = id
    s.src = src
    s.defer = true
    s.crossOrigin = 'anonymous'
    s.onload = resolve
    s.onerror = reject
    document.getElementsByTagName('head')[0].appendChild(s)
  }))
}

export function loadStyle(href) {
  const s = document.createElement('link')
  s.rel = 'stylesheet'
  s.crossOrigin = 'anonymous'
  s.href = href
  document.head.appendChild(s)
}
