import { Router } from 'express';
import {
  sanitizeFollowupInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './follow_up.controller.js';
import { validateTokenAdmin } from '../shared/validateTokenAdmin.js';
import { validateTokenUser } from '../shared/validateTokenUser.js';

export const follow_upRouter = Router();

follow_upRouter.get('/', validateTokenUser, findAll);
follow_upRouter.get('/:id', validateTokenUser, findOne);
follow_upRouter.post('/', sanitizeFollowupInput, validateTokenAdmin, add);
follow_upRouter.put('/:id', sanitizeFollowupInput, validateTokenAdmin, update);
follow_upRouter.patch(
  '/:id',
  sanitizeFollowupInput,
  validateTokenAdmin,
  update
);
follow_upRouter.delete('/:id', validateTokenAdmin, remove);
