import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validateTokenUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.headers['authorization'];
  if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
    try {
      const bearerToken = headerToken.slice(7);
      const decoded = jwt.verify(
        bearerToken,
        process.env.SECRET_KEY || 'YoHeBaiteadoConCocodrilos'
      ) as jwt.JwtPayload;
      if (decoded.cod_user != 0 && decoded.cod_user != 1) {
        throw new Error('No auth user')
      }
      else {
        next();
      }
    } catch (error) {
      res.status(401).json({
        message: 'Access Denied',
      });
    }
  } else {
    res.status(401).json({
      message: 'Access Denied',
    });
  }
};
