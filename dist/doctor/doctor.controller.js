import { Doctor } from './doctor.entity.js';
import { orm } from '../shared/orm.js';
import { Specialty } from '../specialty/specialty.entity.js';
const em = orm.em;
function sanitizeDoctorInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        tuition_number: req.body.tuition_number,
        specialty: req.body.specialty,
        pendingAppo: req.body.pendingAppo,
        consultings: req.body.consultings,
        specialtyToSearch: req.body.specialtyToSearch,
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
        if (req.body.specialtyToSearch !== undefined) {
            const specialtyToSearch = req.body.specialtyToSearch;
            const specialty = await em.find(Specialty, { name: specialtyToSearch });
            const id = specialty[0].id;
            const doctors = await em.find(Doctor, { specialty: id }, { populate: ['specialty'] });
            res.status(200).json({
                message: 'Found all doctors with the specified specialty',
                data: doctors,
            });
        }
        else {
            const doctors = await em.find(Doctor, {}, { populate: ['specialty'] });
            res.status(200).json({ message: 'Found all doctors', data: doctors });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const doctor = await em.findOneOrFail(Doctor, { id }, { populate: ['specialty'] });
        res.status(200).json({ message: 'Found doctor', data: doctor });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const doctor = em.create(Doctor, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Doctor created', data: doctor });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const doctorToUpdate = await em.findOneOrFail(Doctor, {
            id,
        });
        em.assign(doctorToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Doctor updated', data: doctorToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const doctor = em.getReference(Doctor, id);
        await em.removeAndFlush(doctor);
        res.status(200).json({ message: 'Doctor deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeDoctorInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=doctor.controller.js.map