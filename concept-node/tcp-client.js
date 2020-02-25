const tcp = require("net");
const fs = require("fs");

const log = fs.createWriteStream('log.txt',{flags:'w+'})

const socket = tcp.createConnection(5055, "localhost");

process.stdin.pipe(socket)
socket.pipe(process.stdout)
socket .pipe(log)

/* socket.on("data", data => {
  console.log(`Server Sent :${data.toString()}`);
});
 */