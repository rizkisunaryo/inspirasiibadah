'use strict';

var express = require('express');
var app = express();

var AllowedOrigins = require('./globals/AllowedOrigins');

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

app.use('/kisah', require('./routes/kisah'));
app.use('/token', require('./routes/token'));
app.use('/user', require('./routes/user'));

app.listen(3010, () => console.log('Example app listening on port 3010!'));
