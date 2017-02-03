'use strict';

var _ = require('lodash');
var request = require('supertest');

module.exports = function (app) {
  var models = app.models;
  var _modelHelpers = {};

  var walkModelMethod = _.curry(function (modelName, model, method) {
    var pluckRight = _.curryRight(_.pluck);
    var httpPath = _.flow(pluckRight('http'), pluckRight('path'));
    var url = httpPath([model.sharedClass, method])
      .join('');
    var verb = method.http.verb || 'get';

    var helper = _modelHelpers[modelName] = _modelHelpers[modelName] || {};

    helper[method.name] = function (args) {
      args = args || {};
      var newUrl = url;

      var replaceKeys = function(key) {
        var keyValue = args[key];
        newUrl = newUrl.replace(':' + key, keyValue);
      };

      _.keysIn(args).forEach(replaceKeys);

      var verbSendMethod = 'send';
      switch (verb) {
        case 'get':
        case 'head':
          verbSendMethod = 'query';
          break;
        default:
          break;
      }

      newUrl = newUrl.match(new RegExp('^' + app.get('restApiRoot'))) ? newUrl : app.get('restApiRoot') + newUrl;

      return request(app)[verb](newUrl)[verbSendMethod](args);
    };
  });

  var walkModels = function (modelName) {
    var walkMethod = walkModelMethod(modelName, models[modelName]);
    models[modelName].sharedClass.methods().forEach(walkMethod);
  };

  _.keysIn(models).forEach(walkModels);

  return _modelHelpers;
};
