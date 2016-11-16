'use strict'

const Config = require('./lib/config')
const Pack = require('../package')

module.exports = {
  connections: [
    {
      port: Config.PORT,
      routes: {
        validate: require('@leveloneproject/central-services-error-handling').validateRoutes()
      }
    }
  ],
  registrations: [
    { plugin: 'inert' },
    { plugin: 'vision' },
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
    { plugin: 'blipp' },
    { plugin: '@leveloneproject/central-services-error-handling' }
  ]
}
