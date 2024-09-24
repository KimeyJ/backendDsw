import { Router } from 'express';
import { sanitizeDoctorConsultingInput, findAll, findOne, add, update, remove, } from './doctor_consulting.controller.js';
export const doctor_consultingRouter = Router();
doctor_consultingRouter.get('/', findAll);
doctor_consultingRouter.get('/:id', findOne);
doctor_consultingRouter.post('/', sanitizeDoctorConsultingInput, add);
doctor_consultingRouter.put('/:id', sanitizeDoctorConsultingInput, update);
doctor_consultingRouter.patch('/:id', sanitizeDoctorConsultingInput, update);
doctor_consultingRouter.delete('/:id', remove);
//# sourceMappingURL=doctor_consulting.routes.js.map