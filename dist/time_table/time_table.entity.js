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
import { Doctor_consulting } from '../doctor_consulting/doctor_consulting.entity.js';
let Time_table = class Time_table extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Time_table.prototype, "dayTime", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Date)
], Time_table.prototype, "vigDate", void 0);
__decorate([
    ManyToOne(() => Doctor_consulting, { nullable: false }),
    __metadata("design:type", Object)
], Time_table.prototype, "doctor_consulting", void 0);
Time_table = __decorate([
    Entity()
], Time_table);
export { Time_table };
//# sourceMappingURL=time_table.entity.js.map