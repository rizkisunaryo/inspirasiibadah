'use strict';

var express = require('express');
var app = express();

var jwt = require('jsonwebtoken');

var AllowedOrigins = require('./globals/AllowedOrigins');
var datastore = require('./globals/Datastore');
var {get: dbGet, save} = require('./utils/Db');
var StringUtils = require('../utils/dist/StringUtils');
var {ERROR_KISAH_30_CHARACTERS} = require('../utils/dist/constants/Errors');
var {verifyToken} = require('./utils/Token');

app.use(express.json());
app.use((req, res, next) => {
  const origin = req.get('origin');
  if (AllowedOrigins.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, token'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT'
    );
  }
  next();
});

app.get('/token', async(req, res) => {
  const id = StringUtils.generateId();

  try {
    const now = (new Date).toUTCString();
    await save('User', id, {
      createdAt: now,
      updatedAt: now,
    });
  } catch (error) {
    console.log('Error when saving User: ', error);
    res.status(500).json({error: 'Error when saving User: '});
    return;
  }

  const token = jwt.sign(
    {id},
    process.env.INSPIRASI_IBADAH_TOKEN_KEY
  );
  res.json({id, nama: id, token});
});

app.post('/kisah', async(req, res) => {
  const token = req.get('token');

  let userReq = verifyToken(res, token);
  if (!userReq) return;

  const kisah = req.body.kisah;
  if (!kisah || kisah.length < 30) {
    console.log(ERROR_KISAH_30_CHARACTERS, ': ', kisah);
    res
      .status(403)
      .json({error: ERROR_KISAH_30_CHARACTERS});
    return;
  }

  const id = StringUtils.generateId();
  const now = (new Date).toUTCString();
  try {
    await save('Kisah', id, {
      penulisId: userReq.id,
      judul: req.body.judul,
      kisah: req.body.kisah,
      createdAt: now,
      updatedAt: now,
    });
  } catch (error) {
    console.log('Error when saving Kisah: ', error);
    res.status(500).json({error: 'Error when saving Kisah'});
    return;
  }

  res.json({id});
});
app.get('/kisah/saya', async(req, res) => {
  let userReq = verifyToken(res, req.get('token'));
  if (!userReq) return;

  try {
    const kisahQuery = datastore.createQuery('Kisah');
    const ltOrGt = req.query.isAfter === 'true' ? '>=' : '<=';
    const filterQuery = kisahQuery
      .filter('penulisId', userReq.id)
      .filter('updatedAt', ltOrGt, req.query.updatedAt);
    const limitQuery = filterQuery.limit(Number(req.query.limit));
    const results = await datastore.runQuery(limitQuery);
    res.json(results[0]);
  } catch (error) {
    console.log('Error when retrieving Kisah: ', error);
    res.status(500).json({error: 'Error when retrieving Kisah'});
    return;
  }
});

app.get('/user', async(req, res) => {
  const token = req.get('token');

  let userReq = verifyToken(res, token);
  if (!userReq) return;

  try {
    const userDb = await dbGet('User', userReq.id);
    const nama = userDb.nama ? userDb.nama : userDb.id;
    res.json({id: userDb.id, nama});
  } catch (error) {
    console.log('Error when getting User by token: ', token);
    res.status(500).json({error: 'Error when getting User'});
  }
});
app.put('/user/nama', async(req, res) => {
  const token = req.get('token');
  let userReq = verifyToken(res, token);
  if (!userReq) return;

  try {
    let user = await dbGet('User', userReq.id);

    user.nama = req.body.nama;
    user.updatedAt = (new Date).toUTCString();

    await save('User', userReq.id, user);
    res.status(200).json({});
  } catch (error) {
    console.log('Error when updating User: ', error);
    res.status(500).json({error: 'Error when saving User'});
  }
});

app.listen(3010, () => console.log('Example app listening on port 3010!'));
