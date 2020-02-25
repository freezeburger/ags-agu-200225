const { createServer:createHttpServer } = require('http');
const { createServer:createTcpServer } = require('net');

module.title = 'Server Api Search';

const requestHandler = (request,response) => {
    console.log('Incoming Request');
    response.end(module.title);
}

const httpServer = createHttpServer(requestHandler);

const defaultListeningCallback = () => {
    const { address, port } = httpServer.address();
    console.log(` Started ${module.title} on http://${address}:${port}`)
}

module.exports.start = ( PORT_NUMBER , listeningCallback = defaultListeningCallback ) => {
    httpServer.listen(PORT_NUMBER,'localhost', listeningCallback )
}
