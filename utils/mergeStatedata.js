var request = require('request')
var db = require('../model/db');
var mongoose = require('mongoose');
var usStates = require('../utils/stateLookUp');
var userResult = db.userResult
var d3 = require('d3-queue');
var usStates = require('../utils/stateLookUp');
fs = require('fs');


module.exports = {
  retrieveUserData: retrieveUserData,
  fileReader: fileReader
}

function retrieveUserData(queryFilter, callback) {
  userResult.aggregate(
    [{
      $group: {
        // region is $state or $rep to query data
        _id: queryFilter,
        totalFaxes: { $sum: "$total_faxes" },
        totalEmails: { $sum: "$total_emails" },
        userCount: { $sum: 1 }

      },
    }],
    function(err, result) {
      if (err) return callback(err);
      // console.log(err)
      return callback(null, result)
    })
}


function fileReader(path, callback){
  fs.readFile(path, 'utf8', function (err,data) {
  if (err) return callback(err)
  return callback(null, JSON.parse(data))
});
}


// function generateStateDataFile(data, callback){
//     for 

// }
