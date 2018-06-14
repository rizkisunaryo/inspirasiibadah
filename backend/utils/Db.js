'use strict';

var datastore = require('../globals/Datastore');
var StringUtils = require('../../utils/dist/StringUtils');

async function saveWithId(kind, name, data = {}) {
  const key = datastore.key([kind, name]);

  return new Promise((resolve, reject) => {
    datastore.save({
      key: key,
      data,
    }, err => {
      if (!err) {
        resolve(true);
        return;
      }
      reject(err);
    });
  });
}

async function save(kind, data = {}) {
  return saveWithId(kind, StringUtils.generateId(), data);
}

module.exports = {save, saveWithId};
