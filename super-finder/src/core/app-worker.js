const {EventEmitter} = require('events');

class AppWorker extends EventEmitter{

    constructor(){
        super();

        this.events = Object.seal({
            INIT:1,
            STARTED:2,
            FINISHING:3,
            FINISHED:4
        });
    }

    start(){
        this.emit(this.events.INIT);
        return Promise.resolve(true);
    }
}

module.exports = AppWorker;