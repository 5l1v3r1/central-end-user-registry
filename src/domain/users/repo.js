'use strict'

const Db = require('../../db')

exports.getAll = () => {
  return Db.users.find({}, { order: 'number asc' })
}

exports.getByNumber = (number) => {
  return Db.users.findOne({ number })
}

exports.create = (user) => {
  return Db.users.insert(user)
}
