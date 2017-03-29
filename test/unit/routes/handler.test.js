'use strict'

const Test = require('tapes')(require('tape'))
const Sinon = require('sinon')
const P = require('bluebird')
const NotFoundError = require('@leveloneproject/central-services-shared').NotFoundError

const Handler = require('../../../src/routes/handler')
const Service = require('../../../src/domain/users/service')

Test('routes handler test', handlerTest => {
  let sandbox

  handlerTest.beforeEach(test => {
    sandbox = Sinon.sandbox.create()
    sandbox.stub(Service)
    test.end()
  })

  handlerTest.afterEach(test => {
    sandbox.restore()
    test.end()
  })

  handlerTest.test('health should', healthTest => {
    healthTest.test('return status: ok', test => {
      const reply = (response) => {
        test.equal(response.status, 'ok')
        test.end()
      }

      Handler.health({}, reply)
    })

    healthTest.end()
  })

  handlerTest.test('getUsers should', getUsersTest => {
    getUsersTest.test('returns users from Service', test => {
      const number = '12345678'
      const user = { id: 1, number }
      Service.getAll.returns(P.resolve([user]))

      const reply = (response) => {
        test.deepEqual(response, [{ number }])
        test.end()
      }

      Handler.getUsers({}, reply)
    })
    getUsersTest.end()
  })

  handlerTest.test('getUserByNumber should', userByNumberTest => {
    userByNumberTest.test('return user from Service.getByNumber', test => {
      const number = '12345678'
      const user = { id: 1, number }
      Service.getByNumber.returns(P.resolve(user))

      const req = {
        params: { number }
      }

      const reply = (response) => {
        test.deepEqual(response, { number })
        test.end()
      }

      Handler.getUserByNumber(req, reply)
    })

    userByNumberTest.test('return NotFoundError is user is null', test => {
      const number = '12345678'
      Service.getByNumber.returns(P.resolve(null))

      const req = {
        params: { number }
      }

      const reply = (response) => {
        test.ok(response instanceof NotFoundError)
        test.equal(response.message, 'The requested user does not exist')
        test.end()
      }

      Handler.getUserByNumber(req, reply)
    })
    userByNumberTest.end()
  })

  handlerTest.test('registerIdentifier should', registerIdentifierTest => {
    registerIdentifierTest.test('register user with Service', test => {
      const number = '12345678'
      const dfspIdentifier = 'dfsp_identifier'
      const user = { id: 2, dfspIdentifier, number }

      Service.register.withArgs(Sinon.match({ number, dfsp_identifier: dfspIdentifier })).returns(P.resolve(user))

      const req = {
        payload: { number, dfsp_identifier: dfspIdentifier }
      }

      const reply = (response) => {
        test.deepEqual(response, { number })
        return {
          code: (statusCode) => {
            test.equal(statusCode, 201)
            test.end()
          }
        }
      }

      Handler.registerIdentifier(req, reply)
    })

    registerIdentifierTest.end()
  })

  handlerTest.end()
})
