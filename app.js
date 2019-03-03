const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log('Fist middleware');
//
//   next();
// });
//
// app.use((req, res, next) => {
//   console.log('Second middleware');
//
//   res.send('<h2>Test middleware</h2>');
// });

app.use('/users', (req, res) => {
  res.send('<h1>Users</h1>');
});

app.use('/', (req, res) => {
  res.send('<h1>Homepage</h1>');
});

app.listen(3000);