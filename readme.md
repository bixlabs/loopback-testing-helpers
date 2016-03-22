# Loopback remote testing helpers

[![Code Climate](https://codeclimate.com/github/bixlabs/loopback-testing-helpers/badges/gpa.svg)](https://codeclimate.com/github/bixlabs/loopback-testing-helpers)

The purpose of this library is to enable easy unit testing, mimicking the angular SDK behavior. also integrating with supertest library

## How to use

### Install

```
$ npm install --save-dev loopback-testing-helpers
```

### Write your tests

```js
var app = require('./server/server');
var h = require('loopback-testing-helpers')(app);

describe('Api testing', function() {
  describe('People', function() {
    it('find()', function(done) {
      h.People.find().expect(200).end(done);
    });

    it('findOne()', function(done) {
      h.People.findOne({filter: {where: {eyes: 'brown'}}})
        .expect(200, done);
    });

    describe('Secured methods', function() {
      var user;

      before(function(done) {
        h.User.login({username: 'me', password: 'secret'})
          .expect(200)
          .end(function(err, res) {
            user = res.body;
            done(err);
          });
      });

      it('create()', function(done) {
        var person = {
          eyes: 'brown',
          hair: 'green',
          skin: 'blue'
        };

        h.People.create(person)
          .set('Authorization', user.accessToken)
          .expect(201)
          .end(function(err, res) {
            var person = res.body;
            expect(person).to.have.property('id');
            done(err);
          });
      });
    });    
  })
})
```

## TODO

1. Helpers for handle accessToken
2. Write tests
3. Add promises?
4. no need `res.body`

## Contributions

feel free to fork this repo, any help is love
