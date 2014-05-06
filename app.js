var ejs = require('ejs')
  , http = require('http')
  , path = require('path')
  , api = require('./api')
  , express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'public'));
app.engine('html', ejs.renderFile);

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.configure('development', function () {
  app.use(express.errorHandler());
});

api.register(app);
app.get('/', function(req, res) {
  res.render('index.html', { title: 'Minerva' });
});

app.listen(3000)