'use strict'

const Repo = require('./repo')

const register = (payload, attempt = 1) => {
  return Repo.create({ dfspIdentifier: payload.dfsp_identifier, number: payload.number })
    .catch(e => {
      if (attempt >= 5) {
        throw e
      } else {
        return register(payload, attempt + 1)
      }
    })
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
