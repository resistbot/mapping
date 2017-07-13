var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/resistmap');

var userResultSchema = new mongoose.Schema({
  result: {}
});

var userResult = mongoose.model('userResult', userResultSchema);
module.exports = {userResult};


