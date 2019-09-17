import { production } from './knexfile-env.js'

export const knex = require('knex')(production)
