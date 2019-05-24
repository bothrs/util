export function download(url) {
  return new Promise((resolve, reject) => {
    const path = '/tmp/' + Math.random() + '.download'
    const { get } = require('https')
    const { createWriteStream, unlink } = require('fs')

    const file = createWriteStream(path)
    const request = get(url, response => {
      response.pipe(file)
      file.on('finish', () => {
        file.close((err, ok) => {
          console.log('Downloaded', err, ok, path)
          resolve(path)
        })
      })
    }).on('error', err => {
      unlink(path)
      reject(err.message)
    })
  })
}
