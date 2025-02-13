import 'reflect-metadata';
import express from 'express';
import { orm, syncSchema } from './shared/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { specialtyRouter } from './specialty/specialty.routes.js';
import { consultingRouter } from './consulting/consulting.route.js';
import { appointmentRouter } from './appointment/appointment.routes.js';
import { doctor_consultingRouter } from './doctor_consulting/doctor_consulting.routes.js';
import { userRouter } from './user/user.routes.js';
import { doctorRouter } from './doctor/doctor.routes.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});


app.use('/api/specialties', specialtyRouter); 
app.use('/api/consultings', consultingRouter); 
app.use('/api/appointments', appointmentRouter); 
app.use('/api/doctor_consultings', doctor_consultingRouter); 
app.use('/api/users', userRouter); 
app.use('/api/doctors', doctorRouter); 

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' });
});

await syncSchema();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

