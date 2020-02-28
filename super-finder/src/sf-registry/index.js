const AppWorker = require('../core/app-worker')
const worker = new AppWorker()

worker.once(worker.events.INIT, () => {
    worker.emit(worker.events.STARTED)
})

module.exports = worker;