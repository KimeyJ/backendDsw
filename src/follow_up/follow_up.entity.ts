import {
  Entity,
  Property,
  Cascade,
  ManyToOne,
  Rel,
  Collection,
  OneToMany,
} from '@mikro-orm/core';
import { User } from '../user/user.entity.js';
import { Treatment } from '../treatment/treatment.entity.js';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Followup_treatment } from '../followup_treatment/followup_treatment.entity.js';
@Entity()
export class Follow_up extends BaseEntity {
  @Property({ nullable: false })
  fdate!: Date;

  @Property({ nullable: true })
  observations!: string;

  @ManyToOne(() => User, { nullable: false })
  patient!: Rel<User>;

  @OneToMany(
    () => Followup_treatment,
    (followup_treatment) => followup_treatment.follow,
    {
      cascade: [Cascade.ALL],
    }
  )
  treatments = new Collection<Followup_treatment>(this);
}
