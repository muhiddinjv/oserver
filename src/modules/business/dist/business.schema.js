"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusinessSchema = exports.Business = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("@nestjs/mongoose");
var Business = /** @class */ (function () {
    function Business() {
    }
    __decorate([
        mongoose_2.Prop({ maxlength: 120, required: true })
    ], Business.prototype, "name");
    __decorate([
        mongoose_2.Prop({ type: mongoose_1.Types.ObjectId })
    ], Business.prototype, "owner");
    __decorate([
        mongoose_2.Prop({ type: [] })
    ], Business.prototype, "employees");
    __decorate([
        mongoose_2.Prop({ type: [] })
    ], Business.prototype, "role");
    __decorate([
        mongoose_2.Prop({ type: [{ type: mongoose_1.Types.ObjectId }] })
    ], Business.prototype, "shops");
    __decorate([
        mongoose_2.Prop({ type: Date, "default": Date.now })
    ], Business.prototype, "createdAt");
    __decorate([
        mongoose_2.Prop({ type: Date, "default": Date.now })
    ], Business.prototype, "updatedAt");
    Business = __decorate([
        mongoose_2.Schema({ collection: 'business' })
    ], Business);
    return Business;
}());
exports.Business = Business;
exports.BusinessSchema = mongoose_2.SchemaFactory.createForClass(Business).set('versionKey', false);
