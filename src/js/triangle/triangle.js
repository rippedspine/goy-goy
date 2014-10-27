(function() {
  'use strict';

  var Model = require('./triangle-model.js')
    , Collection = require('./triangle-collection.js');

  var Triangle = {};
  Triangle.Model = Model;
  Triangle.Collection = Collection;
  
  module.exports = Triangle;

})(this);