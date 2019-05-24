import * as fs from 'fs'

export function readFile(fileName, type = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, type, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

export function writeFile(fileName, data, type = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, type, err => {
      err ? reject(err) : resolve(data)
    })
  })
}

export function readJSON(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      err ? reject(err) : resolve(JSON.parse(data))
    })
  })
}

export function writeJSON(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(data), 'utf8', err => {
      err ? reject(err) : resolve(data)
    })
  })
}
