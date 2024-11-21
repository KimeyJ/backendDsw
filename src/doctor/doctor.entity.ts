import {Entity,Property,ManyToOne,Rel,OneToMany,Cascade,Collection} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Specialty } from '../specialty/specialty.entity.js';
import { Appointment } from '../appointment/appointment.entity.js';
import { Doctor_consulting } from '../doctor_consulting/doctor_consulting.entity.js';




@Entity() export class Doctor extends BaseEntity {

    @Property({nullable: false})
    firstName!:string;
    
    @Property({nullable: false})
    lastName!:string;

    @Property({ nullable: false })
    email!: string;

    @Property({ nullable: false })
    password!: string;

    @Property({ nullable: false })
    age!: number;

    @Property({nullable: false, unique: true})
    tuition_number!: number;

    @ManyToOne(() => Specialty, { nullable: false })
    specialty!: Rel<Specialty>;

    /*@OneToMany(() => Appointment, (appointment) => appointment.doctor, {
    cascade: [Cascade.ALL],})
    pendingAppo = new Collection<Appointment>(this);*/

    @OneToMany(() => Doctor_consulting,
    (doctor_consulting) => doctor_consulting.doctor,
    {
      cascade: [Cascade.ALL],
    }
    )
    consultings = new Collection<Doctor_consulting>(this);
}