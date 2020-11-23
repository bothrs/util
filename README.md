## util

#### airtable-env.mjs + ts

Manage Airtable data based on standard env variables.

`await select('Blogposts')` => Load blogposts

#### airtable-translation.mjs

Download translations table from Airtable and write to file that can be imported.

#### airtable-translations.mjs

Optimistically load translations table from Airtable.

#### airtable.mjs + ts

Manage Airtable data.

`await select({ app: '', key: '' }, 'Blogposts')` => Load blogposts

#### async.mjs + ts

`await timeout(1000)` => Wait for 1 second  
`const busy = await isPending(promise)` => Check if promise is pending  
`const [error, data] = await to(promise)` => Unwrap promise

#### cli.mjs

Manage command line.

`console.log(green('Success'))` => Log "success" in green

#### cloudimg.mjs

Demo CDN integration

#### color.mjs

Command line colors

`console.log(green('Success'))` => Log "success" in green

#### connectable.mjs

Svelte store for reconnecting websocket.

#### cookie.mjs

Read and write cookies.

#### copyToClipboard.mjs

Copy to clipboard

#### date.mjs

Manage dates

#### download.mjs

Download files

#### fetch.mjs + ts

Fetch JSON + shorthand for Authorization: Bearer

#### format.mjs

Format strings

#### fs.mjs + ts

Read and write from filesystem using promises.

#### hash.mjs

Hash shorthands

`const hash = md5('test')` => Decode JWT

#### idle.mjs

Svelte store for user inactivity

#### jwt.mjs

`const { sub } = unsafeDecode('eY...')` => Decode JWT

#### knex-env.mjs

Load knex instance with config based on standard env variables.

`import { knex } from 'knex-env'` => Ready to use knex instance

#### knexfile-env.js

Knex config for migrations.

`require('.../util/knexfile-env.js')` => Save this as knexfile.js

#### knexfile-env.mjs

Knex config based on standard env variables.

#### leaflet.mjs

Load leaflet JS and CSS.

#### loadScript.mjs

Load scripts, stylesheets and CSS.

#### location.mjs

Svelte store for location

#### log.mjs

Stream logs to a file.

#### ls.mjs + ts

Minimal helper for localStorage

#### mailgun.mjs

Send mailgun messages.

#### markdown.mjs

Render basic markdown to HTML.

#### math.mjs

Functions with numbers

#### memo.mjs + ts

Optimize common requests.

#### messenger.mjs

Load Messenger SDK.

#### modal.mjs

Disable scroll behind modals.

#### orientation.mjs

Svelte store for device orientation

#### password.mjs

Hash and verify passwords.

#### random.mjs + ts

Generate random strings and UUIDs.

#### sample.mjs

Get a random element from an array.

#### sentry-env.mjs

Initialize Sentry based on standard env variables.

#### smtp.mjs

Send emails with nodemailer based on standard env variables.

#### socket.io.mjs

Connect to a socket.io server.

#### store.mjs

Svelte store helpers

#### theme.mjs

Svelte store for light/dark theme

#### translate.mjs

Translation helpers

#### typeform.mjs

Launch a Typeform widget.

#### uniq.mjs + ts

Filter uniq items from an array.

#### url.mjs + ts

Manage URLs.

`serialize({ example: 'ok' })` => Build a querystring

#### vimeo.js

Launch a Vimeo video player.

#### voxeet.mjs

Load the Voxeet SDK.

#### xss.mjs

Helpers to protect against XSS
