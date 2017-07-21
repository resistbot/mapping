var mergeStates = require('../utils/mergeStatedata.js')

var sourceStateDataPath = './data/states.geojson'; 
var writeDataPath = './data/userStateData.geojson';

mergeStates.retrieveUserData('$state', function(err, userData){
	var userData = userData; 

	mergeStates.fileReader(sourceStateDataPath, function(err, stateGeoData){

		mergeStates.generateStateDataFile(stateGeoData, userData, function(err,result){

			mergeStates.writeGeoJSONFile(writeDataPath, result); 
		}); 
	}); 
})
