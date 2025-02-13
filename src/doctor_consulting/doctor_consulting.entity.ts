import {
  Entity,
  Property,
  Collection,
  ManyToOne,
  Rel,
  OneToMany,
  Cascade,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Consulting } from '../consulting/consulting.entity.js';
import { Doctor } from '../doctor/doctor.entity.js';

@Entity()
@Unique({properties: ['doctor','consulting']})
export class Doctor_consulting extends BaseEntity {
  @Property({ nullable: false, default: true })
  //True -> el doctor sigue atendiendo en ese consultorio
  //False -> el doctor no sigue atendiendo en ese consultorio
  vigency!: boolean;
  //---------------------------------------------------------
  @ManyToOne(() => Doctor, { nullable: false })
  doctor!: Rel<Doctor>;
  @ManyToOne(() => Consulting, { nullable: false })
  consulting!: Rel<Consulting>;
}
