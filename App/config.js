
const host = {
  localhost: 'http://127.0.0.1:3000/',
  deviceToLocalhost: 'http://10.0.1.81:3000/',
  liveTestHost: 'http://213.115.245.226:3000/',
  micobits: 'https://micobits.com/'
}

/**
 * fredrik: 5b6c42a46bdee0ede68b0157 (admin)
 * michael: 5b72839d0253da40f89c7e6b
 * tim: 5b72dd79248aa5513f518686
 * null for real login userId
 */
// const testUserId = '5b6c42a46bdee0ede68b0157'
const testUserId = null

module.exports = { host: host.micobits, testUserId }
