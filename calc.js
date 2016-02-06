/* jshint node: true */

// Sets the range and returns a function that compares the pre-set range with the input number. If it is in range, returns the number, otherwise, -1.
function inRange(x, y) {
  return function(num) {
    return (parseInt(num) >= x && parseInt(num) <= y);
  };
}

var year = inRange(1901, 2999);
var month = inRange(1, 12);
var day = inRange(1, 31);

module.exports = {
  // This will convert an input string of DD/MM/YYYY to the default JS Date compliant format MM/DD/YYYY
  toDate: function(str) {
    if (typeof (str) !== 'string' || !str)
      return null;
    
    var t = str.trim();
    t = t.split(/[\s\D]+/); //space or non-digit delimeters

    if (t.length != 3) {
      return null; 
    }
    
    var y = year(t[2]) ? t[2] : false;
    var m = month(t[1]) ? t[1] : false;
    var d = day(t[0]) ? t[0] : false;
    
    // if any of the y, m, d are false return null
    var date = y && m && d ? new Date(y, parseInt(m) - 1, d) : null;
        
    return date;
  },
  
  // Input: 2 dates of format DD/MM/YYYY. -1 for errors
  fullDays: function(startDate, endDate) {
    
    var start = this.toDate(startDate);
    var end = this.toDate(endDate);
    if (start === null || end === null) {
      return -1;
    }
    
    // swap start and end if end is bigger than the start
    if (start > end) {
      var t = end;
      end = start;
      start = t;
    }
    
    var diff = Math.round((end - start) / (1000 * 60 * 60 * 24)) - 1;
    
    return diff;
  }
};