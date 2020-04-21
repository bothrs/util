import { serialize } from './url'
import fetch from 'node-fetch'

export { serialize }

export function app(app: string) {
  return app.includes('/') ? app : 'https://api.airtable.com/v0/' + app + '/'
}

export function headers(key: any) {
  if (!key) {
    throw new Error('AIRTABLE_API_KEY is a required env variable')
  }
  return {
    Authorization: 'Bearer ' + key,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}

export async function create(
  env: Environment,
  tableName: string,
  fields: FieldSet
): Promise<FieldSet> {
  env.log && env.log('create', tableName, fields)
  const body = await fetch(app(env.app) + tableName, {
    method: 'POST',
    headers: headers(env.key),
    body: JSON.stringify({ fields }),
  }).then(r => r.json())
  if (body.error) {
    throw new Error(body.error.message)
  }
  return unpack(body)
}

export async function find(
  env: Environment,
  tableName: string,
  id: string
): Promise<FieldSet> {
  env.log && env.log('find', tableName, id)
  const body = await fetch(app(env.app) + tableName + '/' + id, {
    headers: headers(env.key),
  }).then(r => r.json())
  if (body.error) {
    throw new Error(body.error.message)
  }
  return unpack(body)
}

export async function first(
  env: Environment,
  tableName: string,
  filter: SelectOptions = {}
): Promise<FieldSet | null> {
  env.log && env.log('first', tableName, filter)
  const items = await select(env, tableName, filter)
  return items.length ? items[0] : null
}

export async function select(
  env: Environment,
  tableName: string,
  filter: SelectOptions = {}
): Promise<FieldSet[]> {
  env.log && env.log('select', tableName, filter)
  const body = await fetch(app(env.app) + tableName + '?' + serialize(filter), {
    headers: headers(env.key),
  }).then(r => r.json())
  const { error, records } = body
  if (error) {
    throw new Error(error.message)
  }
  if (records) {
    return records.map(unpack)
  }
  console.error(body)
  return []
}

export async function selectAll(
  env: Environment,
  tableName: string,
  filter: SelectOptions = {},
  prepend: FieldSet[] = []
): Promise<FieldSet[]> {
  env.log && env.log('selectAll', tableName, filter, prepend.length)
  const body = await fetch(app(env.app) + tableName + '?' + serialize(filter), {
    headers: headers(env.key),
  }).then(r => r.json())
  const { error, offset, records } = body
  if (error) {
    throw new Error(error.message)
  }
  if (offset) {
    return selectAll(
      env,
      tableName,
      { ...filter, offset },
      prepend.concat(records)
    )
  }
  if (records) {
    return prepend.concat(records).map(unpack)
  }
  console.error(body)
  return []
}

export async function update(
  env: Environment,
  tableName: string,
  id: string,
  fields: FieldSet
): Promise<FieldSet> {
  env.log && env.log('update', tableName, fields)
  const body = await fetch(app(env.app) + tableName + '/' + id, {
    method: 'PATCH',
    headers: headers(env.key),
    body: JSON.stringify({ fields }),
  }).then(r => r.json())
  if (body.error) {
    throw new Error(body.error.message)
  }
  return unpack(body)
}

export async function remove(
  env: Environment,
  tableName: string,
  id: string
): Promise<FieldSet> {
  env.log && env.log('remove', tableName, id)
  const body = await fetch(app(env.app) + tableName + '/' + id, {
    method: 'DELETE',
    headers: headers(env.key),
  }).then(r => r.json())
  if (body.error) {
    throw new Error(body.error.message)
  }
  return unpack(body)
}

// Helpers

export function pack(fields: FieldSet) {
  return {
    id: fields._id,
    fields: Object.assign(fields, { _id: null, createdTime: null }),
    createdTime: fields.createdTime,
  }
}

export function unpack({ id: _id, fields, createdTime }: FieldSet) {
  return Object.assign(
    {
      _id,
      createdTime,
    },
    fields
  )
}

// Filters

export function byIds(ids: string[]) {
  return {
    filterByFormula: "OR(RECORD_ID()='" + ids.join("',RECORD_ID()='") + "')",
  }
}

export function where(field: string, value: any) {
  return {
    filterByFormula: '{' + field + "}='" + value + "'",
  }
}

// TypeScript

export interface Environment {
  app: string
  key?: string
  log?: Function
}

export interface SelectOptions {
  fields?: string[]
  filterByFormula?: string
  maxRecords?: number
  pageSize?: number
  view?: string
  offset?: number
}

export interface FieldSet {
  _id?: string
  [key: string]: any
}
