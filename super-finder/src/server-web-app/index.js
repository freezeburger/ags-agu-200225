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

/* const defaultListeningCallback = () => {
  const { address, port } = httpServer.address();
  console.log(` Started ${module.title} on http://${address}:${port}`);
};
 */

// Doit retourner une new Promise donnat les infos `http://${address}:${port}`
/* module.exports.start = PORT_NUMBER => {
  return new Promise((resolve, reject) => {
    //  console.log(` Started ${module.title} on http://${address}:${port}`);
    httpServer.listen(PORT_NUMBER, "localhost", () =>
      resolve(httpServer.address())
    );
  });
};
 */

const { promisify } = require("util");

module.exports.start = PORT_NUMBER => {
 const listen = promisify( httpServer.listen.bind( httpServer ) )
 return listen(PORT_NUMBER,'localhost').then( ()=> httpServer.address())
}; 
