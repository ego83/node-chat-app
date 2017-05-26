const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject not-string values', () => {
    var test = 123423324545;
    var res  = isRealString(test);
    expect(res).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    var test = '           ';
    var res  = isRealString(test);
    expect(res).toBe(false);
  });

  it('should allow with non-space characters', () => {
    var test = '   dsf  sdfgfg   ';
    var res  = isRealString(test);
    expect(res).toBe(true);
  });
});
