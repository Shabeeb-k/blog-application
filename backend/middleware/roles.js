exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401);
            throw new Error('Not authenticated');
        }
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error('Forbidden: insufficient role');
        }
        next();
    };
};