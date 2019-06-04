import { readFile as _readFile, writeFile as _writeFile } from 'fs'

export function readFile(fileName, type = 'utf8') {
  return new Promise((resolve, reject) => {
    _readFile(fileName, type, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

export function writeFile(fileName, data, type = 'utf8') {
  return new Promise((resolve, reject) => {
    _writeFile(fileName, data, type, err => {
      err ? reject(err) : resolve(data)
    })
  })
}

export function readJSON(fileName) {
  return new Promise((resolve, reject) => {
    _readFile(fileName, 'utf8', (err, data) => {
      err ? reject(err) : resolve(JSON.parse(data))
    })
  })
}

export function writeJSON(fileName, data) {
  return new Promise((resolve, reject) => {
    _writeFile(fileName, JSON.stringify(data), 'utf8', err => {
      err ? reject(err) : resolve(data)
    })
  })
}
