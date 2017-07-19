var request = require('request')
var db = require('../model/db');
var mongoose = require('mongoose');
var usStates = require('../utils/stateLookUp');
var userResult = db.userResult

module.exports = {
  retrieveStateLevelUserData: retrieveStateLevelUserData
}

function retrieveStateLevelUserData() {
  var stateDataStore = {}
  var stateAbbreviations = Object.keys(usStates.stateAbbreviations)

  for (var i in stateAbbreviations) {
      var state = stateAbbreviations[i]
      userResult.count({ "state": state }, function(err, count) {
        console.log(state, count)
        stateDataStore[state] = count
      })
  }
  console.log(state)

  console.log(stateDataStore)

}
console.log(stateDataStore)
return stateDataStore
}






// var users = mongoose.connection


// function readStateFile(){
// 	// read file 
// 	// get state long name 

// }

// function getStateLongName(){
// 	for (var key in myDictionary) {
//     var value = myDictionary[key];
//     // Use `key` and `value`
// }

// }
