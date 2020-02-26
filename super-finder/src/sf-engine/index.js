const AppWorker = require('../core/app-worker')
const worker = new AppWorker()

worker.once(worker.events.INIT, () => {
    console.log('OK')
    worker.emit(worker.events.STARTED)
})

require('./requester').request('Dark Chocolate').then(console.log)

module.exports = worker;