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
      // console.log(err)
      return callback(null, result)
    })
}


function fileReader(path, callback) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) return callback(err)

    return callback(null, JSON.parse(data))
  });
}

function writeGeoJSONFile(path, data) {
  var dataStream = JSON.stringify(data)
  fs.writeFile(path, dataStream, function(err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
  return true
}

function generateStateDataFile(geojsonData, userData, callback) {

  var updatedGeoJSON = {
    "type": "FeatureCollection",
    "features": []
  }

  for (i in geojsonData.features) {
    for (u in userData) {
      var geojsonState = geojsonData.features[i].properties.NAME.toUpperCase()
      var userStateData = usStates.stateAbbreviations[userData[u]['_id']].toUpperCase()

      if (userStateData === geojsonState) {
        var rbfaxes = userData[u]['totalFaxes']
        var rbusers = userData[u]['userCount']
        geojsonData.features[i].properties.totalFaxes = rbfaxes
        geojsonData.features[i].properties.totalUsers = rbusers

        updatedGeoJSON.features.push(geojsonData.features[i])
      }
    }
  }
  callback(null, updatedGeoJSON)
}
