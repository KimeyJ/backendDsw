import { Treatment_price } from './treatment_price.entity.js';
import { orm } from '../shared/orm.js';
const em = orm.em;
function sanitizeTreatment_priceInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        vigDate: req.body.vigDate,
        cost: req.body.cost,
        treatment: req.body.treatment,
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const treatment_prices = await em.find(Treatment_price, {}, {
            populate: ['treatment'],
        });
        res
            .status(200)
            .json({ message: 'found all prices', data: treatment_prices });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const treatment_price = await em.findOneOrFail(Treatment_price, { id }, {
            populate: ['treatment'],
        });
        res.status(200).json({ message: 'found price', data: treatment_price });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const treatment_price = em.create(Treatment_price, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Price created', data: treatment_price });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const treatment_priceToUpdate = await em.findOneOrFail(Treatment_price, {
            id,
        });
        em.assign(treatment_priceToUpdate, req.body.sanitizedInput);
        await em.flush();
        res
            .status(200)
            .json({ message: 'price updated', data: treatment_priceToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const treatment_price = em.getReference(Treatment_price, id);
        await em.removeAndFlush(treatment_price);
        res.status(200).json({ message: 'Price deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeTreatment_priceInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=treatment_price.controller.js.map