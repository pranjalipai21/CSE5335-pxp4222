var express = require('express');
var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000/db');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

var pg = require('pg');
var URL = "postgres://qzktucyglfzdac:F-JD5sKSz4YGesEXLvoXqUGDS0@ec2-54-235-254-199.compute-1.amazonaws.com:5432/df91hectgj13ib?ssl=true";

app.get('/dbc', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	var query = client.query('SELECT * FROM tab_one');
     query.on("row", function (row,result){
      result.addRow(row);
      });
	  query.on("end", function (result){
			rowResult= JSON.stringify(result.rows);
	  client.end();
	  return response.send(rowResult);
	  });
  });
});

var fs = require('fs');
app.get('/db', function(request, response) {
var contents = fs.readFileSync('data.json', 'utf8');
//console.log(contents);
response.type('text/json');
return response.send(contents)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


