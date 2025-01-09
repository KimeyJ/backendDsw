import { Request, Response, NextFunction } from 'express';
import { Time_table } from './time_table.entity.js';
import { orm } from '../shared/orm.js';
import { PopulateHint } from '@mikro-orm/core';

const em = orm.em;

function sanitizeTime_tableInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    consultationTime: req.body.consultationTime,
    vigency: req.body.vigency,
    doctor_consulting: req.body.doctor_consulting,
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
    const time_tables = await em.find(
      Time_table,
      {},
      { populate: ['doctor_consulting'] }
    );
    res
      .status(200)
      .json({ message: 'Found all time tables', data: time_tables });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const time_table = await em.find(
      Time_table,
      { id },
      {
        populate: ['doctor_consulting'],
      }
    );
    res.status(200).json({ message: 'Found time table', data: time_table });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const time_table = em.create(Time_table, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Time table created', data: time_table });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const Time_tableToUpdate = await em.findOneOrFail(Time_table, { id });
    em.assign(Time_tableToUpdate, req.body.sanitizedInput);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Time table updated', data: Time_tableToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const time_table = em.getReference(Time_table, id);
    await em.removeAndFlush(time_table);
    res.status(200).json({ message: 'Time table deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function filterDocCon(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const time_tables = em.find(
      Time_table,
      { doctor_consulting: id },
      {
        populateWhere: PopulateHint.INFER,
        populate: [
          'doctor_consulting',
          'doctor_consulting.doctor',
          'doctor_consulting.consulting',
        ],
      }
    );
    res
      .status(200)
      .json({
        message: 'Found all appointments of the doctor',
        data: time_tables,
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeTime_tableInput, findAll, findOne, add, update, remove };
