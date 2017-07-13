require('dotenv').config()

var request = require('request')
var db = require('../model/db');
var userResult = db.userResult
var contactsUrl = 'https://rapidbot.io/api/v2/contacts.json'

console.log('null user')



var http = require("http");
var url = require("url");

var config = {
  "rapidProAPIKEY": process.env.rapidProAPIKEY
}

// Shape - superclass
function RapidProAPIClient() {
  this.url = contactsUrl;
  this.token = config.rapidProAPIKEY;
  this.page = 0
  this.nextPage = true
}

RapidProAPIClient.prototype.pullRPdata = function(callback) {
  request.get({
      url: contactsUrl,
      headers: { 'Authorization': config.rapidProAPIKEY }
    },
    function(error, response, body) {
      if (error) return callback(error);


      // fluffy.save(function (err, fluffy) {
      //   if (err) return console.error(err);
      //   fluffy.speak();
      // });

      console.log('response');
      console.log(body)
    });
};

function seedDB(callback) {
  // look up actual syntax 
  userResult.find({}, function(err, results) {
    if (err) return callback(err)

    // if there's no data, run this script! 
    if (!results) {
      var RPClient = new RapidProAPIClient()
      RPClient.pullRPdata(function(err, results){
          if (err) return callback(err); 
          console.log('DB seeded!')
      })
    }

  });

}


module.exports = {
  RapidProAPIClient: RapidProAPIClient,
  seedDB: seedDB,
}
