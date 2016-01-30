var appData = require('./package.json');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var compress = require('compression');
var express = require('express');
var app = express();

var port = process.env.port || 8080;
var env = process.env.NODE_ENV || 'development';

var appEnvData = {
  version: appData.version,
  env: env
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('views/index.html'));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

// index url
app.get('/', function(req, res) {
  res.render('index', appEnvData);
});

//Route not found -- Set 404
app.get('*', function(req, res) {

  res.status(404).send("Sorry this page does not exist!");
});

app.listen(port);

console.log(env.toUpperCase() + ' server is up and running at port : ' + port);
