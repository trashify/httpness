#!/usr/bin/env node
'use strict'

const prettyjson = require('prettyjson')
const getThemArgs = require('get-them-args')
const fetch = require('node-fetch')

const args = getThemArgs(process.argv.slice(2))

const url = args.url || args.u
const method = (args.method || args.m) || 'GET'
const headers = (args.headers || args.h) || {}
const body = (args.body || args.b) || ''
const credentials = (args.credentials || args.c) || ''

if (!url) {
  console.error('\nURL not provided for the request.\n')
} else {

  const options = {
    method: method.toUpperCase(),
    headers,
    body,
    credentials}

  const prettyjsonOpts = {
    dashColor: 'magenta'
  }

  fetch(url, options)
    .then((response) => {
      const status = {status: `${response.status} ${response.statusText}`}
      const headers = {headers: response.headers._headers}

      console.log('\n')
      console.log(prettyjson.render(status, prettyjsonOpts), '\n')
      console.log(prettyjson.render(headers, prettyjsonOpts), '\n')

      return response.text()
    })
    .then((text) => {
      try {
        const json = JSON.parse(text)
        console.log(prettyjson.render({body: json}, prettyjsonOpts), '\n')
      } catch (e) {
        console.log(prettyjson.render({body: text}, prettyjsonOpts), '\n')
      }
    })
    .catch((error) => {
      console.log(prettyjson.render(error), '\n')
    })
}
