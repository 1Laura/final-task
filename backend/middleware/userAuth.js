const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({message: 'Authorization header missing'});
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({
            message: 'Invalid token format. Expected format: Bearer <token>',
        });
    }

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid or expired token',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
    }
};
