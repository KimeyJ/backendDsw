import { Router } from 'express';
import { sanitizeAppointmentInput, findAll, findOne, add, update, remove, } from './appointment.controller.js';
export const appointmentRouter = Router();
appointmentRouter.get('/', findAll);
appointmentRouter.get('/:id', findOne);
appointmentRouter.post('/', sanitizeAppointmentInput, add);
appointmentRouter.put('/:id', sanitizeAppointmentInput, update);
appointmentRouter.patch('/:id', sanitizeAppointmentInput, update);
appointmentRouter.delete('/:id', remove);
//# sourceMappingURL=appointment.routes.js.map