# Loopback remote testing helpers

The purpose of this library is to enable easy unit testing, mimicking the angular SDK behavior. also integrating with supertest library

## How to use

### Calling a remote method

```js
var app = require('./server/server');
var h = require('loopback-testing-helpers')(app);

describe('Api testing', function() {
  describe('People', function() {
    it('find()', function(done) {
      h.People.find().expect(200).end(done);
    });
  })
})
```
