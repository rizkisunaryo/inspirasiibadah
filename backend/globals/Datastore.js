'use strict';

var Datastore = require('@google-cloud/datastore');

module.exports = new Datastore({
  projectId: 'inspirasi-ibadah',
});
