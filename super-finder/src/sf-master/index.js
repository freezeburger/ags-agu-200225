const colors = require("colors");

/**
 * Application Components
 */
const { start: startApiResult } = require("../server-api-result");
const { start: startApiSearch } = require("../server-api-search");
const { start: startWebApp } = require("../server-web-app");
const sfEngine = require("../sf-engine");
const sfMailer = require("../sf-mailer");
const sfRegistry = require("../sf-registry");
/**
 * Application Wide Message Broker
 */
global.PubSub = require("../core/sf-broker");

/**
 * Variables Initialisation
 */
const { username } = require("os").userInfo();
const dotenv = require("dotenv");
const greetings = "° Welcome to Super Finder !!".bgGreen.black;
const title = "Super Finder";
const { pid } = process;
const time = Date.now();

/**
 * Load .env file keys in process.env
 */
dotenv.config();

const config = {
  "server-web-app": process.env.WEB_PORT,
  "server-api-search": process.env.API_SEARCH_PORT,
  "server-api-result": process.env.API_RESULT_PORT
};

const startMessage = `
    ${greetings}

    Program : ${title} - PID ${pid}
    Started at : ${time} - ${new Date(time)}
    By : ${username}

`;

console.table(config);

const main = async () => {
  require("console-clear")();

  process.title = title;

  process.stdout.write(startMessage);
  console.log(`
  **Environment Configuration**
  `);
  console.table(config);

  global.PubSub.subscribe(PubSub.topics.SEARCH, (msg, data) => {
    // GENERAL LISTENER
  });

  //----------------------------------------
  // Starting Workers
  //----------------------------------------
  console.log(`
  **Starting Workers**
  `);
  console.log("Starting sfEngine".blue)
  sfEngine.on(sfEngine.events.STARTED, () => console.log("sfEngine Started".green));
  await sfEngine.start()

  console.log("Starting sfMailer".blue)
  sfMailer.on(sfMailer.events.STARTED, () => console.log("sfMailer Started".green));
  await sfMailer.start()

  console.log("Starting sfRegistry".blue)
  sfRegistry.on(sfRegistry.events.STARTED, () =>console.log("sfRegistry Started".green) );
  await sfRegistry.start()
  //----------------------------------------
  // Starting Server
  //----------------------------------------

  console.log(`
  **Starting Servers **
  `);

  await startApiResult(config["server-api-result"]).then(infos =>
    console.log("server-api-result", infos)
  );
  await startApiSearch(config["server-api-search"]).then(infos =>
    console.log("server-api-search", infos)
  );
  await startWebApp(config["server-web-app"]).then(infos =>
    console.log("server-web-app", infos)
  );
};

main();
