var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, OneToMany, Cascade, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Specialty } from '../specialty/specialty.entity.js';
import { Appointment } from '../appointment/appointment.entity.js';
import { Doctor_consulting } from '../doctor_consulting/doctor_consulting.entity.js';
let Doctor = class Doctor extends BaseEntity {
    constructor() {
        super(...arguments);
        this.pendingAppo = new Collection(this);
        this.consultings = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Doctor.prototype, "firstName", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Doctor.prototype, "lastName", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Doctor.prototype, "email", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Doctor.prototype, "password", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Doctor.prototype, "age", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", Number)
], Doctor.prototype, "tuition_number", void 0);
__decorate([
    ManyToOne(() => Specialty, { nullable: false }),
    __metadata("design:type", Object)
], Doctor.prototype, "specialty", void 0);
__decorate([
    OneToMany(() => Appointment, (appointment) => appointment.doctor, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], Doctor.prototype, "pendingAppo", void 0);
__decorate([
    OneToMany(() => Doctor_consulting, (doctor_consulting) => doctor_consulting.doctor, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], Doctor.prototype, "consultings", void 0);
Doctor = __decorate([
    Entity()
], Doctor);
export { Doctor };
//# sourceMappingURL=doctor.entity.js.map