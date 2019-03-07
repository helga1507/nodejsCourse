const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');
const shopRoutes = require('./routes/shop');
const adminData = require('./routes/admin');

const app = express();

// app.engine('hbs', expressHbs({
//   layoutsDir: 'views/layouts',
//   defaultLayout: 'main-layout',
//   extname: 'hbs' //extension all file template
// }));

//set templater
app.set('view engine', 'ejs');

//can be other folder, not 'views'
//folder with templates
//default folder - views
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).render('404', {pageTitle: 'Not Found', path: ''});
});

app.listen(3000);