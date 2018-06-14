'use strict';

var datastore = require('../globals/Datastore');

async function get(kind, name) {
  const key = datastore.key([kind, name]);
  return datastore.get(key).then(results => results[0]);
}

async function save(kind, name, data = {}) {
  const key = datastore.key([kind, name]);
  return datastore.save({key: key, data});
}

module.exports = {get, save};
