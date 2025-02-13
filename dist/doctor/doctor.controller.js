import { Doctor } from './doctor.entity.js';
import { orm } from '../shared/orm.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const em = orm.em;
function sanitizeDoctorInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        firstName: req.body.doctor.firstName,
        lastName: req.body.doctor.lastName,
        email: req.body.doctor.email,
        password: req.body.doctor.password,
        age: req.body.doctor.age,
        tuition_number: req.body.doctor.tuition_number,
        codUser: req.body.doctor.codUser,
        vigency: req.body.doctor.vigency,
        specialty: req.body.doctor.specialty,
        pendingAppo: req.body.doctor.pendingAppo,
        specialtyToSearch: req.body.doctor.specialtyToSearch,
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
        const doctors = await em.find(Doctor, {}, { populate: ['specialty'] });
        res.status(200).json({ message: 'Found all doctors', data: doctors });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const doctor = await em.findOneOrFail(Doctor, { id }, { populate: ['specialty', 'consultings'] });
        res.status(200).json({ message: 'Found doctor', data: doctor });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const password = req.body.sanitizedInput.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.sanitizedInput.password = hashedPassword;
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
async function loginDoctor(req, res) {
    try {
        const tuition_number = req.body.doctor.tuition_number;
        const password = req.body.doctor.password;
        const doctors = await em.find(Doctor, { tuition_number: tuition_number });
        if (doctors[0] === undefined) {
            return res.status(400).json({ message: 'Usuario no registrado' });
        }
        const doctor = doctors[0];
        const passwordCheck = await bcrypt.compare(password, doctor.password);
        if (!passwordCheck) {
            return res.status(400).json({ message: 'La contraseña no es correcta' });
        }
        const token = jwt.sign({
            id: doctor.id,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            email: doctor.email,
            password: doctor.password,
            age: doctor.age,
            specialty: doctor.specialty,
            tuition_number: tuition_number,
            codUser: doctor.codUser,
        }, process.env.SECRET_KEY || 'YoHeBaiteadoConCocodrilos');
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeDoctorInput, findAll, findOne, add, update, remove, loginDoctor };
//# sourceMappingURL=doctor.controller.js.map