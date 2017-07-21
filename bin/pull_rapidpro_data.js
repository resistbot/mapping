var rp = require('../rapidPro/rapidProAPI.js')

rp.seedDB(function(err, result){
	if (err) return callback(err); 
	console.log('DB Seeded!')
})