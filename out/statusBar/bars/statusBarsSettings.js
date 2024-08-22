"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandsNames_1 = require("../../model/commandsNames");
const vscode = require("vscode");
let statusBarsSettings = [
    {
        name: "root",
        text: "$(terminal) root",
        tooltip: "Create a new terimanl to the root.\nToggle visibility by pressing F1 and select 'Toggle visibility of root teriminal'",
        command: commandsNames_1.commandsNames.createRootTerminal,
        F1command: commandsNames_1.commandsNames.ToggleRootTerminal,
        initVisibility: false,
        priority: 0
    },
    {
        name: "current",
        text: "$(terminal) current",
        tooltip: "Create a new terimanl to the current folder.\nToggle visibility by pressing F1 and select 'Toggle visibility of current teriminal'",
        command: commandsNames_1.commandsNames.openInTerminal,
        F1command: commandsNames_1.commandsNames.ToggleCurrentTerminal,
        initVisibility: false,
        priority: 0
    },
    {
        name: "edit",
        text: "|$(settings)|",
        tooltip: "Open json that is responsible about the custom terminal actions.\nToggle visibility by pressing F1 and select 'Toggle visibility of edit json button' ",
        command: commandsNames_1.commandsNames.editConfigurationFile,
        F1command: commandsNames_1.commandsNames.ToggleEditStatusBar,
        initVisibility: false,
        priority: 9999999,
        alignment: vscode.StatusBarAlignment.Right
    }
];
exports.default = statusBarsSettings;
//# sourceMappingURL=statusBarsSettings.js.map