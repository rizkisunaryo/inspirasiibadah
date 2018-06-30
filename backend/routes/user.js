'use strict';

var express = require('express');
var router = express.Router();

var {get: dbGet, save} = require('../utils/Db');
var {verifyToken} = require('../utils/Token');

router.get('/', async(req, res) => {
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
router.put('/nama', async(req, res) => {
  const token = req.get('token');
  let userReq = verifyToken(res, token);
  if (!userReq) return;

  try {
    let user = await dbGet('User', userReq.id);

    user.nama = req.body.nama;
    user.updatedAt = (new Date).toISOString();

    await save('User', userReq.id, user);
    res.status(200).json({});
  } catch (error) {
    console.log('Error when updating User: ', error);
    res.status(500).json({error: 'Error when saving User'});
  }
});

module.exports = router;
