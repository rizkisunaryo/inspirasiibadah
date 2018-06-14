'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = getCookie;
exports.setCookieForAYear = setCookieForAYear;
function getCookie(name) {
  if (!document) return undefined;

  var cookieStr = decodeURIComponent(document.cookie);
  var cookieArr = cookieStr.split(';');

  var cookieValue = void 0;
  var nameEqualSign = name + '=';
  for (var key in cookieArr) {
    var cookie = cookieArr[key].trim();
    if (cookie.indexOf(nameEqualSign) > -1) {
      cookieValue = cookie.substring(nameEqualSign.length, cookie.length);
      break;
    }
  }

  return cookieValue === 'undefined' ? undefined : cookieValue;
}

function setCookieForAYear(key, value) {
  if (!document) return;

  var dat = new Date();
  dat.setFullYear(dat.getFullYear() + 1);

  document.cookie = key + '=' + value + '; expires=' + dat.toUTCString() + '; path=/';
}