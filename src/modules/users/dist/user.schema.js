"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.User = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("@nestjs/mongoose");
var role_enum_1 = require("../../enums/role.enum");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        mongoose_2.Prop({ maxlength: 64, required: true })
    ], User.prototype, "firstName");
    __decorate([
        mongoose_2.Prop({ maxlength: 64, required: true })
    ], User.prototype, "lastName");
    __decorate([
        mongoose_2.Prop({ maxlength: 64 })
    ], User.prototype, "businessName");
    __decorate([
        mongoose_2.Prop({ maxlength: 192, required: true })
    ], User.prototype, "address");
    __decorate([
        mongoose_2.Prop({ maxlength: 64 })
    ], User.prototype, "city");
    __decorate([
        mongoose_2.Prop({ maxlength: 64 })
    ], User.prototype, "region");
    __decorate([
        mongoose_2.Prop({ nullable: true, maxlength: 100 })
    ], User.prototype, "email");
    __decorate([
        mongoose_2.Prop({ nullable: true, maxlength: 100 })
    ], User.prototype, "password");
    __decorate([
        mongoose_2.Prop()
    ], User.prototype, "refreshToken");
    __decorate([
        mongoose_2.Prop({ unique: true, maxlength: 15, required: true })
    ], User.prototype, "phoneNumber");
    __decorate([
        mongoose_2.Prop({ type: String, "enum": role_enum_1.Role, "default": role_enum_1.Role.MERCHANT })
    ], User.prototype, "role");
    __decorate([
        mongoose_2.Prop({ type: mongoose_1.Types.ObjectId })
    ], User.prototype, "shopId");
    __decorate([
        mongoose_2.Prop({ "default": true })
    ], User.prototype, "isActive");
    __decorate([
        mongoose_2.Prop({ "default": 'defaultavatar.png' })
    ], User.prototype, "photo");
    __decorate([
        mongoose_2.Prop({ maxlength: 40, required: true })
    ], User.prototype, "userQrCode");
    __decorate([
        mongoose_2.Prop({ maxlength: 255 })
    ], User.prototype, "note");
    __decorate([
        mongoose_2.Prop()
    ], User.prototype, "firstVisit");
    __decorate([
        mongoose_2.Prop()
    ], User.prototype, "lastVisit");
    __decorate([
        mongoose_2.Prop({ "default": 0 })
    ], User.prototype, "totalVisits");
    __decorate([
        mongoose_2.Prop({ "default": 0 })
    ], User.prototype, "totalSpent");
    __decorate([
        mongoose_2.Prop({ "default": 0 })
    ], User.prototype, "totalPoints");
    User = __decorate([
        mongoose_2.Schema({ collection: 'users' })
    ], User);
    return User;
}());
exports.User = User;
exports.UserSchema = mongoose_2.SchemaFactory.createForClass(User).set('versionKey', false);
