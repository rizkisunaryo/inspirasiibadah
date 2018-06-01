'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  difference: function difference(object, base) {
    var changes = function changes(object, base) {
      return _lodash2.default.transform(object, function (result, value, key) {
        if (!_lodash2.default.isEqual(value, base[key])) {
          result[key] = _lodash2.default.isObject(value) && _lodash2.default.isObject(base[key]) ? changes(value, base[key]) : value;
        }
      });
    };
    return changes(object, base);
  }
};