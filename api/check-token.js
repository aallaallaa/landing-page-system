const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

module.exports = async function handler(req, res) {
  const { token } = req.query
  if (!token) return res.json({ valid: false })
  try {
    const response = await fetch(UPSTASH_URL + '/getdel/' + token, {
      headers: { Authorization: 'Bearer ' + UPSTASH_TOKEN }
    })
    const data = await response.json()
    return res.json({ valid: data.result === '1' })
  } catch (e) {
    return res.json({ valid: false })
  }
}
