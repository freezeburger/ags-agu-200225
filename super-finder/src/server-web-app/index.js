const { createServer: createHttpServer } = require("http");
const { createServer: createTcpServer } = require("net");
const { Transform: TransformPipe } = require("stream");
const { createReadStream } = require("fs");
const { resolve: resolvePath } = require("path");

module.title = "Server Web App";

const requestHandler = (request, response) => {
  console.time("REQ");

  if (request.url === "/favicon.ico") return response.end();

  console.log(`${module.title} : Incoming Request`);

  const transformerHTML = new TransformPipe({
    transform(text, encoding, next) {
      let html = text.toString().replace(/{{TITLE}}/g, module.title);
      html = html.replace(
        /{{SEARCH_API_PORT_NUMBER}}/g,
        process.env.API_SEARCH_PORT
      );
      return next(null, html);
    }
  });

  const indexFile = createReadStream(
    resolvePath(__dirname, "static", "index.html")
  )
    .pipe(transformerHTML)
    .pipe(response);

/*   console.groupCollapsed("Houuuu");
  console.timeEnd("REQ");
  console.table(process.env)
  console.groupEnd(); */
};

const httpServer = createHttpServer(requestHandler);

const AppServer = require("../core/app-server");
const server = new AppServer(httpServer);

module.exports.start = server.start.bind(server);
