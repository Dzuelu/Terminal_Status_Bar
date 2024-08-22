import { commandsNames } from "../../model/commandsNames";
import * as vscode from "vscode";
import { getRealPath } from "../../utils/path.utils";
import * as modulePath from 'path';
console.log("here");
vscode.commands.registerCommand(commandsNames.openInTerminal, () => {
    try {
        let path = getRealPath('current');
        const terminal = vscode.window.createTerminal({
            name: modulePath.basename(path),
            cwd: path
        });
        terminal.show();
    } catch {
        vscode.window.showInformationMessage('No file with focus found to open');
    }
});

vscode.commands.registerCommand(
    commandsNames.createRootTerminal,
    () => {
        vscode.window.createTerminal("root").show();
    }
);