import { Request, Response, NextFunction } from 'express';
import { Appointment } from './appointment.entity.js';
import { orm } from '../shared/orm.js';
import { PopulateHint } from '@mikro-orm/core';


const em = orm.em;

function sanitizeAppointmentInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    appoDate: req.body.appoDate,
    appoTime: req.body.appoTime,
    assisted: req.body.assisted,
    doctor_consulting: req.body.doctor_consulting,
    patient: req.body.patient,
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
    const appointments = await em.find(
      Appointment,
      {},
      {
        populate: ['doctor_consulting', 'patient'],
      }
    );
    res
      .status(200)
      .json({ message: 'Found all appointments', data: appointments });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const appointment = await em.find(
      Appointment,
      { id },
      {
        populate: ['doctor_consulting', 'patient'],
      }
    );
    res.status(200).json({ message: 'Found appointment', data: appointment });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const appointment = em.create(Appointment, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Appointment created', data: appointment });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const AppointmentToUpdate = await em.findOneOrFail(Appointment, { id });
    em.assign(AppointmentToUpdate, req.body.sanitizedInput);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Appointment updated', data: AppointmentToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const appointment = em.getReference(Appointment, id);
    await em.removeAndFlush(appointment);
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function filterAll(req: Request, res: Response) {
  try {
    const appointments = await em.find (Appointment, {patient : {dni : req.params.dni}},{
          populateWhere: PopulateHint.INFER, populate: ['doctor_consulting','doctor_consulting.doctor','doctor_consulting.consulting', 'doctor_consulting.doctor.specialty']
    })
    res.status(200).json({message: 'Found all appointments of the user',data: appointments});
  }
   catch (error:any) {
    res.status(500).json({message: error.message})
   }
}

export { sanitizeAppointmentInput, findAll, findOne, add, update, remove, filterAll };
