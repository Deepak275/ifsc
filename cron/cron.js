var CronJob = require('cron').CronJob;

var job = new CronJob({
  // cronTime: '00 30 11 * * *',
  cronTime: '* * * * * *',
  onTick: function() {
    /*
     * Runs everydaay at 11:30:00 AM.
     */
    console.log('Running now')
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

job.start();
