import { Router } from 'express';
import { sanitizeTime_tableInput, findAll, findOne, add, update, remove, } from './time_table.controller.js';
export const time_tableRouter = Router();
time_tableRouter.get('/', findAll);
time_tableRouter.get('/:id', findOne);
time_tableRouter.post('/', sanitizeTime_tableInput, add);
time_tableRouter.put('/:id', sanitizeTime_tableInput, update);
time_tableRouter.patch('/:id', sanitizeTime_tableInput, update);
time_tableRouter.delete('/:id', remove);
//# sourceMappingURL=time_table.routes.js.map