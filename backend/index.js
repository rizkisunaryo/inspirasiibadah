'use strict';

var express = require('express');
var app = express();

var jwt = require('jsonwebtoken');

var AllowedOrigins = require('./globals/AllowedOrigins');
var {saveWithId} = require('./utils/Db');
var StringUtils = require('../utils/dist/StringUtils');

app.use((req, res, next) => {
  const origin = req.get('origin');
  if (AllowedOrigins.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});

app.get('/token', async(req, res) => {
  const id = StringUtils.generateId();

  try {
    await saveWithId('User', id);
  } catch (error) {
    console.log('Error when saving User: ', error);
    res.status(500).send('Error when saving User');
  }

  const token = jwt.sign(
    {id, nama: id},
    process.env.INSPIRASI_IBADAH_TOKEN_KEY
  );
  res.json({nama: id, token});
});

app.listen(3010, () => console.log('Example app listening on port 3010!'));
