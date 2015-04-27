var express = require('express');
var compress = require('compression');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var jade = require('jade');

var port = process.env.port || 8082;
var env = process.env.NODE_ENV || 'development';
// utilities
app.locals.moment = require('moment');
var data = {};

data.config = require('./app/scripts/config.js');
data.footer = require('./app/locales/en/footer.json');
data.moment = app.locals.moment;

//get data only for (isRendering == true) modules
data.config.modules.forEach(function(module) {
  if (module.isRendering) {
    var mod = module.component;
    var path = './app/locales/en/' + mod + '.json';
    data[mod] = require(path);
  }
});

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// index url
app.get('/', function(req, res) {
  // res.setHeader('Cache-Control', 'no-cache');
  res.render('index', data);
});

//Route not found -- Set 404
app.get('*', function(req, res) {
  res.status(404).send('Sorry this page does not exist!');
});

app.listen(port);

console.log(env.toUpperCase() + ' server is up and running at port : ' + port);
