'use strict'

const Joi = require('joi')
const Handler = require('./handler')
const tags = ['api']

exports.register = (server, options, next) => {
  server.route(
    [
      {
        method: 'GET',
        path: '/health',
        handler: Handler.health,
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
              number: Joi.number().integer().required()
            }
          }
        }
      },
      {
        method: 'POST',
        path: '/users',
        handler: Handler.createUser,
        config: {
          tags: tags,
          validate: {
            payload: {
              url: Joi.string().uri().required()
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
