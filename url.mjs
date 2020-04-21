export function serialize(obj) {
  const str = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p) && obj[p]) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}

export function unserialize(str) {
  const query = str[0] === '#' || str[0] === '?' ? str.slice(1) : str
  const result = {}
  query.split('&').forEach(part => {
    const item = part.split('=')
    result[decodeURIComponent(item[0])] = decodeURIComponent(item[1])
  })
  return result
}

export function httpUrl(url) {
  if (!url) return
  if (!url.startsWith('http')) {
    return 'http://' + url
  }
  return url
}

// Resolvers

export function resolveModule(specifier, referrer) {
  if (isUrl(specifier)) {
    return specifier
  }

  if (isNamed(specifier)) {
    return
  }

  if (isAbsolute(specifier)) {
    if (isUrl(referrer)) {
      return origin(referrer) + specifier
    }
    return specifier
  }

  return resolveUrl(referrer, specifier)
}

export function resolveUrl(baseUrl, path) {
  const parts = baseUrl.split('/').slice(0, -1)
  const originLength = isUrl(baseUrl) ? 3 : 1

  path.split('/').forEach(part => {
    if (part === '.' || !part) {
      return
    }
    if (part === '..') {
      return parts.length > originLength && parts.pop()
    }
    parts.push(part)
  })

  return parts.join('/')
}

// URL / Path checks

export function isNamed(path) {
  return !isRelative(path) && !isAbsolute(path) && !isUrl(path)
}

export function isAbsolute(path) {
  return path.startsWith('/')
}

export function isRelative(path) {
  return path.startsWith('./') || path.startsWith('../')
}

export function isUrl(url) {
  return /^[a-zA-Z0-9+-.]+:\/\//.test(url)
}

// URL helper

export function origin(url) {
  return url.split('/').slice(0, 3).join('/')
}
