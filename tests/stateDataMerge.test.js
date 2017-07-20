var test = require('tape');
var rp = require('../rapidPro/rapidProAPI.js')
var sinon = require('sinon');
var stateDataMerge = require('../utils/mergeStateData.js')
var usStates = require('../utils/stateLookUp');
var db = require('../model/db');
var usStates = require('../utils/stateLookUp');
var userResult = db.userResult



test('state db query returns number of users from a state', function(assert) {
  var response = [{ _id: 'WY', totalFaxes: 78, userCount: 1 },
    { _id: 'AL', totalFaxes: 76, userCount: 3 },
    { _id: 'OK', totalFaxes: 279, userCount: 2 },
    { _id: 'LA', totalFaxes: 349, userCount: 5 }
  ]

  sinon.stub(userResult, 'aggregate').callsFake(function(queryFilter, callback) {

    return callback(null, response)
  });

  stateDataMerge.retrieveUserData('$state', function(err, result) {
    assert.equal(result[0].userCount, 1)
    userResult.aggregate.restore()
    assert.end()
  })
});

test('rep db query returns number of users from a congressional district', function(assert) {
  var response = [{
    _id: 'Lloyd Smucker',
    totalFaxes: 154,
    totalEmails: 0,
    userCount: 4
  }, {
    _id: 'Jack Bergman',
    totalFaxes: 57,
    totalEmails: 0,
    userCount: 1
  }, {
    _id: 'Rob Woodall',
    totalFaxes: 59,
    totalEmails: 0,
    userCount: 2
  }]

  sinon.stub(userResult, 'aggregate').callsFake(function(queryFilter, callback) {
    return callback(null, response)
  });

  stateDataMerge.retrieveUserData('$rep', function(err, result) {
    assert.equal(result[0].userCount, 4)
    userResult.aggregate.restore()
    assert.end()
  })
});

test('filereader reads file and returns file data', function(assert) {
  var path = './data/states.geojson'

  stateDataMerge.fileReader(path, function(err, result) {

    assert.equal(result.features[0].properties.NAME, 'Maine')
    assert.end()
  })
});

test('userData appends to geojson property field', function(assert) {
  var geoJsonData = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "GEO_ID": "0400000US23",
        "STATE": "23",
        "NAME": "Maine",
        "LSAD": "",
        "CENSUSAREA": 30842.923
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": []
      }
    }]
  }

  var userData = [{ _id: 'ME', totalFaxes: 78, userCount: 1 },
    { _id: 'AL', totalFaxes: 76, userCount: 3 },
    { _id: 'OK', totalFaxes: 279, userCount: 2 },
    { _id: 'LA', totalFaxes: 349, userCount: 5 }
  ]

  stateDataMerge.generateStateDataFile(geoJsonData, userData, function(err, result) {
  	
  	assert.equal(result.features[0].properties.totalUsers,1)
    assert.end()
  })
});

test('filewriter creates new geosjon file', function(assert) {
  var path = './tests/data/testStateUserData.geojson'
   var geoJsonData = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "GEO_ID": "0400000US23",
        "STATE": "23",
        "NAME": "Maine",
        "LSAD": "",
        "CENSUSAREA": 30842.923,
        "totalUsers":10, 
        "totalFaxes":100
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": []
      }
    }]
  }

  stateDataMerge.writeGeoJSONFile(path, geoJsonData, function(err, result) {
    console.log(result)
    assert.equal(result, true)
    assert.end()
  })
});
