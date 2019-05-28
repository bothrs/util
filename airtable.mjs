import fetch from 'node-fetch'

export function app(app) {
  return 'https://api.airtable.com/v0/' + app + '/'
}

export function headers(key) {
  if (!key) {
    throw new Error('AIRTABLE_API_KEY is a required env variable')
  }
  return {
    Authorization: 'Bearer ' + key,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

export async function create(env, tableName, fields) {
  env.log && env.log('create', tableName, fields)
  const body = await fetch(app(env.app) + tableName, {
    method: 'POST',
    headers: headers(env.key),
    body: JSON.stringify({ fields })
  }).then(r => r.json())
  return unpack(body)
}

export async function find(env, tableName, id) {
  env.log && env.log('find', tableName, id)
  const body = await fetch(app(env.app) + tableName + '/' + id, {
    headers: headers(env.key)
  }).then(r => r.json())
  return unpack(body)
}

export async function first(env, tableName, filter) {
  env.log && env.log('first', tableName, filter)
  const items = await select(env, tableName, filter)
  return items.length ? items[0] : null
}

export async function select(env, tableName, filter) {
  env.log && env.log('select', tableName, filter)
  const body = await fetch(app(env.app) + tableName + '?' + serialize(filter), {
    headers: headers(env.key)
  }).then(r => r.json())
  const { records } = body
  if (records) {
    return records.map(unpack)
  }
  console.error(body)
  return []
}

export async function selectAll(env, tableName, filter, prepend = []) {
  env.log && env.log('selectAll', tableName, filter, prepend.length)
  const body = await fetch(app(env.app) + tableName + '?' + serialize(filter), {
    headers: headers(env.key)
  }).then(r => r.json())
  const { offset, records } = body
  if (offset) {
    return selectAll(tableName, { ...filter, offset }, prepend.concat(records))
  }
  if (records) {
    return prepend.concat(records).map(unpack)
  }
  console.error(body)
  return []
}

export async function update(env, tableName, id, fields) {
  env.log && env.log('update', tableName, fields)
  const body = await fetch(app(env.app) + tableName + '/' + id, {
    method: 'PATCH',
    headers: headers(env.key),
    body: JSON.stringify({ fields })
  }).then(r => r.json())
  return unpack(body)
}

export async function remove(env, tableName, id) {
  env.log && env.log('remove', tableName, id)
  const body = await fetch(app(env.app) + tableName + '/' + id, {
    method: 'DELETE',
    headers: headers(env.key)
  }).then(r => r.json())
  return unpack(body)
}

// Helpers

export function pack(fields) {
  return {
    id: fields._id,
    fields: Object.assign(fields, { _id: null, createdTime: null }),
    createdTime: fields.createdTime
  }
}

export function unpack({ id: _id, fields, createdTime }) {
  return Object.assign(
    {
      _id,
      createdTime
    },
    fields
  )
}

export function serialize(obj) {
  const str = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p) && obj[p]) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}

function unserialize(str) {
  const query = str[0] === '#' || str[0] === '?' ? str.slice(1) : str
  const result = {}
  query.split('&').forEach(part => {
    const item = part.split('=')
    result[decodeURIComponent(item[0])] = decodeURIComponent(item[1])
  })
  return result
}

// Filters

export function recordFilter(field, id) {
  return {
    filterByFormula: 'RECORD_ID()=' + id
  }
}

export function byIds(ids) {
  return {
    filterByFormula: "OR(RECORD_ID()='" + ids.join("',RECORD_ID()='") + "')"
  }
}

export function where(field, value) {
  return {
    filterByFormula: '{' + field + "}='" + value + "'"
  }
}