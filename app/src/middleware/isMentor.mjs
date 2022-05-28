export default (req, res, next) => {
    if (req.auth.role !== "mentor") {
        return res.status(401).end('You have no access');
    } else {
        return next()
    }
};