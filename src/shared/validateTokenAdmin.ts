import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validateTokenAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.headers['authorization'];
  if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
    try {
      const bearerToken = headerToken.slice(7);
      jwt.verify(bearerToken, process.env.ADMIN_KEY || 'YoHeJijeado500Jijos');
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
