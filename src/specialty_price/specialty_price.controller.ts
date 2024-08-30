import { Request, Response, NextFunction } from 'express';
import { Specialty_price } from './specialty_price.entity.js';
import { orm } from '../shared/orm.js';

const em = orm.em;

function sanitizeSpecialtyPriceInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    name: req.body.name,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const specialty_prices = await em.find(Specialty_price, {});
    res
      .status(200)
      .json({ message: 'Found all prices', data: specialty_prices });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const specialty_prices = await em.find(Specialty_price, { id });
    res.status(200).json({ message: 'Found price', data: specialty_prices });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const specialty_price = em.create(Specialty_price, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Price created', data: specialty_price });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const PriceToUpdate = await em.findOneOrFail(Specialty_price, { id });
    em.assign(PriceToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Price updated', data: PriceToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const specialty_price = em.getReference(Specialty_price, id);
    await em.removeAndFlush(specialty_price);
    res.status(200).json({ message: 'Price deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeSpecialtyPriceInput, findAll, findOne, add, update, remove };
