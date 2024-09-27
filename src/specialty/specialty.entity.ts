import {
  Entity,
  Property,
  Collection,
  OneToMany,
  Cascade,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { User } from '../user/user.entity.js';

@Entity()
export class Specialty extends BaseEntity {
  @Property({ nullable: false, unique: true })
  name!: string;

  @Property({ nullable: false, type: 'decimal', precision: 10, scale: 4 })
  price!: number;

  @OneToMany(() => User, (user) => user.specialty, {
    cascade: [Cascade.ALL],
  })
  doctors = new Collection<User>(this);
}
