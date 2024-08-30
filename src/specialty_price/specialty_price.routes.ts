import { Router } from 'express';
import {
  sanitizeSpecialtyPriceInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './specialty_price.controller.js';

export const appointmentRouter = Router();

appointmentRouter.get('/', findAll);
appointmentRouter.get('/:id', findOne);
appointmentRouter.post('/', sanitizeSpecialtyPriceInput, add);
appointmentRouter.put('/:id', sanitizeSpecialtyPriceInput, update);
appointmentRouter.patch('/:id', sanitizeSpecialtyPriceInput, update);
appointmentRouter.delete('/:id', remove);
