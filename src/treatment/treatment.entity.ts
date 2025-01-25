import {
  Cascade,
  Collection,
  Entity,
  Property,
  OneToMany,
} from '@mikro-orm/core';
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
  @Property({ nullable: false, default: true })
  vigency!: boolean;
  @OneToMany(
    () => Followup_treatment,
    (followup_treatment) => followup_treatment.treatment,
    {
      cascade: [Cascade.ALL],
    }
  )
  follow_ups = new Collection<Followup_treatment>(this);
}
