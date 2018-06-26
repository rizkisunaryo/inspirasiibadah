'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zeroedNumber = undefined;
exports.generateId = generateId;

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateId() {
  return (0, _v2.default)().split('-').join('').substr(0, 8);
}

var zeroedNumber = exports.zeroedNumber = function zeroedNumber(number, expectedLength) {
  var numberStr = number;
  if (typeof number === 'number') {
    numberStr = number.toString();
  }

  var numberLength = numberStr.length;
  if (numberLength >= expectedLength) {
    return numberStr;
  }

  for (var i = numberLength + 1; i <= expectedLength; i++) {
    numberStr = '0' + numberStr;
  }
  return numberStr;
};