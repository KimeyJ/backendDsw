import { Router } from 'express';
import { sanitizeSpecialtyInput, findAll, findOne, add, update, remove, } from './specialty.controller.js';
import { validateTokenAdmin } from '../shared/validateTokenAdmin.js';
import { validateTokenUser } from '../shared/validateTokenUser.js';
export const specialtyRouter = Router();
specialtyRouter.get('/', findAll);
specialtyRouter.get('/:id', validateTokenUser, findOne);
specialtyRouter.post('/', sanitizeSpecialtyInput, validateTokenAdmin, add);
specialtyRouter.put('/:id', sanitizeSpecialtyInput, validateTokenAdmin, update);
specialtyRouter.patch('/:id', sanitizeSpecialtyInput, validateTokenAdmin, update);
specialtyRouter.delete('/:id', validateTokenAdmin, remove);
//# sourceMappingURL=specialty.routes.js.map