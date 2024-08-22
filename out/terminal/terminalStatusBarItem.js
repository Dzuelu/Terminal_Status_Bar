"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const commandsNames_1 = require("../model/commandsNames");
class TerminalStatusBarItem {
    constructor(terminal, reg, hasIdAsName) {
        this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -1);
        hasIdAsName = true;
        this._terminal = terminal;
        this.createStatusBarItem(hasIdAsName);
        this.addWatchIconWhenTerminalIsBusy(terminal);
        this._registerCommand = reg;
    }
    show() {
        this._terminal.show();
    }
    createStatusBarItem(hasIdAsName) {
        if (hasIdAsName) {
            // @ts-ignore
            this.setupStatusBarItem(this._terminal.__id__, this._terminal.__id__);
        }
        else {
            // @ts-ignore
            this.setupStatusBarItem(this._terminal.name, this._terminal.__id__);
        }
    }
    setupStatusBarItem(name, id) {
        this._statusBarItem.text = `$(terminal) ${name}`;
        this._statusBarItem.tooltip =
            'Open the terminal \nToggle name by pressing F1 and select "Terminal Status Bar: Toogle appellation of terminal(name or id)"';
        this._statusBarItem.command = commandsNames_1.commandsNames.showTerminal + id;
        this._statusBarItem.show();
    }
    /*
      Show an watch icon when the terminal do something.
    */
    addWatchIconWhenTerminalIsBusy(terminal) {
        let delayTimeout = null;
        return;
        // @ts-ignore
        terminal.onDidWriteData(data => {
            if (!this._statusBarItem.text.endsWith('$(watch)')) {
                this._statusBarItem.text = this._statusBarItem.text + '$(watch)';
            }
            clearTimeout(delayTimeout);
            delayTimeout = setTimeout(() => {
                if (this._statusBarItem.text.endsWith('$(watch)')) {
                    this._statusBarItem.text = this._statusBarItem.text.replace('$(watch)', '');
                }
            }, 300);
        });
    }
    changeName(hasIdAsName) {
        if (hasIdAsName) {
            // @ts-ignore
            this._statusBarItem.text = `$(terminal) ${this._terminal.__id__}`;
        }
        else {
            this._statusBarItem.text = `$(terminal) ${this._terminal.name}`;
        }
    }
    dispose() {
        this._statusBarItem.dispose();
        this._terminal.dispose();
        this._registerCommand.dispose();
    }
}
exports.TerminalStatusBarItem = TerminalStatusBarItem;
//# sourceMappingURL=terminalStatusBarItem.js.map