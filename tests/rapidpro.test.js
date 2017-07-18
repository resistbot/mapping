var test = require('tape');
var rp = require('../rapidPro/rapidProAPI.js')
var sinon = require('sinon');
var request = require('request')


test('rapid pro data pull returns 500 error', function(assert) {
  rpClient = new rp.RapidProAPIClient()

  sinon.stub(request, 'get', function(options, callback) {
    var err = new Error()
    err.status = '500'
    callback(err, null)
  });

  rpClient.pullRPdata(function(err, result) {
    assert.equal(err.status, '500');
    assert.end();
  })

});


