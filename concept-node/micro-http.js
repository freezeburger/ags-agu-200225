console.log("Micro Http Server");

const http = require("http");

// function requestListener(req,res){}
let count = 0;

const requestListener = (req, res) => {
    count += 1;
    res.end( `Count ${count}` )
};

http.createServer(requestListener).listen(5050);
