require('dotenv').config()

var request = require('request')
var db = require('../model/db');


var userResult = db.userResult
var contactsUrl = 'https://rapidbot.io/api/v2/contacts.json'


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
  var self = this
  request.get({
      url: contactsUrl,
      headers: { 'Authorization': config.rapidProAPIKEY }
    },
    function(error, response, body) {
      if (error) return callback(error);

      console.log('Loading Page ' + toString(self.page))

      var responseData = JSON.parse(body);
      // console.log(JSON.stringify(responseData, null, 2)); 
      // console.log(body); 
      var results = responseData.results;
      for (var i = 0; i < results.length; i++) {
        var result = results[i]

        var user = {
          'uuid': result.uuid,
          'address': result.fields.address,
          'state': result.fields.state,
          'zip': result.fields.zip,
          'rep': result.fields.representative,
          'sen_jr': result.fields.senator_junior,
          'sen_sr': result.fields.senator_senior
        };

        var userData = new userResult(user);
        console.log(userData)
        userData.save()
          .then(item => {
            console.log("item saved to database");
          })
          .catch(err => {
            console.log('Error! User could not be saved.');
          });
      }

    });
  return function() {
    console.log('done!')
  }
};

function seedDB(callback) {
  // look up actual syntax 
  userResult.find({}, function(err, results) {
    if (err) return callback(err)

    // if there's no data, run this script! 
    if (!results) {
      db.getCollection('userresults').remove({})
    }
    
    var RPClient = new RapidProAPIClient()
    RPClient.pullRPdata(function(err, results) {
      if (err) return callback(err);
      console.log('DB seeded!')
    })

  });

}


module.exports = {
  RapidProAPIClient: RapidProAPIClient,
  seedDB: seedDB
}
