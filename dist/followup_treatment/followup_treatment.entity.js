var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToOne, } from '@mikro-orm/core';
import { Follow_up } from '../follow_up/follow_up.entity.js';
import { Treatment } from '../treatment/treatment.entity.js';
import { BaseEntity } from '../shared/baseEntity.entity.js';
export let Followup_treatment = class Followup_treatment extends BaseEntity {
};
__decorate([
    ManyToOne(() => Follow_up, { nullable: false }),
    __metadata("design:type", Object)
], Followup_treatment.prototype, "follow", void 0);
__decorate([
    ManyToOne(() => Treatment, { nullable: false }),
    __metadata("design:type", Object)
], Followup_treatment.prototype, "treatment", void 0);
Followup_treatment = __decorate([
    Entity()
], Followup_treatment);
//# sourceMappingURL=followup_treatment.entity.js.map