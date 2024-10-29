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
      jwt.verify(
        bearerToken,
        process.env.SECRET_KEY ||
          process.env.ADMIN_KEY ||
          'YoHeBaiteadoConCocodrilos' ||
          'YoHeJijeado500Jijos'
      );
      next();
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
