import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Doctor_consulting } from '../doctor_consulting/doctor_consulting.entity.js';

@Entity()
export class Time_table extends BaseEntity {
  @Property({ type: 'time', nullable: false, unique: false })
  consultationTime!: String;

  @Property({ nullable: false, unique: false })
  vigency!: boolean;

  @ManyToOne(() => Doctor_consulting, { nullable: false })
  doctor_consulting!: Rel<Doctor_consulting>;
}
