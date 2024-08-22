"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildStatusBar_1 = require("./bars/buildStatusBar");
const statusBarsSettings_1 = require("./bars/statusBarsSettings");
require("./actions/actionsStatusBar");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const actionsStatusBar = new buildStatusBar_1.BuildStatusBar(context, statusBarsSettings_1.default);
    });
}
exports.default = activate;
//# sourceMappingURL=init.js.map