const logger = require('@cfs/logger')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000
const passport = require('passport')
const passportAd = require('passport-azure-ad')

app.use(bodyParser.json())
app.use(passport.initialize());

app.get('/', (req, res) => {
  logger.info('GET request')
  res.status(200).send({it: 'works!'})
})



const bearerOptions = {
  identityMetadata: `https://login.microsoftonline.com/${process.env.TENANT_GUID}/v2.0/.well-known/openid-configuration`,
  clientID: process.env.CLIENT_ID,
  passReqToCallback: false,
  loggingLevel: 'info',

  isB2C: false,
  validateIssuer: false // what happens when true?
};

const bearerStrategy = new passportAd.BearerStrategy(bearerOptions, (token, done) => {
  console.log('verifying the user');
  console.log(token, 'was the token retrieved');

  const user = {
    username: 'sparkpost'
  }

  done(null, user, token)
});


passport.use(bearerStrategy)

app.post('/consumer', passport.authenticate('oauth-bearer', { session: false }), (req, res) => {
  logger.info('received payload', req.body)
  logger.info('headers', req.headers)
  res.status(200).send()
})

app.listen(port, () => {
  logger.info(`listening on port ${port}`)
})
