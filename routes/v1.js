var express = require('express');
var router = express.Router();
var Store = require('../lib/store')

var store = new Store({ diskPath: "ifsc.xls" })
var branches
store.readLocalStore(function(err) {
  if (err) console.log(err);
  else {
    branches = store.getStore()
  }
})

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
