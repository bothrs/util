
## util
The following utils can be imported from `@bothrs/util/<utilname>`

#### airtable-env

Manage Airtable data based on standard env variables.

`await select('Blogposts')` => Load blogposts

#### async.mjs + ts

`await timeout(1000)` => Wait for 1 second  
`const busy = await isPending(promise)` => Check if promise is pending  
`const [error, data] = await to(promise)` => Unwrap promise

#### airtable.mjs + ts

Manage Airtable data.

`await select({ app: '', key: '' }, 'Blogposts')` => Load blogposts

#### fetch.mjs + ts

Fetch JSON + shorthand for Authorization: Bearer

Note: when using this on a node server, fetch needs to be polifilled
node-fetch suggests doing this like:
```javascript
import fetch from 'node-fetch'

if (!globalThis.fetch) {
  //@ts-ignore
  globalThis.fetch = fetch
}
```

#### fs.mjs + ts

Read and write from filesystem using promises.

#### ls.mjs + ts

Minimal helper for localStorage

#### memo.mjs + ts

Optimize common requests.

#### random.mjs + ts

Generate random strings and UUIDs.

#### uniq.mjs + ts

Filter uniq items from an array.

#### url.mjs + ts

Manage URLs.

`serialize({ example: 'ok' })` => Build a querystring

## mjs
The mjs files contain code that could benefit from
some triage;either refactored into `ts` files or removed.
They can be found under `@bothrs/util/mjs`
#### airtable-translation.mjs

Download translations table from Airtable and write to file that can be imported.

#### airtable-translations.mjs

Optimistically load translations table from Airtable.

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

#### format.mjs

Format strings

#### hash.mjs

Hash shorthands

`const hash = md5('test')`

#### idle.mjs

Svelte store for user inactivity

#### jwt.mjs

`const { sub } = unsafeDecode('eY...')` => Decode JWT

#### knex-env.mjs

Load knex instance with config based on standard env variables.

`import { knex } from 'knex-env'` => Ready to use knex instance

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

#### mailgun.mjs

Send mailgun messages.

#### markdown.mjs

Render basic markdown to HTML.

#### math.mjs

Functions with numbers

#### messenger.mjs

Load Messenger SDK.

#### modal.mjs

Disable scroll behind modals.

#### orientation.mjs

Svelte store for device orientation

#### password.mjs

Hash and verify passwords.

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


#### voxeet.mjs

Load the Voxeet SDK.

#### xss.mjs

Helpers to protect against XSS
