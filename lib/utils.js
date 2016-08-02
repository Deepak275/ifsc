const fs = require('fs');

var utils = {

  fileExists: function(filePath) {
    let fileExists = true;
    try {
      var stats = fs.statSync(filePath);
    }
    catch(err) {
      // File does not exist
      fileExists = false;
    }
    return fileExists;
  }

}

module.exports = utils;
