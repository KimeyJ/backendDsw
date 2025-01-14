import {
  Entity,
  Property,
  Collection,
  ManyToMany,
  Rel,
  OneToMany,
  Cascade,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Doctor } from '../doctor/doctor.entity.js';
import { Doctor_consulting } from '../doctor_consulting/doctor_consulting.entity.js';

@Entity()
export class Consulting extends BaseEntity {
  @Property({ nullable: false })
  street!: string;

  @Property({ nullable: false })
  street_number!: number;

  @Property({ nullable: false, default: true })
  vigency!: boolean;

  @OneToMany(
    () => Doctor_consulting,
    (doctor_consulting) => doctor_consulting.consulting,
    {
      cascade: [Cascade.ALL],
    }
  )
  doctors = new Collection<Doctor_consulting>(this);
}
