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