const AppWorker = require("../core/app-worker");
const worker = new AppWorker();

const MongoClient = require("mongodb").MongoClient;

const { promisify } = require("util");
const connectMongo = promisify(MongoClient.connect.bind(MongoClient));

let url;
let dbName;

const saveNewSearchRequest = (msg, data) => {
  connectMongo(url)
    .then(client => {
      client.db(dbName).collection("requests").insertOne(data);
      client.close()
    })
};

const saveSearchResults = (msg, data) => {
    connectMongo(url)
    .then(client => {
      client.db(dbName).collection("searches").insertOne(data);
      client.close()
    })
};

const readSearchesRequest = (msg, data) => {
  connectMongo(url)
  .then(client => {
    client.db(dbName).collection("searches").find({}).toArray( (err,data) => {
      global.PubSub.publish(PubSub.topics.SEARCH_RESULT_LIST_RESPONSE, data.map( item => item.search) || [])
    })
    client.close()
  })
};

const readResultFormSearch = (msg, data = {} ) => {


  const keywords =  new RegExp(data.keywords || '.',"g");

  connectMongo(url)
  .then(client => {
    client.db(dbName).collection("searches").find({'search.keywords':keywords}).toArray( (err,data) => {
      global.PubSub.publish(PubSub.topics.SEARCH_RESULT_KEYWORD_RESPONSE, data.map( item => item.results)[0] || [])
    })
    client.close()
  })
};

const initialize = () => {
  url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
  dbName = process.env.DB_NAME;

  global.PubSub.subscribe(PubSub.topics.SEARCH_REQUEST_NEW, saveNewSearchRequest);
  global.PubSub.subscribe(PubSub.topics.SEARCH_REQUEST_DONE, saveSearchResults);

  global.PubSub.subscribe(PubSub.topics.SEARCH_RESULT_KEYWORD_REQUEST, readResultFormSearch);
  global.PubSub.subscribe(PubSub.topics.SEARCH_RESULT_LIST_REQUEST, readSearchesRequest);
};

worker.once(worker.events.INIT, () => {
  initialize();
  worker.emit(worker.events.STARTED);
});

module.exports = worker;
