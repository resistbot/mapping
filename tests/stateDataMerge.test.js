var test = require('tape');
var rp = require('../rapidPro/rapidProAPI.js')
var sinon = require('sinon');
var stateDataMerge = require('../utils/mergeStateData.js')
var usStates = require('../utils/stateLookUp');
var db = require('../model/db');
var usStates = require('../utils/stateLookUp');
var userResult = db.userResult



test('state db query returns number of users from a state', function(assert) {
  var response = [{ _id: 'WY', totalMessages: 78, count: 1 },
    { _id: 'AL', totalMessages: 76, count: 3 },
    { _id: 'OK', totalMessages: 279, count: 2 },
    { _id: 'LA', totalMessages: 349, count: 5 }
  ]

  sinon.stub(userResult, 'aggregate').callsFake(function(queryFilter, callback) {

    return callback(null, response)
  });

  stateDataMerge.retrieveUserData('$state', function(err, result) {
    console.log(err)
    assert.equal(result[0].userCount, 1)

    assert.end()
  })
});

test('rep db query returns number of users from a congressional district', function(assert) {

  stateDataMerge.retrieveUserData('$rep', function(err, result) {
    assert.equal(result[0].totalFaxes, 174)

    assert.end()
  })
});
