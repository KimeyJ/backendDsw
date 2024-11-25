import { Router } from 'express';
import { sanitizeAppointmentInput, findAll, findOne, add, update, remove, } from './appointment.controller.js';
;
import { validateTokenUser } from '../shared/validateTokenUser.js';
export const appointmentRouter = Router();
appointmentRouter.get('/', findAll);
appointmentRouter.get('/:id', validateTokenUser, findOne);
appointmentRouter.post('/', sanitizeAppointmentInput, add);
appointmentRouter.put('/:id', sanitizeAppointmentInput, validateTokenUser, update);
appointmentRouter.patch('/:id', sanitizeAppointmentInput, validateTokenUser, update);
appointmentRouter.delete('/:id', validateTokenUser, remove);
//# sourceMappingURL=appointment.routes.js.map