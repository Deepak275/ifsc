const Parser = require('./parser');
const Scrapper = require('./scrapper');
const Branches = require('../model/branches');
const fs = require('fs');

class Store {

  constructor(options) {
    this.diskPath = options.diskPath;

    this.p = new Parser();
    this.s = new Scrapper({ scanURL: "https://www.rbi.org.in/scripts/neft.aspx" });
    this.branches = new Branches();
  }

  getStore() {
    return this.branches;
  }

  readLocalStore(cb) {
    this.storeExists((err, stats, exists) => {
      if (!exists) {
        // The file does not exist, start downloading
        return this.downloadDump((err) => {
          if (err) return cb(err, this.branches);
          // Successfully downloaded, parse the file
          this.parseStores(this.diskPath);
          return cb(null, this.branches);
        });
      }

      this.parseStores(this.diskPath);

      if (this.staleDump(stats, 15) == true) {
        this.downloadDump((err) => {
          if (err) return cb(err, this.branches);
          return cb(null, this.branches);
        });
      }
      return cb(null, this.branches);
    });
  }

  storeExists(cb) {
    // Check if file exists
    fs.stat(this.diskPath, (err, stats) => {
      if (err) return cb(err, stats, false);
      return cb(null, stats, true);
    });
  }

  // This is Synchronous
  parseStores() {
    console.log("Parsing DataStore - " + this.diskPath);
    console.time("parse_xls");
    this.branches = this.p.parse(this.diskPath);
    console.timeEnd("parse_xls");
    console.log("DataStore has been parsed and is now in memory - " + this.diskPath);
  }

  // Return if Dump is over 15 days old
  staleDump(stats, timeInDays) {
    // Check if it has been over 15 days since the file was downloaded
    let currentTime = new Date().getTime();
    let modifiedTime = stats.mtime.getTime();
    let days = Math.abs(currentTime - modifiedTime) / (1000 * 60 * 60 * 24);
    console.log("It has been " + days + " days");

    if (days > timeInDays) {
      // Start downloading the file again
      console.log("This looks stale, it has been more than " + timeInDays + " days");
      return true;
    } else {
      console.log("This looks fresh, there's still time in " + timeInDays + " days");
    }

    return false;
  }

  downloadDump(cb) {
    this.s.find((err, link) => {
      if (err) {
        return cb(err);
      }
      if (link == "") {
        return cb("Did not find a link to download at https://www.rbi.org.in/scripts/neft.aspx");
      }

      console.log("Trying to download link " + link);
      this.s.download(link, this.diskPath, (err) => {
        if (err) return cb(err);
        console.log('Download completed');
        return cb(null);
      });
    });
  }
}

module.exports = Store;
