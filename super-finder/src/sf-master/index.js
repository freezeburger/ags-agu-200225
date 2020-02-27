const colors = require('colors');
const { username } = require('os').userInfo();
const {start:startApiResult} = require('../server-api-result');
const {start:startApiSearch} = require('../server-api-search');
const {start:startWebApp} = require('../server-web-app');

const greetings = '° Welcome to Super Finder !!'.bgGreen.black
const title = 'Super Finder';
const { pid } = process;
const time = Date.now();
const config = {
    'server-web-app':8081,
    'server-api-search':8082,
    'server-api-result':8083
}


const startMessage = `
    ${greetings}

    Program : ${title} - PID ${pid}
    Started at : ${time} - ${new Date(time)}
    By : ${username}

    **Starting Workers**

`;

//----------------------------------------
// Starting Workers
//----------------------------------------
// TODO code: 'EADDRINUSE'

const sfEngine= require('../sf-engine');
const sfMailer= require('../sf-mailer');
const sfRegistry= require('../sf-registry');

const main = async ()=>{
    process.title = title;
    process.stdout.write(startMessage);

    sfEngine.emit(sfEngine.events.JOB_START, 'Triskell')
    //sfEngine.on(sfEngine.events.JOB_FINISH, data => require('fs').createWriteStream('data.json').write(JSON.stringify(data)))

    console.log(``)

    await startApiResult(config['server-api-result']).then( infos => console.log('server-api-result', infos));
    await startApiSearch(config['server-api-search']).then( infos => console.log('server-api-search', infos));
    await startWebApp(config['server-web-app']).then( infos => console.log('server-web-app', infos));
}

main(); 