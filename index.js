var express = require('express'),
    path = require('path');

var subscribe = require('./routes/subscribe');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'public', 'dist', 'pages', 'index.html'));
});

app.get('/letmeknow', function(req, res) {

});

app.post('/subscribe', subscribe.send_to_mailchimp);

app.get('/*', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'public', 'dist', 'pages', '404.html'));
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});