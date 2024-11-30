import { Router } from 'express';
import {
  sanitizeDoctorConsultingInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  filterAll
} from './doctor_consulting.controller.js';
import { validateTokenAdmin } from '../shared/validateTokenAdmin.js';
import { validateTokenUser } from '../shared/validateTokenUser.js';

export const doctor_consultingRouter = Router();

doctor_consultingRouter.get('/', validateTokenUser, findAll);
doctor_consultingRouter.get('/:id', validateTokenUser, findOne);
doctor_consultingRouter.post('/',sanitizeDoctorConsultingInput, validateTokenAdmin, add);
doctor_consultingRouter.put('/:id',sanitizeDoctorConsultingInput,validateTokenAdmin,update);
doctor_consultingRouter.patch('/:id',sanitizeDoctorConsultingInput,validateTokenAdmin,update);
doctor_consultingRouter.delete('/:id', validateTokenAdmin, remove);
doctor_consultingRouter.get('/search/:name', validateTokenUser,filterAll);