var express = require('express');
var app = express();

var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/list', function (req, res) {
    res.send({"status": "true"});
});

var server = app.listen(3001, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});
