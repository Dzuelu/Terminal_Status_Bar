import { commandsNames } from '../../model/commandsNames';
import * as vscode from 'vscode';
import { getRealPath } from '../../utils/path.utils';
import * as modulePath from 'path';

vscode.commands.registerCommand(commandsNames.openInTerminal, () => {
  try {
    const path = getRealPath('current');
    const terminal = vscode.window.createTerminal({
      cwd: path,
      name: modulePath.basename(path)
    });
    terminal.show();
  } catch {
    vscode.window.showInformationMessage('No file with focus found to open');
  }
});

vscode.commands.registerCommand(commandsNames.createRootTerminal, () => {
  vscode.window.createTerminal('root').show();
});
