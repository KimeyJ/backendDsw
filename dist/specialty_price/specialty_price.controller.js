import { Specialty_price } from './specialty_price.entity.js';
import { orm } from '../shared/orm.js';
const em = orm.em;
function sanitizeSpecialtyPriceInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        vigDate: req.body.vigDate,
        cost: req.body.cost,
        specialty: req.body.specialty,
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
        const specialty_prices = await em.find(Specialty_price, {}, {
            populate: ['specialty'],
        });
        res
            .status(200)
            .json({ message: 'Found all prices', data: specialty_prices });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const specialty_prices = await em.find(Specialty_price, { id }, {
            populate: ['specialty'],
        });
        res.status(200).json({ message: 'Found price', data: specialty_prices });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const specialty_price = em.create(Specialty_price, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Price created', data: specialty_price });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const PriceToUpdate = await em.findOneOrFail(Specialty_price, { id });
        em.assign(PriceToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Price updated', data: PriceToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const specialty_price = em.getReference(Specialty_price, id);
        await em.removeAndFlush(specialty_price);
        res.status(200).json({ message: 'Price deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeSpecialtyPriceInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=specialty_price.controller.js.map