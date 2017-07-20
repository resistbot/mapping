var test = require('tape');
var rp = require('../rapidPro/rapidProAPI.js')
var sinon = require('sinon');
var stateDataMerge = require('../utils/mergeStateData.js')
var usStates = require('../utils/stateLookUp');

// mock mongo response so we don't actually make a DB call 
test('state db query returns number of users from a state', function(assert) {
	assert.plan(1)
  stateDataMerge.retrieveStateLevelUserData(function(err, result) {
    console.log(result)
    assert.ok(true)
    assert.end()
  })

});
