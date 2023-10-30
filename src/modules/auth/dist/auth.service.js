"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcryptjs = require("bcryptjs");
var AuthService = /** @class */ (function () {
    function AuthService(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    AuthService.prototype.signUp = function (createUserDto) {
        return __awaiter(this, void 0, Promise, function () {
            var userExists, passwordPattern, hash, newUser, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findByPhoneNumber(createUserDto.phoneNumber)];
                    case 1:
                        userExists = _a.sent();
                        if (userExists) {
                            throw new common_1.BadRequestException('User already exists');
                        }
                        passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*]).{8,16}$/;
                        if (!passwordPattern.test(createUserDto.password)) {
                            throw new common_1.BadRequestException('Invalid password. It should meet the criteria.');
                        }
                        return [4 /*yield*/, this.hashData(createUserDto.password)];
                    case 2:
                        hash = _a.sent();
                        return [4 /*yield*/, this.userService.create(__assign(__assign({}, createUserDto), { password: hash }))];
                    case 3:
                        newUser = _a.sent();
                        return [4 /*yield*/, this.getTokens(newUser._id, newUser.phoneNumber)];
                    case 4:
                        tokens = _a.sent();
                        return [4 /*yield*/, this.updateRefreshToken(newUser._id, tokens.refreshToken)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, tokens];
                }
            });
        });
    };
    AuthService.prototype.signIn = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordMatches, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findByPhoneNumber(data.phoneNumber)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.BadRequestException('User does not exist');
                        return [4 /*yield*/, bcryptjs.compare(data.password, user.password)];
                    case 2:
                        passwordMatches = _a.sent();
                        if (!passwordMatches)
                            throw new common_1.BadRequestException('Password is incorrect');
                        return [4 /*yield*/, this.getTokens(user._id, user.phoneNumber)];
                    case 3:
                        tokens = _a.sent();
                        return [4 /*yield*/, this.updateRefreshToken(user._id, tokens.refreshToken)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, tokens];
                }
            });
        });
    };
    AuthService.prototype.logout = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.update(userId, { refreshToken: null })];
            });
        });
    };
    AuthService.prototype.hashData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var salt;
            return __generator(this, function (_a) {
                salt = bcryptjs.genSaltSync(10);
                return [2 /*return*/, bcryptjs.hashSync(data, salt)];
            });
        });
    };
    AuthService.prototype.updateRefreshToken = function (userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedRefreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hashData(refreshToken)];
                    case 1:
                        hashedRefreshToken = _a.sent();
                        return [4 /*yield*/, this.userService.update(userId, {
                                refreshToken: hashedRefreshToken
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getTokens = function (userId, phoneNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, access_token, refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.jwtService.signAsync({
                                sub: userId,
                                phoneNumber: phoneNumber
                            }, {
                                secret: this.configService.get('JWT_ACCESS_SECRET'),
                                expiresIn: '15m'
                            }),
                            this.jwtService.signAsync({
                                sub: userId,
                                phoneNumber: phoneNumber
                            }, {
                                secret: this.configService.get('JWT_REFRESH_SECRET'),
                                expiresIn: '7d'
                            }),
                        ])];
                    case 1:
                        _a = _b.sent(), access_token = _a[0], refreshToken = _a[1];
                        return [2 /*return*/, {
                                access_token: access_token,
                                refreshToken: refreshToken
                            }];
                }
            });
        });
    };
    AuthService.prototype.refreshTokens = function (userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var user, refreshTokenMatches, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user || !user.refreshToken)
                            throw new common_1.ForbiddenException('Access Denied');
                        return [4 /*yield*/, bcryptjs.compare(user.refreshToken, refreshToken)];
                    case 2:
                        refreshTokenMatches = _a.sent();
                        if (!refreshTokenMatches)
                            throw new common_1.ForbiddenException('Access Denied');
                        return [4 /*yield*/, this.getTokens(user.id, user.phoneNumber)];
                    case 3:
                        tokens = _a.sent();
                        return [4 /*yield*/, this.updateRefreshToken(user.id, tokens.refreshToken)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, tokens];
                }
            });
        });
    };
    AuthService = __decorate([
        common_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
