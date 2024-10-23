var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { User } from '../user/user.entity.js';
import { Doctor } from '../doctor/doctor.entity.js';
export let Appointment = class Appointment extends BaseEntity {
};
__decorate([
    Property({ nullable: false, unique: false }),
    __metadata("design:type", Date)
], Appointment.prototype, "appoDate", void 0);
__decorate([
    Property({ nullable: true, unique: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "assisted", void 0);
__decorate([
    ManyToOne(() => Doctor, { nullable: false }),
    __metadata("design:type", Object)
], Appointment.prototype, "doctor", void 0);
__decorate([
    ManyToOne(() => User, { nullable: false }),
    __metadata("design:type", Object)
], Appointment.prototype, "patient", void 0);
Appointment = __decorate([
    Entity()
], Appointment);
//# sourceMappingURL=appointment.entity.js.map