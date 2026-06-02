const crypto = require('crypto')

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
const HOME_URL = process.env.CAFE24_HOME_URL || 'https://baylab.store/'

module.exports = async function handler(req, res) {
  try {
    const token = crypto.randomBytes(32).toString('hex')
    await fetch(UPSTASH_URL + '/set/' + token + '/1/ex/3600', {
      headers: { Authorization: 'Bearer ' + UPSTASH_TOKEN }
    })
    res.redirect(302, '/?token=' + token)
  } catch (e) {
    res.redirect(302, HOME_URL)
  }
}
