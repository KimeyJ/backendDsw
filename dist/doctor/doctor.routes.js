import { Router } from 'express';
import { sanitizeDoctorInput, findAll, findOne, add, update, remove, loginDoctor } from './doctor.controller.js';
import { validateTokenAdmin } from '../shared/validateTokenAdmin.js';
import { validateTokenUser } from '../shared/validateTokenUser.js';
import { validateCaptcha } from '../shared/validateCaptcha.js';
export const doctorRouter = Router();
doctorRouter.get('/', validateTokenUser, findAll);
doctorRouter.get('/:id', validateTokenUser, findOne);
doctorRouter.post('/', validateCaptcha, sanitizeDoctorInput, add);
doctorRouter.put('/:id', sanitizeDoctorInput, validateTokenAdmin, update);
doctorRouter.patch('/:id', sanitizeDoctorInput, validateTokenAdmin, update);
doctorRouter.delete('/:id', validateTokenAdmin, remove);
doctorRouter.post('/login', validateCaptcha, loginDoctor);
//# sourceMappingURL=doctor.routes.js.map