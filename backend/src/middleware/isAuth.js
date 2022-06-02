const { expressjwt } = require('express-jwt');

module.exports = expressjwt({
    secret: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1MzczMzIzMiwiaWF0IjoxNjUzNzMzMjMyfQ.hWeyBordvDqwpZNdFA3WP37Kr8HSJs7P8fRB2LUy2mk',
    algorithms: ['HS256']
});
