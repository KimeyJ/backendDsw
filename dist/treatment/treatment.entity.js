var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Cascade, Collection, Entity, Property, OneToMany, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Followup_treatment } from '../followup_treatment/followup_treatment.entity.js';
export let Treatment = class Treatment extends BaseEntity {
    constructor() {
        super(...arguments);
        this.follow_ups = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Treatment.prototype, "name", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], Treatment.prototype, "description", void 0);
__decorate([
    Property({ nullable: false, type: 'decimal', precision: 10, scale: 4 }),
    __metadata("design:type", Number)
], Treatment.prototype, "price", void 0);
__decorate([
    OneToMany(() => Followup_treatment, (followup_treatment) => followup_treatment.treatment, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], Treatment.prototype, "follow_ups", void 0);
Treatment = __decorate([
    Entity()
], Treatment);
//# sourceMappingURL=treatment.entity.js.map