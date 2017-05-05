'use strict'

const Service = require('../domain/users/service')
const NotFoundError = require('@leveloneproject/central-services-shared').NotFoundError

const userResponse = (user) => {
  if (!user) {
    throw new NotFoundError('The requested user does not exist')
  }
  return { number: user.number, dfspIdentifier: user.dfspIdentifier }
}

const getUsers = (req, rep) => {
  return Service.getAll()
    .then(response => response.map(userResponse))
    .then(response => rep(response))
}

const getUserByNumber = (req, rep) => {
  return Service.getByNumber(req.params.number)
    .then(user => userResponse(user))
    .then(response => rep(response))
    .catch(e => rep(e))
}

const registerIdentifier = (req, rep) => {
  return Service.register(req.payload)
    .then(user => rep(userResponse(user)).code(201))
}

const health = (req, rep) => {
  return rep({ status: 'OK' })
}

module.exports = {
  getUsers,
  getUserByNumber,
  registerIdentifier,
  health
}
