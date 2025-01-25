import {
  Entity,
  Property,
  Collection,
  OneToMany,
  Cascade,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Doctor_consulting } from '../doctor_consulting/doctor_consulting.entity.js';

@Entity()
@Unique({properties: ['street','street_number']})
export class Consulting extends BaseEntity {
  @Property({ nullable: false })
  street!: string;

  @Property({ nullable: false })
  street_number!: number;

  @Property({ nullable: false, default: true })
  vigency!: boolean;

  @OneToMany(
    () => Doctor_consulting,
    (doctor_consulting) => doctor_consulting.consulting,
    {
      cascade: [Cascade.ALL],
    }
  )
  doctors = new Collection<Doctor_consulting>(this);
}
