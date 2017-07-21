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
  fileReader: fileReader,
  generateStateDataFile: generateStateDataFile,
  writeGeoJSONFile: writeGeoJSONFile
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
      console.log(err)
      return callback(null, result)
    })
}


function fileReader(path, callback) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) return callback(err)

    return callback(err, JSON.parse(data))
  });
}

function writeGeoJSONFile(path, data) {
  var dataStream = JSON.stringify(data)
  fs.writeFile(path, dataStream, function(err) {
    if (err) throw err;
    console.log('It\'s saved!');
    return true
  });
}

function generateStateDataFile(geojsonData, userData, callback) {

  var updatedGeoJSON = {
    "type": "FeatureCollection",
    "features": []
  }
  geojsonData.features.forEach(function(g) {
    userData.forEach(function(u) {
      var geojsonState = g.properties.NAME.toUpperCase()
      var StateDataID = usStates.stateAbbreviations[u["_id"]]
      // console.log(StateDataID)
      // handles corrupted rapid pro data with ID null
      letterCheck = /^[a-zA-Z]+$/.test(StateDataID);
      if (!StateDataID || letterCheck === false){
      }else{
        var userStateData = StateDataID.toUpperCase()

      }

      if (userStateData === geojsonState) {
          g.properties.totalFaxes = u.totalFaxes
          g.properties.totalUsers = u.userCount
          updatedGeoJSON.features.push(g)
        

      }
    });
  });
  callback(null, updatedGeoJSON)
}
