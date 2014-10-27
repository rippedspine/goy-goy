(function() {
  'use strict';

  var Model = require('./triangle/triangle-model.js')
    , Collection = require('./triangle/triangle-collection.js');

  var Triangle = {};
  Triangle.Model = Model;
  Triangle.Collection = Collection;
  
  module.exports = Triangle;

})(this);