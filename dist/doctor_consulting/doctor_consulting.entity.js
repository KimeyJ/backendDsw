var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, Collection, ManyToOne, OneToMany, Cascade, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Consulting } from '../consulting/consulting.entity.js';
import { Time_table } from '../time_table/time_table.entity.js';
import { Doctor } from '../doctor/doctor.entity.js';
let Doctor_consulting = class Doctor_consulting extends BaseEntity {
    constructor() {
        super(...arguments);
        this.time_tables = new Collection(this);
    }
};
__decorate([
    Property(),
    __metadata("design:type", Boolean)
], Doctor_consulting.prototype, "vigency", void 0);
__decorate([
    ManyToOne(() => Doctor, { nullable: false }),
    __metadata("design:type", Object)
], Doctor_consulting.prototype, "doctor", void 0);
__decorate([
    ManyToOne(() => Consulting, { nullable: false }),
    __metadata("design:type", Object)
], Doctor_consulting.prototype, "consulting", void 0);
__decorate([
    OneToMany(() => Time_table, (time_table) => time_table.doctor_consulting, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], Doctor_consulting.prototype, "time_tables", void 0);
Doctor_consulting = __decorate([
    Entity()
], Doctor_consulting);
export { Doctor_consulting };
//# sourceMappingURL=doctor_consulting.entity.js.map