"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusinessModule = void 0;
var common_1 = require("@nestjs/common");
var business_service_1 = require("./business.service");
var business_controller_1 = require("./business.controller");
var mongoose_1 = require("@nestjs/mongoose");
var business_schema_1 = require("./business.schema");
var shops_service_1 = require("../shops/shops.service");
var shop_schema_1 = require("../shops/shop.schema");
var BusinessModule = /** @class */ (function () {
    function BusinessModule() {
    }
    BusinessModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: business_schema_1.Business.name, schema: business_schema_1.BusinessSchema }]),
                mongoose_1.MongooseModule.forFeature([{ name: shop_schema_1.Shop.name, schema: shop_schema_1.ShopSchema }])
            ],
            controllers: [business_controller_1.BusinessController],
            exports: [business_service_1.BusinessService],
            providers: [business_service_1.BusinessService, shops_service_1.ShopsService]
        })
    ], BusinessModule);
    return BusinessModule;
}());
exports.BusinessModule = BusinessModule;
