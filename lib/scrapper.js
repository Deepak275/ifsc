const request = require('request');
const fs = require('fs');
const $ = require('cheerio');

class Scrapper {

  constructor(options) {
    this.scanURL = options.scanURL;
  }

  fetch(cb) {
    request(this.scanURL, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        cb(null, body);
      } else {
        cb(error);
      }
    });
  }

  find(cb) {
    this.fetch(function(err, body) {
      if (err) {
        return cb(err);
      }

      let scrapedLink = "";
      $(".Link2", body).each(function(i, elem) {
        var href = $(this).attr('href');
        var text = $(this).text();

        if (text.includes("Consolidated")) {
          scrapedLink = href.replace("http://", "https://");
        }
      });

      cb(null, scrapedLink);
    });
  }

  download(url, path, cb) {
    request
      .get(url)
      .pipe(fs.createWriteStream(path))
      .on('finish', function() {
        return cb(null)
      });
  }
}

module.exports = Scrapper;
