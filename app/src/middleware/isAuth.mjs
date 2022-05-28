import { expressjwt } from 'express-jwt';

export default expressjwt({
    secret: process.env.TOKEN_KEY,
    algorithms: ["HS256"],
});