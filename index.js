/*
* Primary file for
* An Uptime monitor app
*
*/

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');

// the server should respond
const httpPort = config.httpPort;
const httpsPort = config.httpsPort;
const env = config.envName

//instantiate http server
const httpServer = http.createServer((req, res) => {
    unifiedServer(req,res);
});

//instntiate https server
const httpsServerOptions ={
    'key': fs.readFileSync('./ssl/key.pem'),
    'cert': fs.readFileSync('./ssl/cert.pem')

};
const httpsServer = https.createServer(httpsServerOptions,(req, res) => {
    unifiedServer(req,res);
});


// Set server to listen to port 

httpServer.listen(httpPort, function () {
    console.log("The server is listening on port " + httpPort + " now in " + env + " mode");
});

httpsServer.listen(httpsPort, function () {
    console.log("The server is listening on port " + httpsPort + " now in " + env + " mode");
});

// A unified server to handle server logic
const unifiedServer = (req, res) => {
    // get the url and parse
    const parsedUrl = url.parse(req.url, true);

    // get the path name
    const path = parsedUrl.pathname

    // Get the query string as an object

    const querryStringObject = parsedUrl.query;

    //trimmedPath
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')

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

    req.on('end', function () {
        buffer += decoder.end();

        //choose the handler for request
        const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

        //construct the dater object to send to handler

        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': querryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer

        };

        //route the request to the specified handler
        chosenHandler(data, (statusCode, payload) => {
            //use the status code called back by handler or default to 200
            //use the payload called back by handler or use an empty object
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};

            //convert payload to sting
            const payloadString = JSON.stringify(payload);

            //return the response
            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log("Returning this response:", statusCode, payloadString)


        });

    });


};

//Define the andlers
const handlers = {}

//user handler
handlers.user = (data, callback) => {
    // callback a http status code and a payload object
    callback(406, { 'name': 'User handler' });

};
//uptime router
handlers.ping = (data, callback) => {
    callback(200);

};

//Not found handler
handlers.notFound = (data, callback) => {
    callback(404);

};

// Define a request router
const router = {
    'user': handlers.user,
    'ping': handlers.ping

}