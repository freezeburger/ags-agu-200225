console.log('process');

const sub = require('./process-sub-module')

process.title = 'I am Groot';

console.log(module)
console.log(module === process.mainModule)
console.log(this === module.exports)

let num = 100;
sub.count()

//console.log(process)

/* const listener = ()=> console.log(123)
process.stdin.on('data', listener)

 setTimeout( 
    ()=> {
        process.stdin.removeAllListeners('data')
        // process.exit()
        console.log(process.pid)
        //process.kill(process.pid)
    },3000) */