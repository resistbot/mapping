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
  request.get({
      url: contactsUrl,
      headers: { 'Authorization': config.rapidProAPIKEY }
    },
    function(error, response, body) {
      console.log('response');
      console.log(body)
    });
};

var RPClient = new RapidProAPIClient()
RPClient.pullRPdata()
