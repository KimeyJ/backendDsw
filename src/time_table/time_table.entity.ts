import { Entity,Property, ManyToOne } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
  
@Entity()
  export class Time_table extends BaseEntity {
    @Property({ nullable: false })
    day_time!: string
  
    @Property({ nullable: false })
    vigDate!: boolean
  
    
  }