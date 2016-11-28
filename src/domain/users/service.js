'use strict'

const Repo = require('./repo')
const Rando = require('../../lib/rando')

const create = ({url}, attempt = 1) => {
  const randomNumber = Rando.generateRandomNumber()

  return Repo.create({ url: url, number: randomNumber })
    .catch(e => {
      if (attempt >= 5) {
        throw e
      } else {
        return create({ url }, attempt + 1)
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
  create,
  getAll,
  getByNumber
}
