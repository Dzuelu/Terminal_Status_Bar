"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const terminal_1 = require("./terminal");
function activate(context) {
    context.subscriptions.push(vscode.window.onDidOpenTerminal((terminal) => {
        terminal_1.terminals.concatTerminals(context);
    }));
    context.subscriptions.push(vscode.window.onDidCloseTerminal((terminal) => {
        terminal_1.terminals.onDidCloseTerminal(terminal);
    }));
    context.subscriptions.push(vscode.window.onDidChangeActiveTerminal((terminal) => {
        terminal_1.terminals.concatTerminals(context);
    }));
    terminal_1.terminals.concatTerminals(context);
    terminal_1.terminals.registryCommandForNameOrId(context);
}
exports.default = activate;
//# sourceMappingURL=init.js.map