# Loopback remote testing helpers

## How to use
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
