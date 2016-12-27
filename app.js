var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

//Variable for database
var db = 'mongodb://localhost/bookstore';


mongoose.connect(db);

//Listning port
var port = 8080;

app.listen(port, function(){
	console.log('App listning on port' + port);
});


