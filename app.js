const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');

const app = express();

// for request body
app.use(bodyParser.urlencoded({extended: false}));

//for public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', usersRouter);
app.use(mainRouter);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);