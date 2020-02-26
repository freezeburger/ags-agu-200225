const {EventEmitter} = require('events');

class AppWorker extends EventEmitter{

    constructor(){
        super();

        this.events = Object.seal({
            INIT:1,
            STARTED:2,
            JOB_START:3,
            JOB_FINISH:4
        });
    }

    start(){
        this.emit(this.events.INIT);
        return Promise.resolve(true);
    }
}

module.exports = AppWorker;