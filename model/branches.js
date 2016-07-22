var Branch = require('./branch')

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
}

module.exports = Branches
