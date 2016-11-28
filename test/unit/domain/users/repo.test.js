'use strict'

const Test = require('tapes')(require('tape'))
const Sinon = require('sinon')
const P = require('bluebird')
const Repo = require('../../../../src/domain/users/repo')
const Db = require('../../../../src/db')

Test('User Repo test', repoTest => {
  let sandbox
  let users

  repoTest.beforeEach(test => {
    sandbox = Sinon.sandbox.create()
    users = sandbox.stub()
    sandbox.stub(Db, 'connect', () => P.resolve({ users }))
    test.end()
  })

  repoTest.afterEach(test => {
    sandbox.restore()
    test.end()
  })

  repoTest.test('getByNumber should', getByNumberTest => {
    getByNumberTest.test('find one user by number', test => {
      const number = '12345678'

      users.findOneAsync = sandbox.stub()
      users.findOneAsync.returns(P.resolve({ number }))

      Repo.getByNumber(number)
      .then(response => {
        test.equal(response.number, number)
        test.ok(users.findOneAsync.calledWith(Sinon.match({ number })))
        test.end()
      })
    })

    getByNumberTest.end()
  })

  repoTest.test('getAll should', getAllTest => {
    getAllTest.test('find one user by number', test => {
      const number = '12345678'

      users.findAsync = sandbox.stub()
      users.findAsync.returns(P.resolve([{ number }]))

      Repo.getAll()
      .then(response => {
        test.equal(response[0].number, number)
        test.ok(users.findAsync.called)
        test.end()
      })
    })

    getAllTest.end()
  })

  repoTest.test('create should', createTest => {
    createTest.test('insert user', test => {
      const user = { url: 'test', number: 'test' }
      users.insertAsync = sandbox.stub()

      Repo.create(user)
      .then(() => {
        test.ok(users.insertAsync.calledWith(user))
        test.end()
      })
    })

    createTest.end()
  })

  repoTest.end()
})
