'use strict'

const Db = require('../../db')

exports.getAll = () => {
  return Db.connect().then(db => db.users.findAsync())
}

exports.getByNumber = (number) => {
  return Db.connect().then(db => db.users.findOneAsync({ number: number }))
}

exports.create = (user) => {
  return Db.connect().then(db => db.users.insertAsync(user))
}
