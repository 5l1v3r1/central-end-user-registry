'use strict'

const Test = require('tapes')(require('tape'))
const Sinon = require('sinon')
const P = require('bluebird')
const Repo = require('../../../../src/domain/users/repo')
const Service = require('../../../../src/domain/users/service')

Test('users service tests', serviceTest => {
  let sandbox

  serviceTest.beforeEach(t => {
    sandbox = Sinon.sandbox.create()
    sandbox.stub(Repo)
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

  serviceTest.test('getAll should', getAllTest => {
    getAllTest.test('get users from repo', test => {
      const number = '12345678'
      const user = { number }
      Repo.getAll.returns(P.resolve([user]))

      Service.getAll()
        .then(result => {
          test.equal(result[0], user)
          test.ok(Repo.getAll.called)
          test.end()
        })
    })

    getAllTest.end()
  })

  serviceTest.test('register should', registerTest => {
    registerTest.test('register identifier', test => {
      const dfspIdentifier = '001:123'
      const number = '12345'

      const expected = { number, dfspIdentifier }
      Repo.create.returns(P.resolve(expected))

      Service.register({ number, dfspIdentifier })
        .then(result => {
          test.equal(result, expected)
          test.equal(Repo.create.callCount, 1)
          test.end()
        })
    })
    registerTest.end()
  })

  serviceTest.end()
})
