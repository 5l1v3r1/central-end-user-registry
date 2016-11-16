'use strict'

const Test = require('tape')
const Sinon = require('sinon')
const RandomString = require('randomstring')
const Rando = require('../../../src/lib/rando')

Test('rando test', randoTest => {
  randoTest.test('generateRandomNumber should', numberTest => {
    numberTest.test('use randomstring to generate number', test => {
      const randomSpy = Sinon.spy(RandomString, 'generate')

      Rando.generateRandomNumber()

      test.equal(randomSpy.callCount, 1)
      test.ok(randomSpy.calledWith(Sinon.match({ charset: 'numeric', length: 8 })))

      test.end()
    })
    numberTest.end()
  })
  randoTest.end()
})
