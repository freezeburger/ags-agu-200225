const { createServer:createHttpServer } = require('http');
const { createServer:createTcpServer } = require('net');

module.title = 'Server Api Result';

const requestHandler = (request,response) => {
    console.log('Incoming Request');
    response.end(module.title);
}

const httpServer = createHttpServer(requestHandler);

const AppServer = require('../core/app-server');
const server = new AppServer(httpServer);
module.exports.start = server.start.bind(server)
