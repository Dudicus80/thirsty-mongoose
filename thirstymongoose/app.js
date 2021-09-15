//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const database = require('./database/database');
const routes = require('./routes/routes');

//handlebars engine
app.engine('hbs', handlebars({
   layoutsDir: __dirname + '/views/layouts',
   extname: 'hbs',
   defaultLayout: 'index' 
}));
app.set('view engine', 'hbs')

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//public routes
app.use(express.static('public'));

routes(app);

module.exports = app;