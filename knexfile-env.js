// DB_CONNECTION=mysql
// DB_HOST=127.0.0.1
// DB_PORT=3306
// DB_DATABASE=
// DB_USERNAME=
// DB_PASSWORD=

// DB_CONNECTION=sqlite3
// DB_FILENAME=./.data/things.sqlite

const parsed = Object.assign(
  {},
  process.env,
  require('dotenv/lib/main').config().parsed
)

const config = {
  client: parsed.DB_CONNECTION || 'sqlite3',
  connection:
    parsed.DB_CONNECTION === 'mysql'
      ? {
          host: parsed.DB_HOST || '127.0.0.1',
          port: parsed.DB_PORT || 3306,
          user: parsed.DB_USERNAME || '',
          password: parsed.DB_PASSWORD || '',
          database: parsed.DB_DATABASE || '',
          charset: 'utf8mb4',
        }
      : {
          filename: parsed.DB_FILENAME || './.data/knex.sqlite',
        },
  useNullAsDefault: true,
}

module.exports = {
  development: config,
  production: config,
}
