'use strict'

const Service = require('../domain/users/service')

const userResponse = (user) => {
  return { url: user.url, number: user.number }
}

const getUserByNumber = (req, rep) => {
  return Service.getByNumber(req.params.number)
    .then(user => rep(userResponse(user)))
}

const createUser = (req, rep) => {
  return Service.create(req.payload)
    .then(user => rep(userResponse(user)).code(201))
}

const health = (req, rep) => {
  return rep({ status: 'ok' })
}

module.exports = {
  getUserByNumber,
  createUser,
  health
}
