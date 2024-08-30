import { Router } from 'express';
import {
  sanitizeFollowupInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './follow_up.controller.js';

export const appointmentRouter = Router();

appointmentRouter.get('/', findAll);
appointmentRouter.get('/:id', findOne);
appointmentRouter.post('/', sanitizeFollowupInput, add);
appointmentRouter.put('/:id', sanitizeFollowupInput, update);
appointmentRouter.patch('/:id', sanitizeFollowupInput, update);
appointmentRouter.delete('/:id', remove);
