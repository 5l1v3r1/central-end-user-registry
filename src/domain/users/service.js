'use strict'

const Repo = require('./repo')

const register = (payload) => {
  return Repo.create({ dfspIdentifier: payload.dfspIdentifier, number: payload.number })
}

const getAll = () => {
  return Repo.getAll()
}

const getByNumber = (number) => {
  return Repo.getByNumber(number)
}

module.exports = {
  register,
  getAll,
  getByNumber
}
