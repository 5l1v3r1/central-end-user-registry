'use strict'

const RandomSting = require('randomstring')

exports.generateRandomNumber = () => {
  return RandomSting.generate({
    charset: 'numeric',
    length: 8
  })
}

