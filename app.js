const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const express = require('express');
const http = require('http');
const path = require('path');

const routes = require('./routes');

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.get('/', routes.index);
app.options('/convert', routes.convertOptions);
app.post('/convert', routes.convert);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
