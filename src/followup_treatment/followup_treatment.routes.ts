import { Router } from 'express';
import {
  sanitizeFollowup_treatmentInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './followup_treatment.controller.js';
import { validateTokenAdmin } from '../shared/validateTokenAdmin.js';
import { validateTokenUser } from '../shared/validateTokenUser.js';

export const followup_treatmentRouter = Router();

followup_treatmentRouter.get('/', validateTokenUser, findAll);
followup_treatmentRouter.get('/:id', validateTokenUser, findOne);
followup_treatmentRouter.post(
  '/',
  sanitizeFollowup_treatmentInput,
  validateTokenAdmin,
  add
);
followup_treatmentRouter.put(
  '/:id',
  sanitizeFollowup_treatmentInput,
  validateTokenAdmin,
  update
);
followup_treatmentRouter.patch(
  '/:id',
  sanitizeFollowup_treatmentInput,
  validateTokenAdmin,
  update
);
followup_treatmentRouter.delete('/:id', validateTokenAdmin, remove);
