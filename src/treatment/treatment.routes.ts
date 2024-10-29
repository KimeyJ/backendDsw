import { Router } from 'express';
import {
  sanitizeTreatmentInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './treatment.controller.js';
import { validateTokenAdmin } from '../shared/validateTokenAdmin.js';
import { validateTokenUser } from '../shared/validateTokenUser.js';

export const treatmentRouter = Router();

treatmentRouter.get('/', validateTokenUser, findAll);
treatmentRouter.get('/:id', validateTokenUser, findOne);
treatmentRouter.post('/', sanitizeTreatmentInput, validateTokenAdmin, add);
treatmentRouter.put('/:id', sanitizeTreatmentInput, validateTokenAdmin, update);
treatmentRouter.patch(
  '/:id',
  sanitizeTreatmentInput,
  validateTokenAdmin,
  update
);
treatmentRouter.delete('/:id', validateTokenAdmin, remove);
