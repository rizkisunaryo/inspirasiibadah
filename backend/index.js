'use strict';

var express = require('express');
var app = express();

var jwt = require('jsonwebtoken');

var AllowedOrigins = require('./globals/AllowedOrigins');
var {save} = require('./utils/Db');
var StringUtils = require('../utils/dist/StringUtils');

app.use(express.json());
app.use((req, res, next) => {
  const origin = req.get('origin');
  if (AllowedOrigins.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, token'
    );
  }
  next();
});

app.get('/token', async(req, res) => {
  const id = StringUtils.generateId();

  try {
    await save('User', id);
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

app.post('/kisah', async(req, res) => {
  const token = req.get('token');
  const userObj = jwt.verify(token, process.env.INSPIRASI_IBADAH_TOKEN_KEY);

  const id = StringUtils.generateId();
  const now = (new Date).toUTCString();
  try {
    await save('Kisah', id, {
      penulisId: userObj.id,
      judul: req.body.judul,
      kisah: req.body.kisah,
      createdAt: now,
      updatedAt: now,
    });
  } catch (error) {
    console.log('Error when saving Kisah: ', error);
    res.status(500).send('Error when saving Kisah');
  }

  res.json({id});
});

app.listen(3010, () => console.log('Example app listening on port 3010!'));
