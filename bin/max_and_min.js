var fs = require('fs');
var path = './data/userStateData.geojson'

var allData = JSON.parse(fs.readFileSync(path, 'utf8'));
var stateData = allData.features

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

function findMaxMin(){
	var userCount = []
	var faxCount = []
	stateData.forEach(function(s){
		userCount.push(Number(s.properties.totalUsers)); 
		faxCount.push(Number(s.properties.totalFaxes)); 

	});
	console.log("Max Users!");
	console.log(getMaxOfArray(userCount));
	console.log("Min Users!");
	console.log(getMinOfArray(userCount));
	console.log("Max Faxes!");
	console.log(getMaxOfArray(faxCount));
	console.log("Min Faxes!");
	console.log(getMinOfArray(faxCount));
}

findMaxMin()
 

