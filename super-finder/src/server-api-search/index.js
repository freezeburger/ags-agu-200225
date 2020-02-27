const { createServer: createHttpServer } = require("http");

module.title = "Server Api Search";

/**
 * Updating to KOA JS
 */

const Koa = require("koa");
const cors = require("@koa/cors");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const koaServer = new Koa();
const koaRouter = new Router();

koaRouter.get('/', (ctx, next) => {
  ctx.body = module.title;
});

koaRouter.get('/search', (ctx, next) => {
  ctx.body = 'Search';
  console.log(ctx.request.body);
});

const generalHandler = async (ctx,next) => {
  console.log("Incoming Request");
  next();
};

koaServer.use(cors());
koaServer.use(bodyParser());
koaServer.use(generalHandler);
koaServer.use(koaRouter.routes());

const httpServer = createHttpServer(koaServer.callback());

const AppServer = require("../core/app-server");
const server = new AppServer(httpServer);
module.exports.start = server.start.bind(server);
