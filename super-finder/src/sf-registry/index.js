const AppWorker = require("../core/app-worker");
const worker = new AppWorker();

const MongoClient = require("mongodb").MongoClient;

const { promisify } = require("util");
const connectMongo = promisify(MongoClient.connect.bind(MongoClient));

let url;
let dbName;

const saveNewSearch = (msg, data) => {
  connectMongo(url)
    .then(client => {
      client.db(dbName).collection("searches").insertOne(data);
      return client;
    }).then(client => client.close());
};

const readSearches = (msg, data) => {
  console.log("registry", msg, data);
};

const saveSearchResults = (msg, data) => {
    connectMongo(url)
    .then(client => {
      client.db(dbName).collection("results").insertOne(data);
      return client;
    }).then(client => client.close());
};

const readResultFormSearch = (msg, data) => {
  console.log("registry", msg, data);
};

const initialize = () => {
  url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
  dbName = process.env.DB_NAME;
  global.PubSub.subscribe(PubSub.topics.SEARCH_REQUEST_NEW, saveNewSearch);
  global.PubSub.subscribe(PubSub.topics.SEARCH_REQUEST_DONE, saveSearchResults);
  global.PubSub.subscribe(PubSub.topics.SEARCH_RESULT_GET, readResultFormSearch);
  global.PubSub.subscribe(PubSub.topics.SEARCH_RESULT_LIST, readSearches);
};

worker.once(worker.events.INIT, () => {
  initialize();
  worker.emit(worker.events.STARTED);
});

module.exports = worker;
