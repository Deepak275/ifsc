var expect = require("chai").expect;
var Store = require("../lib/store")
var fs = require('fs')
var utils = require('../lib/utils')

describe("Store", function() {

  it("storeExists() and staleDump()", function(done) {
    let s = new Store({ diskPath: "test/ifsc_notexist.xls" })
    s.storeExists((err, stats, exists) => {
      expect(err.code).to.be.equal("ENOENT")
      expect(stats).to.be.an('undefined')
      expect(exists).to.be.false
    })

    s = new Store({ diskPath: "test/ifsc.xls" })
    s.storeExists((err, stats, exists) => {
      expect(err).to.be.null
      expect(stats).to.not.be.null
      expect(exists).to.be.true

      // Find our how old is the file
      let currentTime = new Date().getTime()
      let modifiedTime = stats.mtime.getTime()
      let days = Math.abs(currentTime - modifiedTime) / (1000 * 60 * 60 * 24)

      staleFalse = s.staleDump(stats, Math.ceil(days + 2))
      expect(staleFalse).to.be.false

      staleFalse = s.staleDump(stats, (Math.floor(days - 2) > 0 ? Math.floor(days - 2) : 0) )
      expect(staleFalse).to.be.true

      done()
    })
  })

  it("parseStores() and getStore()", function() {
    let s = new Store({ diskPath: "test/ifsc.xls" })
    s.parseStores()
    store = s.getStore()
    expect(store.branches.length).to.be.equal(4)
  })

  it("readLocalStore()", function(done) {
    let filePath = "test/ifsc.xls"
    let s = new Store({ diskPath: filePath })
    s.readLocalStore((err, branches) => {
      expect(err).to.be.null
      expect(branches.branches.length).to.be.equal(4)
      done()
    })
  })

  it("readLocalStore2() with no file", function(done) {
    this.timeout(0)
    filePath = "test/ifsc_32mb.xls"

    // Delete old file if it exists
    if (utils.fileExists(filePath)) {
      fs.unlinkSync(filePath)
    }

    s = new Store({ diskPath: filePath })
    s.readLocalStore((err, branches) => {
      expect(err).to.be.null
      expect(branches.branches.length).to.be.equal(132044)
      done()
    })
  })

})
