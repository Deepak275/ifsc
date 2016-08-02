const _ = require('underscore');

class InMemory {
  constructor(branches) {
    this.branches = branches;
  }

  search(query) {
    // turn the query term to all caps
    query = query.toUpperCase();
    // Split query into multiple words, and we will do an AND
    let items = query.split(" ");
    let b =  _.filter(this.branches, function(branch) {
      let found = true;
      for (let x of items) {
        if (branch.searchString.includes(x) == false) {
          found = false;
          break;
        }

      }
      return found;
    });

    return b;
  }
}


module.exports = InMemory;
