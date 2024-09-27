import {
  Cascade,
  Collection,
  Entity,
  Property,
  OneToMany,
  ManyToMany,
} from '@mikro-orm/core';
import { Follow_up } from '../follow_up/follow_up.entity.js';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Followup_treatment } from '../followup_treatment/followup_treatment.entity.js';

@Entity()
export class Treatment extends BaseEntity {
  @Property({ nullable: false, unique: true })
  name!: string;
  @Property()
  description!: string;
  @Property({ nullable: false, type: 'decimal', precision: 10, scale: 4 })
  price!: number;
  @OneToMany(
    () => Followup_treatment,
    (followup_treatment) => followup_treatment.treatment,
    {
      cascade: [Cascade.ALL],
    }
  )
  follow_ups = new Collection<Followup_treatment>(this);
}
