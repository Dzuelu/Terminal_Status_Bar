"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const statusBar_1 = require("./statusBar");
class BuildStatusBar {
    constructor(context, statusBarsSettings) {
        this.context = context;
        this.statusBars = {};
        this.Build(statusBarsSettings);
    }
    Build(statusBarsSettings) {
        statusBarsSettings.forEach(s => {
            this.createActionTerminal(s);
            this.registryTheCommands(s);
            this.createStatusBar(s);
        });
    }
    createActionTerminal(s) {
        this.statusBars[s.name] = new statusBar_1.StatusBar(s.name, this.context, s.priority, s.alignment || vscode.StatusBarAlignment.Left);
    }
    registryTheCommands(s) {
        vscode.commands.registerCommand(s.F1command, () => {
            this.statusBars[s.name].setVisibility(true);
        });
    }
    createStatusBar(e) {
        this.statusBars[e.name].StatusBar.text = e.text;
        this.statusBars[e.name].StatusBar.tooltip = e.tooltip;
        this.statusBars[e.name].StatusBar.command = e.command;
        this.statusBars[e.name].setVisibility(e.initVisibility);
    }
}
exports.BuildStatusBar = BuildStatusBar;
//# sourceMappingURL=buildStatusBar.js.map