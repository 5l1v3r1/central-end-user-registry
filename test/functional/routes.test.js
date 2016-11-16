'use strict'

const Test = require('tape')
const host = process.env.HOST_IP || 'localhost'
const Request = require('supertest')(`http://${host}:3001`)

const post = (route, data) => {
  return Request.post(route).send(data)
}

const get = (route) => {
  return Request.get(route)
}

Test('can create and retrieve user', test => {
  const url = 'http://test.com'
  post('/users', { url })
    .expect(201)
    .then(postResponse => {
      test.equal(postResponse.body.url, url)
      const number = postResponse.body.number
      get(`/users/${number}`)
        .expect(200)
        .then(getResponse => {
          test.equal(getResponse.body.url, url)
          test.equal(getResponse.body.number, number)
          test.end()
        })
    })
})
