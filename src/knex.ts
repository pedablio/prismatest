import knex from 'knex'

export const knexClient = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})
