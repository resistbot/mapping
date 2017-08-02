'use strict';
var fs = require('fs');
var path = '.env'
if (fs.existsSync(path)) {
  console.log('Alert! .env file already exists.')
} else {
  fs.createReadStream('.sample-env'); 
    .pipe(fs.createWriteStream('.env'));
}
