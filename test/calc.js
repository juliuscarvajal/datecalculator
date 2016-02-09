
/* jshint node: true */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var should = require('chai').should();
var assert = require('chai').assert;
var calc = require('../calc');

describe('date conversion', function() {  
  it('should convert an invalid string date format to null', function() {
    assert.isNull(calc.toDate(''));
    assert.isNull(calc.toDate(null));
    assert.isNull(calc.toDate(undefined));
    assert.isNull(calc.toDate(NaN));
    assert.isNull(calc.toDate(0));
    assert.isNull(calc.toDate(100000));
    assert.isNull(calc.toDate({}));
    assert.isNull(calc.toDate([]));
    assert.isNull(calc.toDate(true));
    assert.isNull(calc.toDate(false));
    assert.isNull(calc.toDate('a'));    
    assert.isNull(calc.toDate('07/11/1972 12:00:01'));
    assert.isNull(calc.toDate('O7/11/1972'));
    assert.isNull(calc.toDate('25/25/1972'));
    assert.isNull(calc.toDate('2090/01/01'));
    assert.isNull(calc.toDate('a/b/c'));    
    assert.isNull(calc.toDate('1/1/1'));
    assert.isNull(calc.toDate('0/0/1901'));
    assert.isNull(calc.toDate(' 0 7 / 0 7 / 1 9 7 7 '));
    assert.isNull(calc.toDate('31/12/1899'));
    assert.isNull(calc.toDate('01/01/3000'));
  });
});

describe('date calculation', function() {  
  it('should return the days between 2 dates. The start and end dates are not counted.', function() {
    
    calc.fullDays('1/1/2000', '3/1/2000').should.equal(1);

    calc.fullDays('01/01/2000', '03/01/2000').should.equal(1);
    
    calc.fullDays('02/06/1983', '22/06/1983').should.equal(19);

    calc.fullDays('04/07/1984', '25/12/1984').should.equal(173);
    
    calc.fullDays('03/01/1989', '03/08/1983').should.equal(1979);
    
    calc.fullDays('01/01/1901', '31/12/2999').should.equal(401400);
  });
  
  it('should return 0 if the difference between the dates is only 1 day', function() {
    calc.fullDays('7/11/1972', '8/11/1972').should.equal(0);

    calc.fullDays('07/11/1972', '08/11/1972').should.equal(0);
    
    calc.fullDays('31/12/2015', '01/01/2016').should.equal(0);    
  });
  
  it('should return -1 if there are any invalid dates.', function() {
    calc.fullDays('25/25/2020', '8/11/2020').should.equal(-1);
  });
});