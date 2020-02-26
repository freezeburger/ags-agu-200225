const { createServer: createHttpServer } = require("http");
const { createServer: createTcpServer } = require("net");
const {Transform} = require('stream')
const {createReadStream} = require('fs')
const {resolve:resolvePath} = require('path')

module.title = "Server Web App";


const transformerHTML = new Transform({
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

const defaultListeningCallback = () => {
  const { address, port } = httpServer.address();
  console.log(` Started ${module.title} on http://${address}:${port}`);
};

module.exports.start = (
  PORT_NUMBER,
  listeningCallback = defaultListeningCallback
) => {
  httpServer.listen(PORT_NUMBER, "localhost", listeningCallback);
};
