var fs = require('fs');

var reps_by_state = require('../data/all_reps_by_state');
var members_full = require('../data/members');
var members = members_full.results[0].members;

getDistricts();

function getDistricts() {
  // 1. Grab district from members.json
  // 2. Add district to all_reps_by_state.json
  // 3. Iterate through CD.geojson and add each repy_by_state object to proper state/district

  // Iterate through each state object
  for (var state in reps_by_state) {

    var current_state = reps_by_state[state];

    // Iterate through each rep within the state, and add district to each rep
    for (var i = 0; i < current_state.length; i++) {
      
      // Grab rep's unique id
      var id = current_state[i].id;

      // Search for rep ID in all members data
  	  var repId = members.filter(function(x){
        return x.id == id;
      });

      // Grab district from members data and add to rep_data
      if (repId[0]) current_state[i].district = repId[0].district;

      if (i == current_state.length - 1) {
        // Put final current_state object back into master rep object
        reps_by_state[state] = current_state;
      }
    }
  }
  
  var final = JSON.stringify(reps_by_state);
  // All set, write final rep data with district to a file
  fs.writeFile('./reps_with_district', final, 'utf8', function(err) {
    if (err) throw err;
    console.log('All set');
  });

}
