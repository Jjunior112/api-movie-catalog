const rateLimit = require('express-rate-limit');

const apiRequestLimiter = rateLimit({
    windowsMs: 1 * 60 * 1000,
    max: 50
})

module.exports = apiRequestLimiter