'use strict';

var express = require('express');
var router = express.Router();

var datastore = require('../globals/Datastore');
var {get: dbGet, save} = require('../utils/Db');
var StringUtils = require('../../utils/dist/StringUtils');
var {ERROR_KISAH_30_CHARACTERS} = require('../../utils/dist/constants/Errors');
var {verifyToken} = require('../utils/Token');

router.post('/', async(req, res) => {
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
  const now = (new Date).toISOString();
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
router.get('/:penulisId', async(req, res) => {
  try {
    const isAfter = req.query.isAfter === 'true';
    const penulisId = req.params.penulisId;
    const updatedAt = req.query.updatedAt ? req.query.updatedAt
      : (new Date()).toISOString();

    const kisahQuery = datastore.createQuery('Kisah');
    const ltOrGt = isAfter ? '>=' : '<=';
    const filterQuery = kisahQuery
      .filter('penulisId', penulisId)
      .filter('updatedAt', ltOrGt, updatedAt);
    const orderQuery = filterQuery.order('updatedAt', {
      descending: !isAfter,
    });
    const limitQuery = orderQuery.limit(Number(req.query.limit));

    const allResults = await Promise.all([
      datastore.runQuery(limitQuery),
      dbGet('User', penulisId),
    ]);
    let results = allResults[0][0].map(result => {
      const penulisNama = allResults[1].nama ? allResults[1].nama
        : allResults[1].id;
      result.penulisNama = penulisNama;
      return result;
    });

    res.json(results);
  } catch (error) {
    console.log('Error when retrieving Kisah: ', error);
    res.status(500).json({error: 'Error when retrieving Kisah'});
    return;
  }
});

module.exports = router;
