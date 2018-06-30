'use strict';

var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var {save} = require('../utils/Db');
var StringUtils = require('../../utils/dist/StringUtils');

router.get('/', async(req, res) => {
  const id = StringUtils.generateId();

  try {
    const now = (new Date).toISOString();
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

module.exports = router;
