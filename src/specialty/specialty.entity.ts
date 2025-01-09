import {
  Entity,
  Property,
  Collection,
  OneToMany,
  Cascade,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Doctor } from '../doctor/doctor.entity.js';

@Entity()
export class Specialty extends BaseEntity {
  @Property({ nullable: false, unique: true })
  name!: string;
  @Property({ nullable: false, default: true })
  vigency!: boolean;
  @OneToMany(() => Doctor, (doctor) => doctor.specialty, {
    cascade: [Cascade.ALL],
  })
  doctors = new Collection<Doctor>(this);
}
