require('dotenv').config()

var request = require('request')

// var userResult = require('./model/userResult');
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

RapidProAPIClient.prototype.pullRPdata = function() {
  while (this.nextPage) {
    request.get({
        url: contactsUrl,
        headers: { 'Authorization': config.rapidProAPIKEY }
      },
      function(error, response, body) {
        console.log('response');

        if (response.ok) {
          console.log('Loading Page ' + str(this.page))

          var nextUrl = response['next']
          var results = r['results']
          $.each(results, function(index, value) {
            var user = value;
            // save user data
          });
        }
        if (nextUrl) {
          this.page += 1
          this.url = next_url
        } else {
          self.next_page = False
        }
      });
  }
};

var RPClient = new RapidProAPIClient()
RPClient.pullRPdata()
