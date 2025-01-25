import { Router } from 'express';
import { sanitizeUserInput, findAll, findOne, add, update, remove, loginUser, } from './user.controller.js';
import { validateTokenAdmin } from '../shared/validateTokenAdmin.js';
import { validateTokenUser } from '../shared/validateTokenUser.js';
import { validateCaptcha } from '../shared/validateCaptcha.js';
export const userRouter = Router();
userRouter.get('/', validateTokenAdmin, findAll);
userRouter.get('/:id', validateTokenAdmin, findOne);
userRouter.post('/', validateCaptcha, sanitizeUserInput, add);
userRouter.put('/:id', sanitizeUserInput, validateTokenUser, update);
userRouter.patch('/:id', sanitizeUserInput, validateTokenUser, update);
userRouter.delete('/:id', validateTokenAdmin, remove);
userRouter.post('/login', validateCaptcha, loginUser);
//# sourceMappingURL=user.routes.js.map