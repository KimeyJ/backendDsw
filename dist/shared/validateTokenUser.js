import jwt from 'jsonwebtoken';
export const validateTokenUser = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY || 'YoHeBaiteadoConCocodrilos');
            if (decoded.codUser != 0 && decoded.codUser != 1 && decoded.codUser != 2) {
                throw new Error('No auth user');
            }
            else {
                next();
            }
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
//# sourceMappingURL=validateTokenUser.js.map