import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Doctor_consulting } from '../doctor_consulting/doctor_consulting.entity.js';

@Entity()
export class Time_table extends BaseEntity {
  @Property({ nullable: false })
  dayTime!: string;

  @Property({ nullable: false })
  vigDate!: Date;

  @ManyToOne(() => Doctor_consulting, { nullable: false })
  doctor_consulting!: Rel<Doctor_consulting>;
}
