import {
  Entity,
  Property,
  Cascade,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Appointment } from '../appointment/appointment.entity.js';

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

  @OneToMany(() => Appointment, (appointment) => appointment.patient, {
    cascade: [Cascade.ALL],
  })
  appos = new Collection<Appointment>(this);
}
