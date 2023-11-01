"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            description: "firstName",
            example: 'Jones'
        })
    ], CreateUserDto.prototype, "firstName");
    __decorate([
        swagger_1.ApiProperty({
            description: "lastName",
            example: 'Show'
        })
    ], CreateUserDto.prototype, "lastName");
    __decorate([
        swagger_1.ApiProperty({
            description: "phoneNumber",
            example: '+998997811356'
        })
    ], CreateUserDto.prototype, "phoneNumber");
    __decorate([
        swagger_1.ApiProperty({
            description: "Password",
            example: 'dsk_45lldD&'
        })
    ], CreateUserDto.prototype, "password");
    __decorate([
        swagger_1.ApiProperty({
            description: "role",
            example: 'merchant'
        })
    ], CreateUserDto.prototype, "role");
    __decorate([
        swagger_1.ApiProperty({
            description: "address",
            example: 'Toshkent Chorsu 1 street'
        })
    ], CreateUserDto.prototype, "address");
    __decorate([
        swagger_1.ApiProperty({
            description: "userQrCode",
            example: 'dsk_45llsd'
        })
    ], CreateUserDto.prototype, "userQrCode");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
