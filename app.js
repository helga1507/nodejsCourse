const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// for request body
app.use(bodyParser.urlencoded({extended: false}));

//for public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', usersRouter);
app.use(mainRouter);

app.use((req, res) => {

  res.status(404).render('404', {titlePage: 'Not found', url: ''});
});

app.listen(3000);