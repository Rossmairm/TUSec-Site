var friend = require('port-friends'),
    express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon');

var app = express();

app.set('port', process.env.PORT || 80);
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
app.use('/static', express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'dist', 'pages', 'index.html'));
});

app.get('/register', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'dist', 'pages', 'register.html'));
});

app.get('/*', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'dist', 'pages', '404.html'));
});

app.listen(app.get('port'), friend({
  myport: app.get('port'),
  mode: app.get('env')
}));
