import { Request, Response, NextFunction } from 'express';
import { User } from './user.entity.js';
import { orm } from '../shared/orm.js';

const em = orm.em;

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
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

async function findAll(req: Request, res: Response) {
  try {
    if (req.body.specialtyToSearch !== undefined) {
      const specialtyToSearch = Number.parseInt(req.body.specialtyToSearch);
      const users = await em.find(User, { specialty: specialtyToSearch });
      res.status(200).json({
        message: 'Found all doctors with the specified specialty',
        data: users,
      });
    } else {
      const users = await em.find(User, {}, { populate: ['specialty'] });
      res.status(200).json({ message: 'Found all users', data: users });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const user = await em.findOneOrFail(
      User,
      { id },
      { populate: ['specialty'] }
    );
    res.status(200).json({ message: 'Found user', data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const user = em.create(User, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'User created', data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const userToUpdate = await em.findOneOrFail(User, {
      id,
    });
    em.assign(userToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'User updated', data: userToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const user = em.getReference(User, id);
    await em.removeAndFlush(user);
    res.status(200).json({ message: 'User deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeUserInput, findAll, findOne, add, update, remove };
