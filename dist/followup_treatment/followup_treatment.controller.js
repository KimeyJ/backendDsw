import { Followup_treatment } from './followup_treatment.entity.js';
import { orm } from '../shared/orm.js';
const em = orm.em;
function sanitizeFollowup_treatmentInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        follow: req.body.follow,
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
        const followup_treatment = await em.find(Followup_treatment, {}, {
            populate: ['treatment', 'follow'],
        });
        res.status(200).json({
            message: 'found all followup and treatments (placeholder)',
            data: followup_treatment,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const followup_treatment = await em.findOneOrFail(Followup_treatment, {
            id,
        }, {
            populate: ['treatment', 'follow'],
        });
        res.status(200).json({
            message: 'found followup and treatment (placeholder)',
            data: followup_treatment,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const followup_treatment = em.create(Followup_treatment, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({
            message: 'Followup_treatment created (placeholder)',
            data: followup_treatment,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const followup_treatmentToUpdate = await em.findOneOrFail(Followup_treatment, { id });
        em.assign(followup_treatmentToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({
            message: 'followup and treatment updated (placeholder)',
            data: followup_treatmentToUpdate,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const followup_treatment = em.getReference(Followup_treatment, id);
        await em.removeAndFlush(followup_treatment);
        res
            .status(200)
            .json({ message: 'followup_treatment deleted (placeholder)' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeFollowup_treatmentInput, findAll, findOne, add, update, remove, };
//# sourceMappingURL=followup_treatment.controller.js.map