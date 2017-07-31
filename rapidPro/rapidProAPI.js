require('dotenv').config()

var request = require('request')
var db = require('../model/db');
var mongoose = require('mongoose');



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
  var self = this; 

  if(self.nextPage){
    request.get({
      url: contactsUrl,
      headers: { 'Authorization': config.rapidProAPIKEY }
    },

    function(error, response, body) {
      if (error) return callback(error);

      var responseData = JSON.parse(body);
      var nextURL = responseData['next']
      var results = responseData['results']

      console.log('Loading Page ' + JSON.stringify(self.page)); 

      var results = responseData.results;
      for (var i = 0; i < results.length; i++) {
        var result = results[i]
        var faxes = result.fields.total_faxes_sent
        var emails = result.fields.total_emails_sent

        var user = {
          'uuid': result.uuid,
          'address': result.fields.postal_address,
          'state': result.fields.state,
          'zip': result.fields.zip,
          'rep': result.fields.representative,
          'sen_jr': result.fields.senator_junior,
          'sen_sr': result.fields.senator_senior,
          'total_faxes':faxes, 
          'total_emails':emails
        };

        var userData = new userResult(user);
        userData.save()
          .then(item => {
            // console.log("item saved to database");
          })
          .catch(err => {
            console.log('Error! User could not be saved.');
          });
      }

      if (nextURL){
        self.page += 1; 
        self.url = nextURL;  
        self.pullRPdata(); 
      } else{
        self.nextPage = false; 
        return callback(null,"All items saved!");
      }


    });
  }
};

function seedDB() {
  userResult.find({}, function(err, results) {
    if (err) return callback(err)

    // if there's data, run this script! 
    if (results.length === null) {
      mongoose.connection.db.dropCollection('userresults', function(err, result) {
        if (err) return callback(err);
        console.log(result); 
      });
    }
    var RPClient = new RapidProAPIClient()
    RPClient.pullRPdata(function(err, results) {
      if (err) return callback(err);
      console.log("DB seeded! " + results);
    })
  });

}


module.exports = {
  RapidProAPIClient: RapidProAPIClient,
  seedDB: seedDB
}
