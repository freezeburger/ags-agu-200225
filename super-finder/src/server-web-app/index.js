const { createServer: createHttpServer } = require("http");
const { createServer: createTcpServer } = require("net");
const { Transform: TransformPipe } = require("stream");
const { createReadStream } = require("fs");
const { resolve: resolvePath } = require("path");

module.title = "Server Web App";

const transformerHTML = new TransformPipe({
  transform(text, encoding, next) {
    const html = text.toString().replace(/{{TITLE}}/g, module.title);
    next(null, html);
  }
});

const requestHandler = (request, response) => {
  console.log(`${module.title} : Incoming Request`);

  const indexFile = createReadStream(
    resolvePath(__dirname, "static", "index.html")
  )
    .pipe(transformerHTML)
    .pipe(response);
};

const httpServer = createHttpServer(requestHandler);

const AppServer = require('../core/app-server');
const server = new AppServer(httpServer);

// const server = new require('../core/app-server')(httpServer);

module.exports.start = server.start.bind(server)

