"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminalStatusBarItem_1 = require("./terminalStatusBarItem");
const vscode = require("vscode");
const commandsNames_1 = require("../model/commandsNames");
const clickListeningCommand_1 = require("./clickListeningCommand");
class HandleTerminals {
    constructor() {
        this._terminals = {};
        this.registerStatusBarCommand = (id) => {
            // add to context.subscriptions some way
            return vscode.commands.registerCommand(commandsNames_1.commandsNames.showTerminal + id, () => clickListeningCommand_1.clickListeningCommand(this, id));
        };
        console.log("oxi dio fors");
    }
    show(id) {
        this._terminals[id].show();
    }
    dispose(id) {
        this._terminals[id].dispose();
        delete this._terminals[id];
    }
    addIfIsNotThere(terminals, hasIdAsNameTerminal) {
        let notYetInitTerminals = terminals.filter((t) => {
            t.__id__ = t._id;
            return !this._terminals[t.__id__];
        });
        this.initilizeTerminals(notYetInitTerminals, hasIdAsNameTerminal);
    }
    initilizeTerminals(notYetInitTerminals, hasIdAsNameTerminal) {
        notYetInitTerminals.forEach((terminal) => {
            this._terminals[terminal.__id__] = new terminalStatusBarItem_1.TerminalStatusBarItem(terminal, this.registerStatusBarCommand(terminal.__id__), hasIdAsNameTerminal);
        });
    }
    switchNameAndId(HasIdAsNameTerminal) {
        for (let term in this._terminals) {
            this._terminals[term].changeName(HasIdAsNameTerminal);
        }
    }
    delete(id) {
        vscode.commands.executeCommand(commandsNames_1.commandsNames.buildInTerminalKill);
    }
}
exports.handleTerminals = new HandleTerminals();
//# sourceMappingURL=handleTerminals.js.map