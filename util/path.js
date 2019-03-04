const path = require('path');

//path to the file that is responsible
// for the fact that our app is running
// put to dirname path to that directory
module.exports = path.dirname(process.mainModule.filename);