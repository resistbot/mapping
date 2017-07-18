var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/resistmap');

var userResultSchema = new mongoose.Schema({
	uuid: String, 
	address: String,
	state: String, 
	zip: Number, 
	rep: String, 
	sen_jr: String, 
	sen_sr: String, 
	total_faxes: Number,
	total_emails:Number
});

var userResult = mongoose.model('userResult', userResultSchema);
module.exports = {userResult};


