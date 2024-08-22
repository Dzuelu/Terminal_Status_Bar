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
const vscode = require("vscode");
const commandsNames_1 = require("../model/commandsNames");
const handleTerminals_1 = require("./handleTerminals");
class Terminal {
    constructor() {
        this.registryCommandForNameOrId = (context) => {
            this.InitGlobalValueOfHasIdAsName(context);
            context.subscriptions.push(vscode.commands.registerCommand(commandsNames_1.commandsNames.HasIdAsNameTerminal, () => this.HasIdasNameCommand(context)));
        };
        this.onDidCloseTerminal = (terminal) => {
            handleTerminals_1.handleTerminals.dispose(terminal._id);
        };
        this.concatTerminals = (context) => __awaiter(this, void 0, void 0, function* () {
            handleTerminals_1.handleTerminals.addIfIsNotThere(vscode.window.terminals, context.globalState.get(commandsNames_1.commandsNames.HasIdAsNameTerminal, true));
        });
    }
    HasIdasNameCommand(context) {
        context.globalState.update(commandsNames_1.commandsNames.HasIdAsNameTerminal, !context.globalState.get(commandsNames_1.commandsNames.HasIdAsNameTerminal, true));
        handleTerminals_1.handleTerminals.switchNameAndId(context.globalState.get(commandsNames_1.commandsNames.HasIdAsNameTerminal, false));
    }
    InitGlobalValueOfHasIdAsName(context) {
        context.globalState.update(commandsNames_1.commandsNames.HasIdAsNameTerminal, context.globalState.get(commandsNames_1.commandsNames.HasIdAsNameTerminal, true));
    }
}
exports.terminals = new Terminal();
//# sourceMappingURL=terminal.js.map