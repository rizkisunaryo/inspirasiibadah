'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var generateUrlQuery = exports.generateUrlQuery = function generateUrlQuery(paramObj) {
  var queryArr = [];
  Object.keys(paramObj).forEach(function (key) {
    queryArr.push(key + '=' + paramObj[key]);
  });
  return '?' + queryArr.join('&&');
};