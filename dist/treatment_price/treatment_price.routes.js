import { Router } from 'express';
import { sanitizeTreatment_priceInput, findAll, findOne, add, update, remove, } from './treatment_price.controller.js';
export const treatment_priceRouter = Router();
treatment_priceRouter.get('/', findAll);
treatment_priceRouter.get('/:id', findOne);
treatment_priceRouter.post('/', sanitizeTreatment_priceInput, add);
treatment_priceRouter.put('/:id', sanitizeTreatment_priceInput, update);
treatment_priceRouter.patch('/:id', sanitizeTreatment_priceInput, update);
treatment_priceRouter.delete('/:id', remove);
//# sourceMappingURL=treatment_price.routes.js.map