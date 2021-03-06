'use strict'
// we load all the depencies we need
/* const {EventEmitter} = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/')
const mediator = new EventEmitter()

// verbose logging when we are starting the server
console.log('--- POLARIS X BOT Service ---')
console.log('Connecting to DB, Storage repository...')
console.log('Connecting to Concepnet repository...')

// log unhandled execpetions
process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})
process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

// event listener when the repository has been connected
mediator.on('db.ready', (db) => {
  let rep
  repository.connect(db)
    .then(repo => {
      console.log('Repository Connected. Starting Server')
      rep = repo
      return server.start({
        port: config.serverSettings.port,
        repo
      })
    })
    .then(app => {
      console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
      app.on('close', () => {
        rep.disconnect()
      })
    })
})
mediator.on('db.error', (err) => {
  console.error(err)
})

// we load the connection to the repository
config.db.connect(config.dbSettings, mediator)
// init the repository connection, and the event listener will handle the rest
mediator.emit('boot.ready')
*/
/* Server */

const cluster = require('cluster')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log(`Leader ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  require('./server/server.js')

  console.log(`Worker ${process.pid} started`)
}
