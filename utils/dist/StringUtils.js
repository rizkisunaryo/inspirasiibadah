'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateId = generateId;

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateId() {
  return (0, _v2.default)().split('-').join('').substr(0, 8);
}