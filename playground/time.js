var moment = require('moment');
moment.locale('de');

// var date = new Date();
// console.log(date.getMonth()+1);

// var date = moment();
// date.add(5, 'y');
// console.log(date.format('Do MMM, YYYY '));

// 10:35 am

var nDate = moment();
console.log(nDate.format('dd, HH:MM --- DDD'));

var duration = moment.duration(2, 'w');
console.log(duration.asWeeks());
