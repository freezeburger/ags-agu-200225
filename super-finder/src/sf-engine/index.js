const AppWorker = require("../core/app-worker");
const worker = new AppWorker();

const { request } = require("./requester");
const { map } = require("./mappers");

const search = (keywords = "Dark Chocolate") => {
  return request(keywords)
    .then(map)
    .then(data => Object.assign(data, { keywords: keywords.split(" ") }))
    .then( result => { worker.emit(worker.events.JOB_FINISH, result ); return result})
    .then( result => { global.PubSub.publish(PubSub.topics.SEARCH_REQUEST_DONE, result ); return result})
    //.then(console.log)
}

global.PubSub.subscribe(PubSub.topics.SEARCH_REQUEST_NEW, (msg,data) => {
  global.PubSub.publish(PubSub.topics.SEARCH_REQUEST_PROCESSING, data )
  search(data.keywords);
})

// worker.on(worker.events.JOB_START, search )

worker.once(worker.events.INIT, () => {
  worker.emit(worker.events.STARTED);
});

module.exports = worker;
