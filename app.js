const http = require('http');
const routing = require('./routes');

const server = http.createServer(routing);

server.listen(3000);

