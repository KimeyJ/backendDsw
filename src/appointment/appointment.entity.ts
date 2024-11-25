import { Entity, Property, Collection, ManyToOne, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { User } from '../user/user.entity.js';
import { Doctor_consulting } from '../doctor_consulting/doctor_consulting.entity.js';

@Entity()
export class Appointment extends BaseEntity {
  @Property({ nullable: false, unique: false })
  appoDate!: Date;
  @Property({type:'time', nullable: false, unique: false })
  appoTime!: Date;
  @Property({ nullable: true, unique: false })
  assisted!: boolean;
  @ManyToOne(() => Doctor_consulting, { nullable: false })
  doctor_consulting!: Rel<Doctor_consulting>;
  @ManyToOne(() => User, { nullable: false })
  patient!: Rel<User>;
}
