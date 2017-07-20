var request = require('request')
var db = require('../model/db');
var mongoose = require('mongoose');
var usStates = require('../utils/stateLookUp');
var userResult = db.userResult
var d3 = require('d3-queue');


module.exports = {
  retrieveStateLevelUserData: retrieveStateLevelUserData,
  returnStateCount: returnStateCount
}

var stateDataStore = []

function returnStateCount(state, callback) {
  userResult.count({ "state": state }, function(err, count) {
    console.log(state, count); 
    stateDataStore.push({'state':state, 'total_users':count}); 
    return callback(err, count)
  });
}

function retrieveStateLevelUserData(callback) {
  var stateAbbreviations = Object.keys(usStates.stateAbbreviations)
  var q = d3.queue(5)

  for (var i in stateAbbreviations) {
    var state = stateAbbreviations[i];
    q.defer(returnStateCount, state); 
    // console.log(state)
  }

  q.awaitAll(function(err, results) {
    console.log('hi'); 
    if (err) return callback(err);
    return callback(null, stateDataStore);
  });
}

