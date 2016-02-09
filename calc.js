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
    
    var y = year(t[2]) ? parseInt(t[2]) : false;
    var m = month(t[1]) ? parseInt(t[1]) : false;
    var d = day(t[0]) ? parseInt(t[0]) : false;
        
    //using the gdate algorithm: https://alcor.concordia.ca/~gpkatch/gdate-algorithm.html
    function g(y, m, d) {
      m = (m + 9) % 12
      y = y - parseInt(m/10)
      return 365*y + parseInt(y/4) - parseInt(y/100) + parseInt(y/400) + parseInt((m*306 + 5)/10) + ( d - 1 );      
    }
    
    var date = y && m && d ? g(y, m, d) : null;
    
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
    
    var diff = end - start - 1;

    return diff;
  }
};