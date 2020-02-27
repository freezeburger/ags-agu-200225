const { promisify } = require("util");

class AppServer {
  constructor(server) {
    this.server = server;
    this.listen = promisify(this.server.listen.bind(this.server));
  }
  start(PORT_NUMBER) {
    return this.listen(PORT_NUMBER, process.env.GLOBAL_HOST).then(() =>
      this.server.address()
    );
  }
}

module.exports = AppServer;
