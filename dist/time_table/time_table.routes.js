import { Router } from 'express';
import { sanitizeTime_tableInput, findAll, findOne, add, update, remove, } from './time_table.controller.js';
import { validateTokenAdmin } from '../shared/validateTokenAdmin.js';
import { validateTokenUser } from '../shared/validateTokenUser.js';
export const time_tableRouter = Router();
time_tableRouter.get('/', validateTokenUser, findAll);
time_tableRouter.get('/:id', validateTokenUser, findOne);
time_tableRouter.post('/', sanitizeTime_tableInput, validateTokenAdmin, add);
time_tableRouter.put('/:id', sanitizeTime_tableInput, validateTokenAdmin, update);
time_tableRouter.patch('/:id', sanitizeTime_tableInput, validateTokenAdmin, update);
time_tableRouter.delete('/:id', validateTokenAdmin, remove);
//# sourceMappingURL=time_table.routes.js.map