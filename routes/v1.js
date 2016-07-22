var express = require('express');
var router = express.Router();
var Parser = require('../lib/parser')
var Scrapper = require('../lib/scrapper')
var fs = require('fs')

var p, branches
load()

function load() {

  p = new Parser()

  console.log("Run fs.stat on ifsc.xls");
  fs.stat("ifsc.xls", function(err, stats) {
    if (err) {
      if (err.code == "ENOENT") {
        console.log("File does not exist, start update()");
        // The file does not exist, start downloading
        update()
      } else {
        console.log(err);
      }
      return
    }

    // If we are here, file exists
    console.log("Parsing xls, should take about 20 seconds to start up");

    console.time("parse_xls")
    branches = p.parse("ifsc.xls")
    console.timeEnd("parse_xls")

    console.log("We are ready to go");

    // Check if it has been over 15 days since the file was downloaded
    let currentTime = new Date().getTime()
    let modifiedTime = stats.mtime.getTime()
    let days = Math.abs(currentTime - modifiedTime) / (1000 * 60 * 60 * 24)
    console.log(days);

    if (days > 15) {
      // Start downloading the file again
      console.log("It's been more than 15 days, downloading again");
      update()
    }
  })
}

function update() {
  console.log("Initialize Scrapper");
  let s = new Scrapper({ scanURL: "https://www.rbi.org.in/scripts/neft.aspx" })
  console.log("Trying to find links");
  s.find((err, link) => {
    if (err) return console.log(err);
    if (link == "") return console.log("Did not find a link to download at https://www.rbi.org.in/scripts/neft.aspx");
    console.log("Trying to download link");
    s.download(link, (err) => {
      if (err) return console.log(err)
      console.log('Download completed');
    })
  })
}

router.get('/search', function(req, res, next) {
  res.status(404)
  res.json({err:"Please enter a search term"})
})

/* GET search */
router.get('/search/:term', function(req, res, next) {
  let term = unescape(req.params.term)
  term = term.replace('+', ' ')
  found = branches.find(term)
  res.json(found)
});

module.exports = router;
