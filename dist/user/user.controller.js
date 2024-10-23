import { User } from './user.entity.js';
import { orm } from '../shared/orm.js';
const em = orm.em;
function sanitizeUserInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        dni: req.body.dni,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        tuition_number: req.body.tuition_number,
        cod_user: req.body.cod_user,
        specialty: req.body.specialty,
        follow_up: req.body.follow_up,
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
        const users = await em.find(User, {});
        res.status(200).json({ message: 'Found all users', data: users });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const user = await em.findOneOrFail(User, { id });
        res.status(200).json({ message: 'Found user', data: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const user = em.create(User, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'User created', data: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const userToUpdate = await em.findOneOrFail(User, {
            id,
        });
        em.assign(userToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'User updated', data: userToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const user = em.getReference(User, id);
        await em.removeAndFlush(user);
        res.status(200).json({ message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeUserInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=user.controller.js.map