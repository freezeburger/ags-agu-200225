
const tcp = require('net');

const connectionListener = socket => {
    console.log('New Connection')

    socket.write('Hello Client !')

    socket.on('data', data => {
        socket.write(`Received :${data.toString()}`)
    })
}

tcp.createServer(connectionListener).listen(5055)