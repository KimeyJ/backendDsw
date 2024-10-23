import { Router } from 'express';
import {
  sanitizeDoctorInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './doctor.controller.js';

export const doctorRouter = Router();

doctorRouter.get('/', findAll);
doctorRouter.get('/:id', findOne);
doctorRouter.post('/',sanitizeDoctorInput, add);
doctorRouter.put('/:id', sanitizeDoctorInput, update);
doctorRouter.patch('/:id', sanitizeDoctorInput, update);
doctorRouter.delete('/:id', remove);
