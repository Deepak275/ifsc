var express = require('express');
var router = express.Router();
var Parser = require('../lib/parser')

let p = new Parser()
console.log("Parsing xls, should take about 20 seconds to start up");
console.time("parse_xls")
branches = p.parse("68774.xls")
// branches = p.parse("test/ifsc.xls")
console.timeEnd("parse_xls")
console.log("We are ready to go");

/* GET home page. */
router.get('/search/:term', function(req, res, next) {
  let term = unescape(req.params.term)
  term = term.replace('+', ' ')
  found = branches.find(term)
  res.json(found)
});

module.exports = router;
