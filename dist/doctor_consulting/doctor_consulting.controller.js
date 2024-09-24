import { Doctor_consulting } from './doctor_consulting.entity.js';
import { orm } from '../shared/orm.js';
const em = orm.em;
function sanitizeDoctorConsultingInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        vigency: req.body.vigency,
        doctor: req.body.doctor,
        consulting: req.body.consulting,
        time_tables: req.body.time_tables,
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
        const doctor_consultings = await em.find(Doctor_consulting, {}, {
            populate: ['doctor', 'consulting'],
        });
        res.status(200).json({
            message: 'Found all doctor consultings',
            data: doctor_consultings,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const doctor_consultings = await em.find(Doctor_consulting, { id }, {
            populate: ['doctor', 'consulting'],
        });
        res
            .status(200)
            .json({ message: 'Found doctor consulting', data: doctor_consultings });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const doctor_consultings = em.create(Doctor_consulting, req.body.sanitizedInput);
        await em.flush();
        res
            .status(201)
            .json({ message: 'Doctor consulting created', data: doctor_consultings });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const DoctorConsultingToUpdate = await em.findOneOrFail(Doctor_consulting, {
            id,
        });
        em.assign(DoctorConsultingToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({
            message: 'Doctor consulting updated',
            data: DoctorConsultingToUpdate,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const doctor_consulting = em.getReference(Doctor_consulting, id);
        await em.removeAndFlush(doctor_consulting);
        res.status(200).json({ message: 'Doctor consulting deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeDoctorConsultingInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=doctor_consulting.controller.js.map