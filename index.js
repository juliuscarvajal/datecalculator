/* jshint node: true */

var calc = require('./calc');
var path = require('path');
var args = process.argv.slice(2);
var startDate = args[0];
var endDate = args[1];

function help() {
  var msg = [
    'Days calculator:',
    'Returns the number of days elapsed between 2 dates.',
    'The start and the end dates are not counted.',
    '',
    'Usage: ' + path.basename(process.argv[0]) + ' ' + path.basename(process.argv[1]) + ' dd/mm/yyyy dd/mm/yyyy',
    '',
    'Where:',
    'yyyy is within 1901 to 2999',
    ''
  ];
  
  msg.forEach(function(m) {
    console.log(m);
  });
}

function show() {
  var days = calc.fullDays(startDate, endDate);
  if (days == -1) {
    help();
  }
  else {
    console.log(days);
  }  
}

if (args.length != 2) {
  help();
}
else {
  show();
}
