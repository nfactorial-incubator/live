export default (err, req, res, next) => {
    if (err.constructor.name === 'UnauthorizedError') {
        return res.status(401).send('Unauthorized');
    } else {
        return next();
    }
};
