const { createServer: createHttpServer } = require("http");

module.title = "Server Api Search";

/**
 * Updating to KOA JS
 */

const Koa = require("koa");
const koaServer = new Koa();

const requestHandler = async (ctx) => {
  console.log("Incoming Request");
  ctx.body = module.title;
};

koaServer.use(requestHandler);

const httpServer = createHttpServer(koaServer.callback());

const AppServer = require("../core/app-server");
const server = new AppServer(httpServer);
module.exports.start = server.start.bind(server);
