import * as vscode from 'vscode';
import * as terminalCommands from './terminal/init';
import * as actionsCommands from './statusBar/init';
import * as actionsCustomCommands from './customActions/customActionsInit';

export function activate(context: vscode.ExtensionContext) {
  actionsCommands.default(context);
  terminalCommands.default(context);
  actionsCustomCommands.default(context);
}

export function deactivate() {}
