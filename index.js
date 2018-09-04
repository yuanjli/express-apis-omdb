const express = require('express');
const expressEjslayout = require('express-ejs-layouts');
const request = require('request');
const app = express();

// var express = require('express');
// var app = express();

app.set('view engine', 'ejs');

// this adds some logging to each request
app.use(require('morgan')('dev'));
app.use(expressEjslayout);
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.render('home');
});
					
//$('#btnSearch').on('click', function () {
// 	var searchInput = $('#textBoxElement').val();	
app.get('/results', function(req, res) {
	console.log('req.query:', req.query);
	let movie = req.query.movie;
//	var url = "http://monkey=" + searchInput + "&red";
	request('http://www.omdbapi.com?apikey=a4444cbe&s=${movie}', function(err, response, body){
		if(!err && response.statusCode === 200){
			var parsedJson = JSON.parse(body);
			console.log('OMDB body results:', parsedJson);
			res.render('results', {results: parsedJson.Search});
		}
		else {
			console.log(err);
			res.send('error');
		}
		res.send('Hello Backend!');
	});
    // var url = "http://monkey=" + searchInput + "&red";
    // window.open(url);
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
