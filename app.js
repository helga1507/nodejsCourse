const http = require('http');
const express = require('express');

const app = express();

//use - add new middleware
app.use((req, res, next) => {
  console.log('in the middleware');

  //allows the continue to the next middleware
  next();
});

app.use((req, res, next) => {
  console.log('in the another middleware');

  return res.end();
});

const server = http.createServer(app);

server.listen(3000);