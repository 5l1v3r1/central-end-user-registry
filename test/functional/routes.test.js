'use strict'

const Test = require('tape')
const host = process.env.HOST_IP || 'localhost'
const Request = require('supertest')(`http://${host}:3001`)

const post = (route, data, contentType = 'application/json') => {
  return Request.post(route).set('Content-Type', contentType).send(data)
}

const get = (route) => {
  return Request.get(route)
}

Test('can register and retrieve user', test => {
  const dfspIdentifier = 'http://test2.com'
  const number = '262'

  post('/register', { dfsp_identifier: dfspIdentifier, number: number })
    .expect(201)
    .then(postResponse => {
      const number = postResponse.body.number
      get(`/users/${number}`)
        .expect(200)
        .then(getResponse => {
          test.equal(getResponse.body.number, number)
          test.end()
        })
    })
})
