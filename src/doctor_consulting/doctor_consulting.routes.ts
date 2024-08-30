import { Router } from 'express';
import {
  sanitizeDoctorConsultingInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './doctor_consulting.controller.js';

export const appointmentRouter = Router();

appointmentRouter.get('/', findAll);
appointmentRouter.get('/:id', findOne);
appointmentRouter.post('/', sanitizeDoctorConsultingInput, add);
appointmentRouter.put('/:id', sanitizeDoctorConsultingInput, update);
appointmentRouter.patch('/:id', sanitizeDoctorConsultingInput, update);
appointmentRouter.delete('/:id', remove);
