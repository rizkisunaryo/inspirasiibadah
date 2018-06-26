'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonthIndonesia = exports.gmtToIndonesia = undefined;

var _StringUtils = require('../src/StringUtils');

var gmtToIndonesia = exports.gmtToIndonesia = function gmtToIndonesia(gmtStr) {
  var date = new Date(gmtStr);
  return date.getDate() + ' ' + getMonthIndonesia(date.getMonth()) + ' ' + date.getFullYear() + ', ' + (0, _StringUtils.zeroedNumber)(date.getHours(), 2) + ':' + (0, _StringUtils.zeroedNumber)(date.getMinutes(), 2);
};

var getMonthIndonesia = exports.getMonthIndonesia = function getMonthIndonesia(month) {
  switch (month) {
    case 1:
      return 'Februari';
    case 2:
      return 'Maret';
    case 3:
      return 'April';
    case 4:
      return 'Mei';
    case 5:
      return 'Juni';
    case 6:
      return 'Juli';
    case 7:
      return 'Agustus';
    case 8:
      return 'September';
    case 9:
      return 'Oktober';
    case 10:
      return 'November';
    case 11:
      return 'Desember';
    default:
      return 'Januari';
  }
};