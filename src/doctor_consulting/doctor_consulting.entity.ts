import {
  Entity,
  Property,
  Collection,
  ManyToOne,
  Rel,
  OneToMany,
  Cascade,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Consulting } from '../consulting/consulting.entity.js';
import { Time_table } from '../time_table/time_table.entity.js';
import { Doctor } from '../doctor/doctor.entity.js';

@Entity()
export class Doctor_consulting extends BaseEntity {
  @Property()
  //True -> el doctor sigue atendiendo en ese consultorio
  //False -> el doctor no sigue atendiendo en ese consultorio
  vigency!: boolean;
  //---------------------------------------------------------
  @ManyToOne(() => Doctor, { nullable: false })
  doctor!: Rel<Doctor>;
  @ManyToOne(() => Consulting, { nullable: false })
  consulting!: Rel<Consulting>;
  @OneToMany(() => Time_table, (time_table) => time_table.doctor_consulting, {
    cascade: [Cascade.ALL],
  })
  time_tables = new Collection<Time_table>(this);
}
