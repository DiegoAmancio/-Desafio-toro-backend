/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/adapters/in/adapter.in.module.ts":
/*!**********************************************!*\
  !*** ./src/adapters/in/adapter.in.module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdapterInModule = void 0;
const application_module_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@application/application.module'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const auth_controller_1 = __webpack_require__(/*! ./controllers/auth.controller */ "./src/adapters/in/controllers/auth.controller.ts");
const wallet_controller_1 = __webpack_require__(/*! ./controllers/wallet.controller */ "./src/adapters/in/controllers/wallet.controller.ts");
const user_interceptor_1 = __webpack_require__(/*! ./interceptor/user.interceptor */ "./src/adapters/in/interceptor/user.interceptor.ts");
let AdapterInModule = class AdapterInModule {
};
AdapterInModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ isGlobal: true }), application_module_1.ApplicationModule],
        controllers: [wallet_controller_1.WalletController, auth_controller_1.AuthController],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: user_interceptor_1.UserInterceptor,
            },
        ],
    })
], AdapterInModule);
exports.AdapterInModule = AdapterInModule;


/***/ }),

/***/ "./src/adapters/in/controllers/auth.controller.ts":
/*!********************************************************!*\
  !*** ./src/adapters/in/controllers/auth.controller.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const auth_interface_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@application/in/auth.interface'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const enums_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'domain/enums'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(headers) {
        return this.authService.login(headers.token);
    }
};
__decorate([
    (0, common_1.Get)('login'),
    __param(0, (0, common_2.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)(enums_1.Providers.I_AUTH_SERVICE)),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_interface_1.IAuthService !== "undefined" && auth_interface_1.IAuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./src/adapters/in/controllers/wallet.controller.ts":
/*!**********************************************************!*\
  !*** ./src/adapters/in/controllers/wallet.controller.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletController = void 0;
const in_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@application/in'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const jwt_auth_guard_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@application/jwt/jwt-auth.guard'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const dto_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'domain/dto'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const enums_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'domain/enums'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
let WalletController = class WalletController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    getWallet(req) {
        return this.accountService.getWallet(req.user.id);
    }
    getTopFiveStocks() {
        return this.accountService.getTopFiveStocks();
    }
    orderStocks(orderStock, req) {
        return this.accountService.orderStocks(orderStock, req.user.id);
    }
};
__decorate([
    (0, common_1.Get)('userPosition'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], WalletController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Get)('trends'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], WalletController.prototype, "getTopFiveStocks", null);
__decorate([
    (0, common_1.Post)('order'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.OrderPositionDTO !== "undefined" && dto_1.OrderPositionDTO) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], WalletController.prototype, "orderStocks", null);
WalletController = __decorate([
    (0, common_1.Controller)(''),
    __param(0, (0, common_1.Inject)(enums_1.Providers.I_ACCOUNT_SERVICE)),
    __metadata("design:paramtypes", [typeof (_a = typeof in_1.IWalletService !== "undefined" && in_1.IWalletService) === "function" ? _a : Object])
], WalletController);
exports.WalletController = WalletController;


/***/ }),

/***/ "./src/adapters/in/interceptor/user.interceptor.ts":
/*!*********************************************************!*\
  !*** ./src/adapters/in/interceptor/user.interceptor.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserInterceptor = void 0;
const auth_interface_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@application/in/auth.interface'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const enums_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'domain/enums'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
let UserInterceptor = class UserInterceptor {
    constructor(authService) {
        this.authService = authService;
        this.getTokenFromAuthorization = (authorization = '') => {
            const split = authorization.split(' ');
            return split[1];
        };
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const item = await this.authService.getUserByToken(this.getTokenFromAuthorization(request.headers.authorization));
        request.user = item;
        return next.handle();
    }
};
UserInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(enums_1.Providers.I_AUTH_SERVICE)),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_interface_1.IAuthService !== "undefined" && auth_interface_1.IAuthService) === "function" ? _a : Object])
], UserInterceptor);
exports.UserInterceptor = UserInterceptor;


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handler = void 0;
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const helmet_1 = __webpack_require__(/*! helmet */ "helmet");
const adapter_in_module_1 = __webpack_require__(/*! ./adapters/in/adapter.in.module */ "./src/adapters/in/adapter.in.module.ts");
let server;
async function bootstrap() {
    const app = await core_1.NestFactory.create(adapter_in_module_1.AdapterInModule);
    app.enableCors();
    if (process.env.INIT_HELMET === 'true') {
        app.use((0, helmet_1.default)({
            contentSecurityPolicy:  false ? 0 : false,
        }));
    }
    await app.listen(process.env.PORT, () => console.log('App running on port', process.env.PORT));
}
bootstrap();
const handler = async (event, context, callback) => {
    server = server !== null && server !== void 0 ? server : (await bootstrap());
    return server(event, context, callback);
};
exports.handler = handler;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=main.js.map