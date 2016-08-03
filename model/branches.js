const Branch = require('./branch');
const _ = require("underscore");
const InMemory  = require('../lib/fullTextSearch/inMemory');
const FullTextSearchLight = require('../lib/fullTextSearch/fullTextSearchLight');

class Branches {

  constructor(options) {
    this.branches = [];
  }

  add(branch) {
    // Only add if the bank has a name
    if (branch.bank) {
      this.branches.push(branch);
    }
  }

  find(query, method) {
    // If empty return
    if (query == "") {
      return [];
    }

    // TODO : Add proper error handling
    // Remove white spaces
    // method = method.replace(/\s+/g, '');

    // Based on the method defined, call the appropriate full text library
    switch (method) {
      case undefined:
      case '':
      case 'inmemory':
        const inMemory = new InMemory(this.branches);
        return inMemory.search(query);

      case 'ftslight':
        const ftslight = new FullTextSearchLight(this.branches);
        return ftslight.find(query);
      default:
        // TODO : return error that we could not understand
    }
  }
}

module.exports = Branches;
