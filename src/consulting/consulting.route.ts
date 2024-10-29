import { Router } from 'express';
import {
  sanitizeConsultingInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './consulting.controller.js';
import { validateTokenAdmin } from '../shared/validateTokenAdmin.js';
import { validateTokenUser } from '../shared/validateTokenUser.js';

export const consultingRouter = Router();

consultingRouter.get('/', validateTokenUser, findAll);
consultingRouter.get('/:id', validateTokenUser, findOne);
consultingRouter.post('/', sanitizeConsultingInput, validateTokenAdmin, add);
consultingRouter.put(
  '/:id',
  sanitizeConsultingInput,
  validateTokenAdmin,
  update
);
consultingRouter.patch(
  '/:id',
  sanitizeConsultingInput,
  validateTokenAdmin,
  update
);
consultingRouter.delete('/:id', validateTokenAdmin, remove);
