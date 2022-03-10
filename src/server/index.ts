import express from 'express'
import { connect } from 'mongoose'
import morgan from 'morgan'
import { json } from 'body-parser'
import session from 'express-session'
import createStore from 'connect-mongodb-session'

import { registerRoutes } from './routes'
import { Config } from './Config'

// Augment session type with custom data
declare module 'express-session' {
  interface SessionData {
    authorized?: boolean
    userId?: string
  }
}

const MongoDBStore = createStore(session)

const startServer = async () => {
  await connect(Config.db.connectionString)

  const app = express()

  app.use(morgan('combined'))
  app.use(json())

  app.use(
    session({
      store: new MongoDBStore({
        uri: Config.sessionStore.connectionString,
        collection: Config.sessionStore.collection,
      }),
      secret: Config.security.secret,
      cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
    })
  )

  registerRoutes(app)

  app.listen(3080, () => {
    console.log('listening')
  })
}

startServer()
