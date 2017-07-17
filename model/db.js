var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/resistmap');
mongoose.connect('mongodb://mongo/resistmap');


var userResultSchema = new mongoose.Schema({
  result: Object
});

mongoose.model('userResult', userResultSchema);