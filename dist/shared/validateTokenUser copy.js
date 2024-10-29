import jwt from 'jsonwebtoken';
const validateTokenUser = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'YoHeBaiteadoConCocodrilos');
            next();
        }
        catch (error) {
            res.status(401).json({
                message: 'Access Denied',
            });
        }
    }
    else {
        res.status(401).json({
            message: 'Access Denied',
        });
    }
};
//# sourceMappingURL=validateTokenUser%20copy.js.map