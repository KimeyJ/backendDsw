import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { Specialty } from '../specialty/specialty.entity.js';
import { BaseEntity } from '../shared/baseEntity.entity.js';

@Entity()
export class Specialty_price extends BaseEntity {
  @Property({ nullable: false })
  vigDate!: Date;

  @Property({ nullable: false, type: 'decimal', precision: 10, scale: 4 })
  cost!: number;

  @ManyToOne(() => Specialty, { nullable: false })
  specialty!: Rel<Specialty>;
}
