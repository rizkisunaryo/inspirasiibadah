'use strict';

var jwt = require('jsonwebtoken');

function verifyToken(res, token) {
  try {
    const user = jwt.verify(token, process.env.INSPIRASI_IBADAH_TOKEN_KEY);
    return user;
  } catch (error) {
    console.log('Unable to verify the token: ', token);
    res.status(401).json({error: 'Unable to verify the token'});
    return false;
  }
}

module.exports = {verifyToken};
