import 'reflect-metadata';
import express from 'express';
import { orm, syncSchema } from './shared/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { specialtyRouter } from './specialty/specialty.routes.js';
import { treatmentRouter } from './treatment/treatment.routes.js';
import { consultingRouter } from './consulting/consulting.route.js';
import { appointmentRouter } from './appointment/appointment.routes.js';
import { doctor_consultingRouter } from './doctor_consulting/doctor_consulting.routes.js';
import { follow_upRouter } from './follow_up/follow_up.routes.js';
import { followup_treatmentRouter } from './followup_treatment/followup_treatment.routes.js';
import { time_tableRouter } from './time_table/time_table.routes.js';
import { userRouter } from './user/user.routes.js';

const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});
/*
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});*/

app.use('/api/specialties', specialtyRouter); //listop
app.use('/api/treatments', treatmentRouter); //listop
app.use('/api/consultings', consultingRouter); //listop
app.use('/api/appointments', appointmentRouter); //listop
app.use('/api/doctor_consultings', doctor_consultingRouter); //listop
app.use('/api/follow_ups', follow_upRouter); //listop
app.use('/api/followup_treatments', followup_treatmentRouter); //listop
app.use('/api/time_tables', time_tableRouter); //listop
app.use('/api/users', userRouter); //listop

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' });
});

await syncSchema();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
