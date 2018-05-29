const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')

const {save} = require('./utils/Db')
const AllowedOrigins = require('./globals/AllowedOrigins')

app.use((req, res, next) => {
  const origin = req.get('origin')
  if (AllowedOrigins.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  next()
})

app.get('/token', async (req, res) => {
  const id = uuidv4().split('-').join('').substr(0, 8)

  try {
    await save('User', id)
  } catch (error) {
    console.log('Error when saving User: ', error)
    res.status(500).send('Error when saving User')
  }
  
  const token = jwt.sign({name: id}, process.env.INSPIRASI_IBADAH_TOKEN_KEY)
  res.json({name: id, token})
})

app.listen(3010, () => console.log('Example app listening on port 3010!'))