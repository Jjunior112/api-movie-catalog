const rateLimit = require('express-rate-limit');

const apiRequestLimiter = rateLimit({
    windowsMs: process.env.RATE_LIMIT_WINDOW_MS,
    max: process.env.RATE_LIMIT_MAX_REQUESTS
})

module.exports = apiRequestLimiter