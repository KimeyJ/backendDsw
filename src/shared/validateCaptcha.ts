import { Request, Response, NextFunction } from 'express';

export const validateCaptcha = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = new URLSearchParams({
      secret: 'ANDRIU DECIME Y TE LA PASO',
      response: req.body['g-recaptcha-responsse'],
    });
    fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          next();
        } else {
          throw new Error('Captcha is not valid');
        }
      });
  } catch (error) {
    res.status(401).json({
      message: 'Captcha is not valid',
    });
  }
};
