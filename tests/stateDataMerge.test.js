var test = require('tape');
var rp = require('../rapidPro/rapidProAPI.js')
var sinon = require('sinon');
var stateDataMerge = require('../utils/mergeStateData.js')
var usStates = require('../utils/stateLookUp');
var db = require('../model/db');
var usStates = require('../utils/stateLookUp');
var userResult = db.userResult


test('state db query returns number of users from a state', function(assert) {
  stateDataMerge.retrieveUserData('$state', function(err, result) {
  	assert.equal(result[0].userCount, 1)

    assert.end()
  })
});

test('state db query returns number of users from a state', function(assert) {
  stateDataMerge.retrieveUserData('$rep', function(err, result) {
  	assert.equal(result[0].totalFaxes, 174)

    assert.end()
  })
});