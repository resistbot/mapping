var test = require('tape');
var rp = require('../rapidPro/rapidProAPI.js')
var sinon = require('sinon');
var stateDataMerge = require('../utils/mergeStateData.js')
var usStates = require('../utils/stateLookUp');


test('state db query returns number of users from a state', function(assert) {
  var totalUsersByState = stateDataMerge.retrieveStateLevelUserData()

  stateDataMerge.retrieveStateLevelUserData(function(err, result) {
    console.log(results)
    assert.end();
  })

});
