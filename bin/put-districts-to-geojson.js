var fs = require('fs');
var path = require('path');
var stateCodes = require('../utils/stateCodes.js').stateCodes;
var originalCDsource = path.dirname(__dirname) + '/data/CD_2016.geojson';
var reps = require('../data/reps_with_district.json');


fs.readFile(originalCDsource, 'utf8', function(err, data) {
  if (err) throw err;
  putDistricts(JSON.parse(data));
});


function putDistricts(data) {
  var features = data.features;

  // Iterate through each district geojson feature
  for (var i = 0; i < features.length; i++) {
  	
  	// Get current state code and match to alpha state abbrev
  	var code = features[i].properties.STATEFP;
    var state = stateCodes[code];
    if (state === undefined) {
    	console.log(code); // some possible outliers
    	continue; // skip for now
    }
    // Grab all reps by state
    var stateReps = reps[state];
  	var district = features[i].properties.CD115FP;

    // Iterate through reps data for current state and match with current district, then input to geojson feature
    var rep = stateReps.filter(function(r) {
      return r.district = district;
    });
    
    // Add relevant rep to district geo-feature
    if (rep[0]) features[i].properties.representative = rep[0];

    if (i == features.length - 1) {
      // When all features have been iterated through, time to write the final geojson file
      data.features = features;
      var final = JSON.stringify(data);

      fs.writeFile('./CD_2016_with_reps', final, 'utf8', function(err) {
        if (err) throw err;
        console.log('All set');
      });
    }
  }
}
