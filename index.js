/*
An Uptime monitor app

*/

// import the http module
const http = require('http');

// the server should respond

const server = http.createServer(function(req, res){
    res.end('Hello World');
});

// Set server to listen to port 

server.listen(3000, function(){
    console.log("The server is listening on port 3000 now");
});
