import { Follow_up } from './follow_up.entity.js';
import { orm } from '../shared/orm.js';
const em = orm.em;
function sanitizeFollowupInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        fdate: req.body.fdate,
        observations: req.body.observations,
        patient: req.body.patient,
        treatments: req.body.treatments,
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
        const follow_ups = await em.find(Follow_up, {}, {
            populate: ['patient'],
        });
        res.status(200).json({ message: 'Found all follows', data: follow_ups });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const follow_ups = await em.find(Follow_up, { id }, { populate: ['patient'] });
        res.status(200).json({ message: 'Found follow', data: follow_ups });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const follow_ups = em.create(Follow_up, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Follow up created', data: follow_ups });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const FollowToUpdate = await em.findOneOrFail(Follow_up, { id });
        em.assign(FollowToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Follow updated', data: FollowToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const follow_up = em.getReference(Follow_up, id);
        await em.removeAndFlush(follow_up);
        res.status(200).json({ message: 'Follow up deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeFollowupInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=follow_up.controller.js.map