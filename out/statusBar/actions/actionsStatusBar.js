"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandsNames_1 = require("../../model/commandsNames");
const vscode = require("vscode");
const path_utils_1 = require("../../utils/path.utils");
const modulePath = require("path");
console.log("here");
vscode.commands.registerCommand(commandsNames_1.commandsNames.openInTerminal, () => {
    try {
        let path = path_utils_1.getRealPath('current');
        const terminal = vscode.window.createTerminal({
            name: modulePath.basename(path),
            cwd: path
        });
        terminal.show();
    }
    catch (_a) {
        vscode.window.showInformationMessage('No file with focus found to open');
    }
});
vscode.commands.registerCommand(commandsNames_1.commandsNames.createRootTerminal, () => {
    vscode.window.createTerminal("root").show();
});
//# sourceMappingURL=actionsStatusBar.js.map