import { Request, Response, NextFunction } from 'express';
import { Doctor } from './doctor.entity.js';
import { orm } from '../shared/orm.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const em = orm.em;

function sanitizeDoctorInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id,
    dni: req.body.dni,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    tuition_number: req.body.tuition_number,
    codUser: req.body.codUser,
    vigency: req.body.vigency,
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

async function findAll(req: Request, res: Response) {
  try {
      const doctors = await em.find(Doctor, {}, { populate: ['specialty'] });
      res.status(200).json({ message: 'Found all doctors', data: doctors });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const doctor = await em.findOneOrFail(
      Doctor,
      { id },
      { populate: ['specialty'] }
    );
    res.status(200).json({ message: 'Found doctor', data: doctor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const password = req.body.sanitizedInput.password as string;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.sanitizedInput.password = hashedPassword;
    const doctor = em.create(Doctor, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Doctor created', data: doctor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const doctorToUpdate = await em.findOneOrFail(Doctor, {
      id,
    });
    em.assign(doctorToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Doctor updated', data: doctorToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const doctor = em.getReference(Doctor, id);
    await em.removeAndFlush(doctor);
    res.status(200).json({ message: 'Doctor deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function loginDoctor(req: Request, res: Response) {
  try {
    const dni = req.body.dni as string;
    const password = req.body.password;
    const doctors = await em.find(Doctor, {dni: dni });
    if (doctors[0] === undefined) {
      return res.status(400).json({ message: 'Usuario no registrado' });
    }
    //res.json({ users });
    const doctor = doctors[0];
    const passwordCheck = await bcrypt.compare(password, doctor.password);
    if (!passwordCheck) {
      return res.status(400).json({ message: 'La contraseña no es correcta' });
    }
    //const codUser = user.cod_user as Number;
    const token = jwt.sign(
      {
        id: doctor.id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        dni: dni,
        codUser: doctor.codUser,
      },
      process.env.SECRET_KEY || 'YoHeBaiteadoConCocodrilos'
    );
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


export { sanitizeDoctorInput, findAll, findOne, add, update, remove, loginDoctor };
