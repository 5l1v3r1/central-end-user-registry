'use strict'

const Config = require('./lib/config')
const Pack = require('../package')
const ErrorHandling = require('@leveloneproject/central-services-error-handling')

module.exports = {
  connections: [
    {
      port: Config.PORT,
      routes: {
        validate: ErrorHandling.validateRoutes()
      }
    }
  ],
  registrations: [
    { plugin: 'inert' },
    { plugin: 'vision' },
    { plugin: '@leveloneproject/central-services-error-handling' },
    { plugin: './routes' },
    {
      plugin: {
        register: 'hapi-swagger',
        options: {
          info: {
            'title': 'Central End User Registry API Documentation',
            'version': Pack.version
          }
        }
      }
    },
    { plugin: 'blipp' }
  ]
}
