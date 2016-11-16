'use strict'

const Test = require('tapes')(require('tape'))
const Sinon = require('sinon')
const P = require('bluebird')
const Rando = require('../../../../src/lib/rando')
const Repo = require('../../../../src/domain/users/repo')
const Service = require('../../../../src/domain/users/service')

Test('users service tests', serviceTest => {
  let sandbox

  serviceTest.beforeEach(t => {
    sandbox = Sinon.sandbox.create()
    sandbox.stub(Repo)
    sandbox.stub(Rando, 'generateRandomNumber')
    t.end()
  })

  serviceTest.afterEach(t => {
    sandbox.restore()
    t.end()
  })

  serviceTest.test('getByNumber should', getByNumberTest => {
    getByNumberTest.test('get user from repo by number', test => {
      const number = '12345678'
      const user = { number }
      Repo.getByNumber.returns(P.resolve(user))

      Service.getByNumber(number)
      .then(result => {
        test.equal(result, user)
        test.ok(Repo.getByNumber.calledWith(number))
        test.end()
      })
    })

    getByNumberTest.end()
  })

  serviceTest.test('create should', createTest => {
    createTest.test('attempt to create a user up to 5 times', test => {
      Rando.generateRandomNumber.returns('random string')
      const createError = new Error()
      Repo.create.returns(P.reject(createError))

      Service.create({ url: 'test' })
      .then(() => {
        test.fail()
        test.end()
      })
      .catch(e => {
        test.equal(e, createError)
        test.equal(Repo.create.callCount, 5)
        test.equal(Rando.generateRandomNumber.callCount, 5)
        test.end()
      })
    })

    createTest.test('return created user', test => {
      const randomString = 'some random string'
      const url = 'http://test.com'

      Rando.generateRandomNumber.returns(randomString)
      const expected = { id: 1, url, number: randomString }
      Repo.create.returns(P.resolve(expected))
      Service.create({ url: 'test' })
        .then(result => {
          test.equal(result, expected)
          test.equal(Repo.create.callCount, 1)
          test.equal(Rando.generateRandomNumber.callCount, 1)
          test.end()
        })
    })
    createTest.end()
  })

  serviceTest.end()
})
