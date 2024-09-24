import { Router } from 'express';
import { sanitizeFollowup_treatmentInput, findAll, findOne, add, update, remove, } from './followup_treatment.controller.js';
export const followup_treatmentRouter = Router();
followup_treatmentRouter.get('/', findAll);
followup_treatmentRouter.get('/:id', findOne);
followup_treatmentRouter.post('/', sanitizeFollowup_treatmentInput, add);
followup_treatmentRouter.put('/:id', sanitizeFollowup_treatmentInput, update);
followup_treatmentRouter.patch('/:id', sanitizeFollowup_treatmentInput, update);
followup_treatmentRouter.delete('/:id', remove);
//# sourceMappingURL=followup_treatment.routes.js.map