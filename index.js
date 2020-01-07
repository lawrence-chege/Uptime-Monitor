/*
* Primary file for
* An Uptime monitor app
*
*/

// Dependencies
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

// the server should respond
const port = 3500

const server = http.createServer((req, res)=>{
    
    // get the url and parse
    const parsedUrl = url.parse(req.url, true);

    // get the path name
    const path = parsedUrl.pathname

    // Get the query string as an object

    const querryStringObject = parsedUrl.query;

    //trimmedPath
    const trimmedPath = path.replace(/^\/+|\/+$/g,'')

    //get the HTTP method 

    const method = req.method.toLowerCase();

    //get headers
    const headers = req.headers;

    //get the payload
    const decoder = new stringDecoder('utf-8');
    const buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', ()=>{
        buffer += decoder.end();

        //send the response
        res.end('Hello World\n');

        //log the url
        console.log("Request recieved with this payload:", buffer)

    });

  
});




// Set server to listen to port 

server.listen(port, function(){
    console.log("The server is listening on port "+ port+" now");
});
