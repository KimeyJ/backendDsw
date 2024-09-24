import { Router } from 'express';
import { sanitizeFollowupInput, findAll, findOne, add, update, remove, } from './follow_up.controller.js';
export const follow_upRouter = Router();
follow_upRouter.get('/', findAll);
follow_upRouter.get('/:id', findOne);
follow_upRouter.post('/', sanitizeFollowupInput, add);
follow_upRouter.put('/:id', sanitizeFollowupInput, update);
follow_upRouter.patch('/:id', sanitizeFollowupInput, update);
follow_upRouter.delete('/:id', remove);
//# sourceMappingURL=follow_up.routes.js.map