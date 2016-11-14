'use strict'

const src = '../../src'
const P = require('bluebird')
const Test = require('tapes')(require('tape'))
const Sinon = require('sinon')
const Db = require(`${src}/db`)
const Glue = require('glue')
const Logger = require('@leveloneproject/central-services-shared').Logger
const Migrator = require(`${src}/lib/migrator`)

Test('server', function (serverTest) {
  let sandbox

  serverTest.beforeEach(t => {
    sandbox = Sinon.sandbox.create()
    sandbox.stub(Db, 'connect')
    sandbox.stub(Glue, 'compose')
    sandbox.stub(Logger, 'info')
    sandbox.stub(Migrator, 'migrate')
    t.end()
  })

  serverTest.afterEach(t => {
    sandbox.restore()
    t.end()
  })

  serverTest.test('exporting should', function (exportingTest) {
    let serverUri = 'http://central-end-user-registry'

    exportingTest.test('run all required actions when starting server', function (assert) {
      let startStub = sandbox.stub().returns(P.resolve({}))
      let server = { start: startStub, info: { uri: serverUri } }

      Glue.compose.returns(P.resolve(server))
      Db.connect.returns(P.resolve({}))
      Migrator.migrate.returns(P.resolve({}))

      require('../../src/server')
        .then(() => {
          assert.ok(Migrator.migrate.calledOnce)
          assert.ok(Db.connect.calledOnce)
          assert.ok(Glue.compose.calledOnce)
          assert.ok(startStub.calledOnce)
          assert.ok(Logger.info.calledOnce)
          assert.ok(Logger.info.calledWith(`Server running at: ${serverUri}`))
          assert.end()
        })
    })

    exportingTest.end()
  })

  serverTest.end()
})
