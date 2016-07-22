var Branch = require('./branch')
var _ = require("underscore")

class Branches {

  constructor(options) {
    this.branches = []
  }

  add(branch) {
    // Only add if the bank has a name
    if (branch.bank) {
      this.branches.push(branch)
    }
  }

  find(query) {
    // If empty return
    if (query == "") {
      return []
    }
    
    // turn the query term to all caps
    query = query.toUpperCase()
    // Split query into multiple words, and we will do an AND
    let items = query.split(" ")

    return _.filter(this.branches, function(branch) {
      let found = true
      for (let x in items) {
        if (branch.searchString.includes(items[x]) == false) {
          found = false
          break
        }
      }
      return found
    })
  }
}

module.exports = Branches
