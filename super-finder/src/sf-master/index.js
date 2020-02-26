const colors = require('colors');
const { username } = require('os').userInfo();
const {start:startApiResult} = require('../server-api-result');
const {start:startApiSearch} = require('../server-api-search');
const {start:startWebApp} = require('../server-web-app');

const greetings = '° Welcome to Super Finder !!'.bgGreen.black
const title = 'Super Finder';
// const pid = process.pid;
const { pid } = process;
const time = Date.now();
// Must Hav a start method
const config = {
    'server-web-app':8081,
    'server-api-search':8082,
    'server-api-result':8083
}
process.title = title;


const startMessage = `
    ${greetings}

    Program : ${title} - PID ${pid}
    Started at : ${time} - ${new Date(time)}
    By : ${username}

    **Starting Workers**

`;

process.stdout.write(startMessage);

//----------------------------------------
// Starting Workers
//----------------------------------------
// TODO code: 'EADDRINUSE'
startApiResult(config['server-api-result']);
startApiSearch(config['server-api-search']);
startWebApp(config['server-web-app']).then(console.log)