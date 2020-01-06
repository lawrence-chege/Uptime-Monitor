/*
* Primary file for
* An Uptime monitor app
*
*/

// Dependencies
const http = require('http');
const url = require('url');

// the server should respond

const server = http.createServer((req, res)=>{
    
    // get the url and parse
    const parsedUrl = url.parse(req.url, true);

    // get the path name
    const path = parsedUrl.pathname

    //trimmedPath
    const trimmedPath = path.replace(/^\/+|\/+$/g,'')

    //get the HTTP method

    const method = req.method.toLowerCase();

    res.end('Hello World\n');

    //log the url
    console.log("Request recieved on path: "+ trimmedPath +"With this method: "+ method);
});




// Set server to listen to port 

server.listen(3000, function(){
    console.log("The server is listening on port 3000 now");
});
