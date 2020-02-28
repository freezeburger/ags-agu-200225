const { createServer: createHttpServer } = require("http");
const { createServer: createTcpServer } = require("net");

module.title = "Server Api Result";

const express = require("express");
const expressServer = express();

const requestHandler = (req, res, next) => {
  console.log("Incoming Request");
  next();
};

expressServer.use(requestHandler);

expressServer.get("/", (req, res, next) => {
  res.end(module.title);
});

expressServer.get("/requests", (req, res, next) => {
  res.type('application/json')
  global.PubSub.publish(PubSub.topics.SEARCH_RESULT_LIST_REQUEST,null)

  const subscriber = (msg,data) =>{
    res.json(data);
    global.PubSub.unsubscribe(subscriber);
  }
  global.PubSub.subscribe(PubSub.topics.SEARCH_RESULT_LIST_RESPONSE,subscriber)

});

expressServer.get("/results", (req, res, next) => {

  res.type('application/json')
  global.PubSub.publish(PubSub.topics.SEARCH_RESULT_KEYWORD_REQUEST, {keywords:req.query.keyword})

  const subscriber = (msg,data) =>{
    res.json(data);
    global.PubSub.unsubscribe(subscriber);
  }
  global.PubSub.subscribe(PubSub.topics.SEARCH_RESULT_KEYWORD_RESPONSE,subscriber)

});

const httpServer = createHttpServer(expressServer);

const AppServer = require("../core/app-server");
const server = new AppServer(httpServer);
module.exports.start = server.start.bind(server);
