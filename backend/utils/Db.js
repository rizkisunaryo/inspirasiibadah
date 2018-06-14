'use strict';

var datastore = require('../globals/Datastore');

async function save(kind, name, data = {}) {
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

module.exports = {save};
