import {
  Entity,
  Property,
  ManyToMany,
  Cascade,
  ManyToOne,
  Rel,
  OneToMany,
  Collection,
  PrimaryKey,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Specialty } from '../specialty/specialty.entity.js';
import { Follow_up } from '../follow_up/follow_up.entity.js';
import { Appointment } from '../appointment/appointment.entity.js';
import { Doctor_consulting } from '../doctor_consulting/doctor_consulting.entity.js';

@Entity()
export class User extends BaseEntity {
  @Property({ nullable: false, unique: true })
  dni!: string;

  @Property({ nullable: false })
  firstName!: string;

  @Property({ nullable: false })
  lastName!: string;

  @Property({ nullable: false })
  email!: string;

  @Property({ nullable: false })
  password!: string;

  @Property({ nullable: false })
  age!: number;

  @Property({ nullable: false })
  codUser!: number;

  @OneToMany(() => Follow_up, (follow_up) => follow_up.patient, {
    cascade: [Cascade.ALL],
  })
  follow_up = new Collection<User>(this);
  @OneToMany(() => Appointment, (appointment) => appointment.patient, {
    cascade: [Cascade.ALL],
  })
  appos = new Collection<Appointment>(this);
}
