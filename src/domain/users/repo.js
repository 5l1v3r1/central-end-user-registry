'use strict'

const Db = require('../../db')

exports.getByNumber = (number) => {
  return Db.connect().then(db => db.users.findOneAsync({ number: number }))
}

exports.create = (user) => {
  return Db.connect().then(db => db.users.insertAsync(user))
}