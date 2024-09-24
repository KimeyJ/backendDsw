import { Router } from 'express';
import { sanitizeSpecialtyPriceInput, findAll, findOne, add, update, remove, } from './specialty_price.controller.js';
export const specialty_priceRouter = Router();
specialty_priceRouter.get('/', findAll);
specialty_priceRouter.get('/:id', findOne);
specialty_priceRouter.post('/', sanitizeSpecialtyPriceInput, add);
specialty_priceRouter.put('/:id', sanitizeSpecialtyPriceInput, update);
specialty_priceRouter.patch('/:id', sanitizeSpecialtyPriceInput, update);
specialty_priceRouter.delete('/:id', remove);
//# sourceMappingURL=specialty_price.routes.js.map