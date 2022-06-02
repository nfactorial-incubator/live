const { expressjwt } = require('express-jwt');

module.exports = expressjwt({
    secret: process.env.TOKEN_KEY,
    algorithms: ['HS256']
});
