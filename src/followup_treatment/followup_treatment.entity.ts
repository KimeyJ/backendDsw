import {
  Entity,
  Property,
  ManyToMany,
  Cascade,
  ManyToOne,
  Rel,
  Collection,
} from '@mikro-orm/core';
import { Follow_up } from '../follow_up/follow_up.entity.js';
import { Treatment } from '../treatment/treatment.entity.js';
import { BaseEntity } from '../shared/baseEntity.entity.js';

@Entity()
export class Followup_treatment extends BaseEntity {
  @ManyToOne(() => Follow_up, { nullable: false })
  follow!: Rel<Follow_up>;
  @ManyToOne(() => Treatment, { nullable: false })
  treatment!: Rel<Treatment>;
}
