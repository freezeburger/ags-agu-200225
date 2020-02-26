const { createServer: createHttpServer } = require("http");
const { createServer: createTcpServer } = require("net");
const { Transform: TransformPipe } = require("stream");
const { createReadStream } = require("fs");
const { resolve: resolvePath } = require("path");

module.title = "Server Web App";

const requestHandler = (request, response) => {
  if (request.url === "/favicon.ico") return response.end();

  console.log(`${module.title} : Incoming Request`);

  const transformerHTML = new TransformPipe({
    transform(text, encoding, next) {
      const html = text.toString().replace(/{{TITLE}}/g, module.title);
      return next(null, html);
    }
  });

  const indexFile = createReadStream(
    resolvePath(__dirname, "static", "index.html")
  )
    .pipe(transformerHTML)
    .pipe(response);

};

const httpServer = createHttpServer(requestHandler);

const AppServer = require("../core/app-server");
const server = new AppServer(httpServer);

module.exports.start = server.start.bind(server);
