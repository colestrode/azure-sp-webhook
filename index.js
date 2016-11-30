const logger = require('@cfs/logger')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).send({it: 'works!'})
})

app.post('/consumer', (req, res) => {
  logger.info('received payload', req.body)
  res.status(200).send()
})

app.listen(8000, () => {
  logger.info('listening on port 8000')
})