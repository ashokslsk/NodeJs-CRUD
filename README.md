# NodeJs-CRUD
**This repository has the all major methods for covering CRUD operation in the process making your Backend RestFul server.**

![Random google image](http://i0.wp.com/wassimchegham.com/wp/wp-content/uploads/2014/04/nodejs-logo.png?w=250)

__Note: To use this project you need to have node installed on your working machine__


**Checking database using robomongo**

![Random google image](https://github.com/ashokslsk/NodeJs-CRUD/blob/master/screens/database.png)

**Get API result**

![Random google image](https://github.com/ashokslsk/NodeJs-CRUD/blob/master/screens/result.png)

**Postman result after successful delete method**

![Random google image](https://github.com/ashokslsk/NodeJs-CRUD/blob/master/screens/delete.png)


## What dependencies you need to have for completing this project

```json
File Name : package.json

{
  "name": "mongooseJs",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.15.2",
    "express": "^4.14.0",
    "mongoose": "^4.7.5"
  }
}

```

-------------------------------- 
ExpressJs and mongooseJs
--------------------------------

**Step 1: Create file called app.js** 

```javascript
FileName : app.js 

```
**Step 2: Add the following requirements** 

```javascript

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

```
**Step 3 : Create the modelfile with the name Book.model.js** 
```
Book.model.js
```

**Step 4 : Add the following mongoose schema**
```javascript

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	title: String,
	author: String,
	category: String
});

module.exports = mongoose.model('Book', BookSchema)

``` 


**Step 5 : get set your app.js for port and mongodb as shown below**

```javascript 
// right after the requirements
//Listning port
var port = 8080;
//Variable for database
var db = 'mongodb://localhost/bookstore';

mongoose.connect(db);

```
**Step 6 : for setting up your first server response**

```javascript 


app.get('/', function(req,res){
   res.send('happy to learn nodeJS');
});


app.listen(port, function(){
	console.log('App listning on port :' + port);
});

```
**Step 7 : Add the following data to your mongo db through mongo shell**

```sh
db.books.insert({
    title: 'Man on the moon',
    author: 'Hashifa ',
    category: 'fiction'
})

db.books.insert({
    title: 'Being silence is easy then being non-sense',
    author: 'Boominatha prakasha',
    category: 'phylosophy'
})

db.books.insert({
    title: 'Happiness matters',
    author: 'Lovi prashantha agarwal',
    category: 'Happiness'
})

```
**Step 8 : For fetching all the data from mongodb**

```javascript
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
```
**Step 9 : For fetching one of the data from mongodb collection**
```javascript
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
```

**Step 9 : For posting new object document to mongodb**
```javascript 
app.post('/book', function(req,res){
	var newBook = new Book();
	newBook.title = req.body.title;
	newBook.author = req.body.author;
	newBook.category = req.body.category;

	newBook.save(function(err,book){
		if(err){
			console.log("Something is wrong please check or try again later");
		}else{
			console.log(book);
			res.send({name:"Successfully created",id:book._id});
		}
	});
});
```

**Step 10 : using mongoose create method For posting new object document to mongodb**

```javascript 
app.post('/book2', function(req,res){
	Book.create(req.body, function(err, book){
		if(err){
			res.send('Error saving book');
		}else {
			console.log(book);
				res.send({name:"Successfully created",id:book._id});
			
		}
	});
});
```

**Step 11 : Updating the existing mongoose records **

```javascript 
app.put('/book/:id',function(req,res){
	Book.findOneAndUpdate({
		_id:req.params.id
	},{$set: {title:req.body.title}},
	  {upsert:true},
	   function(err,newBook){
	   	if(err){
	   		console.log('Error occured while updating the data ')
	   	}else{
	   		console.log(newBook);
	   		res.send(newBook);
	   	}
	   })
});

```

**Step 12 : Deleting the existing mongoose records **

```javascript 
app.delete('/book/:id', function(req,res){
	Book.findOneAndRemove({
		_id:req.params.id
	},function(err,book){
		if (err) {
			console.log('Could not delete the Book Please try again');
		}else{
			console.log(book);
			res.send('Successfully deleted');
		}
	});
});

```

## License

```
    Copyright 2016 Ashokslsk.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
```








