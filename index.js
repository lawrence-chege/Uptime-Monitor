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
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', function(){
        buffer += decoder.end();

        //choose the handler for request
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined'? router[trimmedPath] : handlers.notFound

        //construct the dater object to send to handler

        const data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject': querryStringObject,
            'method': method,
            'headers' : headers,
            'payload': buffer

        };

        //route the request to the specified handler
        chosenHandler(data, (statusCode, payload)=>{
            //use the status code called back by handler or default to 200
            //use the payload called back by handler or use an empty object
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object'? payload : {};

            //convert payload to sting
            const payloadString = JSON.stringify(payload);

            //return the response
            res.setHeader('Content-Type','application/json')
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log("Returning this response:", statusCode, payloadString)


        });

    });

  
});




// Set server to listen to port 

server.listen(port, function(){
    console.log("The server is listening on port "+ port+" now");
});

//Define the andlers
const handlers = {}

//user handler
handlers.user = (data, callback) =>{
    // callback a http status code and a payload object
    callback(406,{'name': 'User handler'});

};

//Not found handler
handlers.notFound = (data, callback) =>{
    callback(404);

};

// Define a request router
const router = {
    'user' : handlers.user
     
}