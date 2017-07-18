// var request = require('request');

// var GOOGLE_CIVIC_API_KEY = process.env.GoogleAPI;
// var url = 'https://www.googleapis.com/civicinfo/v2/representatives';
// var query_params = {
//     'key': GOOGLE_CIVIC_API_KEY,
//     'address': ''
// }

var members_full = require('../members');
var members = members_full.results[0].members;

getDistricts();

function getDistricts() {
  var test_data = {
    "AL": [
        {
            "id": "A000055",
            "full_name": "Robert B. Aderholt",
            "first_name": "Robert",
            "last_name": "Aderholt",
            "fax": "202-225-5587",
            "phone": "202-225-4876",
            "address": "235 Cannon HOB; Washington DC 20515-0104",
            "state": "AL",
            "type": "rep",
            "start": "2017-01-03",
            "end": "2019-01-03",
            "party": "Republican",
            "contact_form": false,
            "state_rank": false
        },
        {
            "id": "B001274",
            "full_name": "Mo Brooks",
            "first_name": "Mo",
            "last_name": "Brooks",
            "fax": "202-225-4392",
            "phone": "202-225-4801",
            "address": "2400 Rayburn HOB; Washington DC 20515-0105",
            "state": "AL",
            "type": "rep",
            "start": "2017-01-03",
            "end": "2019-01-03",
            "party": "Republican",
            "contact_form": false,
            "state_rank": false
        }
    ],
    "IL": [
        {
            "id": "A000024",
            "full_name": "Carol Hansen",
            "first_name": "Carol",
            "last_name": "Hansen",
            "fax": "202-225-5587",
            "phone": "202-225-4876",
            "address": "235 Cannon HOB; Washington DC 20515-0104",
            "state": "AL",
            "type": "rep",
            "start": "2017-01-03",
            "end": "2019-01-03",
            "party": "Independent",
            "contact_form": false,
            "state_rank": false
        }]};


  // 1. Grab district from members.json
  // 2. Add district to all_reps_by_state.json
  // 3. Iterate through CD.geojson and add each repy_by_state object to proper state/district


  


  for (var state in test_data) {

    var current_state = test_data[state];

    for (var i = 0; i < current_state.length; i++) {
      var id = current_state[i].id;

  	  var repId = members.filter(function(x){
        return x.id == id;
      });

      if (repId[0]) current_state[i].district = repId[0].district;
      if (i == current_state.length - 1) console.log(test_data);
    }

    console.log(test_data);
    //repId[0].district

  // 	console.log(test_data[state]);
  // 	test_data[state].forEach(function(rep) {
  //     console.log(state + " --> " + rep.id);

  //     // query_params.ocdId = rep.id;
  //     query_params.address = rep.address;

  //     // request.get({
  //     //     url: url,
  //     //     qs: query_params
  //     //   },
  //     //   function(error, response, body) {
  //     //     console.log('response');
  //     //     console.log(body);
  //     //   });
  // 	});
  }
}
