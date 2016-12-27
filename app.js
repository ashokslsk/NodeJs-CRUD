var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');
//Listning port
var port = 8080;
//Variable for database
var db = 'mongodb://localhost/bookstore';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
});

mongoose.connect(db);

app.get('/', function(req,res){
   res.send('happy to learn nodeJS');
});


/**
*
Books api results are 
----------------------------
[{"_id":"586232b1c84bb5c0927dc20a","title":"Refactoring the DOM","author":"Joe Blow","category":"Technology"},
{"_id":"586232b1c84bb5c0927dc20b","title":"Learn Colloquial Speech","author":"Susie Q","category":"Humanities"},
{"_id":"586232b1c84bb5c0927dc20c","title":"Study of the Brain","author":"Matt G","category":"Health"}]

*/
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


/*
* 
Single query request 
Book/id API And its results
---------------------
{"_id":"586232b1c84bb5c0927dc20a","title":"Refactoring the DOM","author":"Joe Blow","category":"Technology"}
*/

app.get('/books/getbook/:id', function(req, res){
	console.log('Getting one book');
	Book.findOne({
		_id: req.params.id
	})
	.exec(function(err,book){
		if(err){
			res.send('Error occured please check your book id');
		}else{
			console.log(book);
			res.json(book); 
		}
	});
});

/*
* Post method for updating new data to mongoDB
*/





// Now lets write node query for fetching one book information

app.listen(port, function(){
	console.log('App listning on port :' + port);
});


