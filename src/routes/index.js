'use strict'

const Joi = require('joi')
const Handler = require('./handler')
const tags = ['api']

exports.register = (server, options, next) => {
  server.route(
    [
      {
        method: 'GET',
        path: '/',
        handler: Handler.health,
        config: {
          tags: tags
        }
      },
      {
        method: 'GET',
        path: '/users',
        handler: Handler.getUsers,
        config: {
          tags: tags
        }
      },
      {
        method: 'GET',
        path: '/users/{number}',
        handler: Handler.getUserByNumber,
        config: {
          tags: tags,
          validate: {
            params: {
              number: Joi.string().regex(/^[0-9]{1,8}$/).required()
            }
          }
        }
      },
      {
        method: 'POST',
        path: '/register',
        handler: Handler.registerIdentifier,
        config: {
          tags: tags,
          validate: {
            payload: {
              number: Joi.number().required(),
              dfsp_identifier: Joi.string().required()
            }
          }
        }
      }
    ]
  )

  next()
}

exports.register.attributes = {
  name: 'routes'
}
