var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	title: String,
	author: String,
	category: String
});

module.export = mongoose.model('Book', BookSchema);