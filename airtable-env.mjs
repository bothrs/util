import {
  create as createPure,
  find as findPure,
  first as firstPure,
  select as selectPure,
  selectAll as selectAllPure,
  update as updatePure,
  remove as removePure
} from './airtable.mjs'

export const env = {
  log: process.env.AIRTABLE_LOG ? console.log : null,
  app: process.env.AIRTABLE_APP,
  key: process.env.AIRTABLE_API_KEY
}

export async function create(tableName, fields) {
  return createPure(env, tableName, fields)
}

export async function find(tableName, id) {
  return findPure(env, tableName, id)
}

export async function first(tableName, filter) {
  return firstPure(env, tableName, filter)
}

export async function select(tableName, filter) {
  return selectPure(env, tableName, filter)
}

export async function selectAll(tableName, filter, prepend) {
  return selectAllPure(env, tableName, filter, prepend)
}

export async function update(tableName, id, fields) {
  return updatePure(env, tableName, id, fields)
}

export async function remove(tableName, id, fields) {
  return removePure(env, tableName, id, fields)
}
