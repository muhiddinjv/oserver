"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var UsersController = /** @class */ (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
    }
    UsersController.prototype.create = function (createUserDto) {
        return this.usersService.create(createUserDto);
    };
    UsersController.prototype.findAll = function () {
        return this.usersService.findAll();
    };
    UsersController.prototype.findById = function (id) {
        return this.usersService.findById(id);
    };
    UsersController.prototype.update = function (id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    };
    UsersController.prototype.remove = function (id) {
        return this.usersService.remove(id);
    };
    __decorate([
        swagger_1.ApiOperation({ summary: 'Method: Create New User' }),
        swagger_1.ApiOkResponse({
            description: 'The user was created successfully'
        }),
        swagger_1.ApiForbiddenResponse({ description: 'Unauthorized Request' }),
        common_1.Post(),
        __param(0, common_1.Body())
    ], UsersController.prototype, "create");
    __decorate([
        swagger_1.ApiOperation({ summary: 'Method: returns current user' }),
        swagger_1.ApiOkResponse({
            description: 'The user was returned successfully'
        }),
        swagger_1.ApiForbiddenResponse({ description: 'Unauthorized Request' }),
        common_1.Get()
    ], UsersController.prototype, "findAll");
    __decorate([
        swagger_1.ApiOperation({ summary: 'Method: returns one user' }),
        swagger_1.ApiOkResponse({
            description: 'The user was returned successfully'
        }),
        swagger_1.ApiForbiddenResponse({ description: 'Unauthorized Request' }),
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], UsersController.prototype, "findById");
    __decorate([
        swagger_1.ApiOperation({ summary: 'Method: Update current user' }),
        swagger_1.ApiOkResponse({
            description: 'The user was Uodated successfully'
        }),
        swagger_1.ApiForbiddenResponse({ description: 'Unauthorized Request' }),
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], UsersController.prototype, "update");
    __decorate([
        swagger_1.ApiOperation({ summary: 'Method: Delete current user' }),
        swagger_1.ApiOkResponse({
            description: 'The user was deleted successfully'
        }),
        swagger_1.ApiForbiddenResponse({ description: 'Unauthorized Request' }),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], UsersController.prototype, "remove");
    UsersController = __decorate([
        swagger_1.ApiTags('Users'),
        common_1.Controller('users')
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
