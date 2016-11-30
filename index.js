const logger = require('@cfs/logger')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  logger.info('GET request')
  res.status(200).send({it: 'works!'})
})

app.post('/consumer', (req, res) => {
  logger.info('received payload', req.body)
  res.status(200).send()
})

app.listen(port, () => {
  logger.info(`listening on port ${port}`)
})
