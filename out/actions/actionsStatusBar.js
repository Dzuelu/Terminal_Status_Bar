"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const actionTerminal_1 = require("./actionTerminal");
class ActionsStatusBar {
    constructor(context, statusBarsSettings) {
        this.context = context;
        this.statusBars = {};
        this.Build(statusBarsSettings);
    }
    Build(statusBarsSettings) {
        statusBarsSettings.forEach(s => {
            this.createActionTerminal(s);
            this.registryTheCommands(s);
        });
    }
    createActionTerminal(s) {
        this.statusBars[s.name] = new actionTerminal_1.ActionTerminal(s.name, this.context, s.priority, s.alignment || vscode.StatusBarAlignment.Left);
    }
    registryTheCommands(s) {
        vscode.commands.registerCommand(s.command, () => {
            this.makeCommadForStatusBarBy(s.name);
        });
    }
    makeCommadForStatusBarBy(name) {
        this.statusBars[name].setVisibility(true);
    }
    createStatusBar(e) {
        this.statusBars[e.name].StatusBar.text = e.text;
        this.statusBars[e.name].StatusBar.tooltip = e.tooltip;
        this.statusBars[e.name].StatusBar.command = e.command;
        this.statusBars[e.name].setVisibility(e.initVisibility);
    }
}
exports.ActionsStatusBar = ActionsStatusBar;
//# sourceMappingURL=actionsStatusBar.js.map