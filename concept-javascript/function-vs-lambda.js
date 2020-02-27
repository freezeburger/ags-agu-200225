function pof() {}

const lambda = () => {};

const bob = {};
console.log(1, bob.unicorn);
console.log(2, pof.prototype);
console.log(3, lambda.prototype);

const o1 = new pof();
console.log(o1.constructor);

// const o2 = new lambda();
/* module.exports.name = 'Bazinga' 

const joey = {
    name:'joey',
    hi:()=>{
        console.log(this.name)
    }
}

const chandler = {
    name:'chandler'
}

joey.hi()
joey.hi.call(chandler) */

/* const yoproto = {
    name :'yoproto'
}

const yo = {
    __proto__:yoproto
}
// console.log(Object.prototype.toString.call(yo))
console.log(yo.name) */

/* class AppServer {
  constructor(server) {
    this.server = server;
    this.listen = () => true;
  }
  start(PORT_NUMBER) {
    return this.listen();
  }
} */

/* function AppServer(server) {
  this.server = server;
  this.listen = () => true;
}
AppServer.start = function() {
  return this.listen();
};

const ap = new AppServer(123456)
ap = {
    __proto__:AppServer, 
    server:123456,
    listen:()=>true
} */