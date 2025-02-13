import { Request, Response, NextFunction } from 'express';
import { Doctor_consulting } from './doctor_consulting.entity.js';
import { orm } from '../shared/orm.js';
import { Specialty } from '../specialty/specialty.entity.js';
import { PopulateHint } from '@mikro-orm/core';
import { wrap } from '@mikro-orm/core';

const em = orm.em;

function sanitizeDoctorConsultingInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    vigency: req.body.vigency,
    doctor: req.body.doctor,
    consulting: req.body.consulting,
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
    const doctor_consultings = await em.find(
      Doctor_consulting,
      {},
      {
        populate: ['doctor', 'consulting', 'doctor.specialty'],
      }
    );
    res.status(200).json({
      message: 'Found all doctor consultings',
      data: doctor_consultings,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const doctor_consultings = await em.find(
      Doctor_consulting,
      { id },
      {
        populate: ['doctor', 'consulting', 'doctor.specialty'],
      }
    );
    res
      .status(200)
      .json({ message: 'Found doctor consulting', data: doctor_consultings });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const doctor_consultings = em.create(
      Doctor_consulting,
      req.body.sanitizedInput
    );
    await em.flush();
    res
      .status(201)
      .json({ message: 'Doctor consulting created', data: doctor_consultings });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const DoctorConsultingToUpdate = await em.findOneOrFail(Doctor_consulting, {
      id,
    });
    em.assign(DoctorConsultingToUpdate,req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({
      message: 'Doctor consulting updated',
      data: DoctorConsultingToUpdate,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const doctor_consulting = em.getReference(Doctor_consulting, id);
    await em.removeAndFlush(doctor_consulting);
    res.status(200).json({ message: 'Doctor consulting deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function filterAll(req: Request, res: Response) {
  try {
    const specialty = await em.find(Specialty, { name: req.params.name });
    const id = specialty[0].id;
    const doctor_consultings = await em.find(
      Doctor_consulting,
      { doctor: { specialty: { id } }, vigency: true },
      {
        populateWhere: PopulateHint.INFER,
        populate: ['doctor', 'consulting', 'doctor.specialty'],
      }
    );
    res.status(200).json({
      message: 'Found all doctors with the specified specialty',
      data: doctor_consultings,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  sanitizeDoctorConsultingInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  filterAll,
};
