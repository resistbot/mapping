var express = require('express');
var router = express.Router();

var accessToken = process.env.accessToken
console.log(process.env.accessToken)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mapping the Resistance', 
  						accessToken: accessToken});
});

module.exports = router;
