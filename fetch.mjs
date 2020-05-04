// Consider using:
// https://polyfill.io/v3/polyfill.min.js?features=fetch,default

export function fetchJSON(url, options) {
  if (options.json) {
    options.body = JSON.stringify(options.json)
  }
  return fetch(
    url,
    Object.assign(
      {
        method: 'POST',
        credentials: 'same-origin',
        headers: Object.assign(
          {
            accept: 'application/json',
          },
          options.method !== 'GET'
            ? { 'content-type': 'application/json' }
            : {},
          options.auth ? { Authorization: 'Bearer ' + options.auth } : {}
        ),
      },
      options
    )
  )
    .then(r => r.json())
    .catch(e => {
      throw new Error('Failed to fetch JSON: ' + e.message)
    })
}

export function getJSON(url, options) {
  options = options || {}
  options.method = 'GET'
  return fetchJSON(url, options)
}

export function postJSON(url, json, options) {
  options = options || {}
  options.json = json
  options.method = 'POST'
  return fetchJSON(url, options)
}

export function patchJSON(url, json, options) {
  options = options || {}
  options.json = json
  options.method = 'PATCH'
  return fetchJSON(url, options)
}

export function putJSON(url, json, options) {
  options = options || {}
  options.json = json
  options.method = 'PUT'
  return fetchJSON(url, options)
}

export function deleteJSON(url, options) {
  options = options || {}
  options.method = 'DELETE'
  return fetchJSON(url, options)
}

// Method override

export function _patchJSON(url, json, options) {
  options = options || {}
  options.json = json
  options.method = 'POST'
  url += (url.includes('?') ? '&' : '?') + '_method=PATCH'
  return fetchJSON(url, options)
}

export function _putJSON(url, json, options) {
  options = options || {}
  options.json = json
  options.method = 'PUT'
  url += (url.includes('?') ? '&' : '?') + '_method=PUT'
  return fetchJSON(url, options)
}
