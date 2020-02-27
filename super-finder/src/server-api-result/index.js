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

expressServer.get("/results", (req, res, next) => {
  res.type('application/json')
  require("fs")
    .createReadStream(require("path").resolve(__dirname, "data.json"), {
      encoding: "utf-8"
    })
    .pipe(res);
});

const httpServer = createHttpServer(expressServer);

const AppServer = require("../core/app-server");
const server = new AppServer(httpServer);
module.exports.start = server.start.bind(server);
