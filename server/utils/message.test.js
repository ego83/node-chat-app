const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = "me";
    var text = "to somebody";
    var res  = generateMessage(from, text);

    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = "test";
    var lat = 5;
    var lon = 4;
    var url = `https://www.google.com/maps?q=${lat},${lon}`;

    var res  = generateLocationMessage(from, lat, lon);

    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, url});
  });
});
