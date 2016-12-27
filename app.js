var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');
//Listning port
var port = 8080;
//Variable for database
var db = 'mongodb://localhost/bookstore';


mongoose.connect(db);

app.get('/', function(req,res){
   res.send('happy to learn nodeJS');
});

app.get('/books', function(req,res){
	console.log('getting all books');
	Book.find({})
	.exec(function(err, books){
		if(err){
			res.send('error has occured');
		}else {
			console.log('getting all books ->' + books);
			res.json(books);
		}
	});
});

app.listen(port, function(){
	console.log('App listning on port :' + port);
});


