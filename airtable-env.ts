import {
  create as createPure,
  find as findPure,
  first as firstPure,
  select as selectPure,
  selectAll as selectAllPure,
  update as updatePure,
  remove as removePure,
  FieldSet,
  Environment,
  SelectOptions,
} from './airtable'
export { byIds, pack, serialize, unpack, where } from './airtable'

export const env: Environment = {
  log: process.env.AIRTABLE_LOG ? console.log : undefined,
  app: process.env.AIRTABLE_APP || 'http://localhost:20011/',
  key: process.env.AIRTABLE_API_KEY,
}

export async function create(
  tableName: string,
  fields: FieldSet
): Promise<FieldSet> {
  return createPure(env, tableName, fields)
}

export async function find(tableName: string, id: string): Promise<FieldSet> {
  return findPure(env, tableName, id)
}

export async function first(
  tableName: string,
  filter: SelectOptions
): Promise<FieldSet | null> {
  return firstPure(env, tableName, filter)
}

export async function select(
  tableName: string,
  filter: SelectOptions
): Promise<FieldSet[]> {
  return selectPure(env, tableName, filter)
}

export async function selectAll(
  tableName: string,
  filter: SelectOptions,
  prepend?: FieldSet[]
): Promise<FieldSet[]> {
  return selectAllPure(env, tableName, filter, prepend)
}

export async function update(
  tableName: string,
  id: string,
  fields: SelectOptions
): Promise<FieldSet> {
  return updatePure(env, tableName, id, fields)
}

export async function remove(tableName: string, id: string): Promise<FieldSet> {
  return removePure(env, tableName, id)
}
