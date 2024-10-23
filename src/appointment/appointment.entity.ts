import { Entity, Property, Collection, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { User } from '../user/user.entity.js';
import { Doctor } from '../doctor/doctor.entity.js';

@Entity()
export class Appointment extends BaseEntity {
  @Property({ nullable: false, unique: false })
  appoDate!: Date;
  @Property({ nullable: true, unique: false })
  assisted!: boolean;
  @ManyToOne(() => Doctor, { nullable: false })
  doctor!: Rel<Doctor>;
  @ManyToOne(() => User, { nullable: false })
  patient!: Rel<User>;
}
