/*
 * @Author: derek
 * @Date:   2017-02-28 13:01:28
 * @Last Modified by:   Derek
 * @Last Modified time: 2017-03-30 10:27:30
 */
'use strict'
const Nuxt = require('nuxt')
const app = require('express')()
const bodyParser = require('body-parser')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const log = require('./log')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

// log.use(app)

app.set('port', port)

// Body parser
app.use(bodyParser.json())


// Sessions to create req.session
app.use(session({
    store: new RedisStore({
        host: '127.0.0.1',
        port: '6379',
        db: 1
    }),
    secret: 'super-memebox-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}))

app.use('/api', require('./service/api'))

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = (process.env.NODE_ENV === 'development')
console.log(config.dev)
// Init Nuxt.js
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
    nuxt.build()
        .catch((error) => {
            // eslint-disable-line no-console
            console.error(error)
            process.exit(1)
        })
}

// Listen the server
app.listen(port, host)
    // eslint-disable-line no-console
console.log(`Server listening on ${host} : ${port}, at ${new Date().toLocaleString()}`)

module.exports = app
