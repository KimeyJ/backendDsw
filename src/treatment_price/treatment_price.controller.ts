import { Request, Response, NextFunction } from 'express';
import { Treatment_price } from './treatment_price.entity.js';
import { orm } from '../shared/orm.js';

const em = orm.em;

function sanitizeTreatment_priceInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    vigDate: req.body.vigDate,
    treatment: req.body.treatment,
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
    const treatment_prices = await em.find(Treatment_price, {});
    res
      .status(200)
      .json({ message: 'found all prices', data: treatment_prices });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const treatment_price = await em.findOneOrFail(Treatment_price, { id });
    res.status(200).json({ message: 'found price', data: treatment_price });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const treatment_price = em.create(Treatment_price, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Price created', data: treatment_price });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const treatment_priceToUpdate = await em.findOneOrFail(Treatment_price, {
      id,
    });
    em.assign(treatment_priceToUpdate, req.body.sanitizedInput);
    await em.flush();
    res
      .status(200)
      .json({ message: 'price updated', data: treatment_priceToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const treatment_price = em.getReference(Treatment_price, id);
    await em.removeAndFlush(treatment_price);
    res.status(200).json({ message: 'Price deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeTreatment_priceInput, findAll, findOne, add, update, remove };
