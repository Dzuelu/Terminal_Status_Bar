import { StatusBarItem, window, StatusBarAlignment } from 'vscode';
import * as vscode from 'vscode';
import { commandsNames } from '../model/commandsNames';
import { CustomActionInfo } from '../model/configurationInfo';
import { getRealPath } from '../utils/path.utils';

class CustomActions {
  customStatusBars: StatusBarItem[] = [];

  private calculateTheCommandName(name: string) {
    return commandsNames.runInTerminal + name;
  }

  public removeAll() {
    this.customStatusBars.forEach((actionsInfo: StatusBarItem) => {
      actionsInfo.dispose();
    });
  }

  public add(customActionInfo: CustomActionInfo) {
    const newAction = window.createStatusBarItem(StatusBarAlignment.Right, 99999999);
    newAction.text = `$(terminal) ${customActionInfo.name}`;
    newAction.tooltip = `path: ${customActionInfo.path} command: ${customActionInfo.command}`;
    newAction.command = this.calculateTheCommandName(customActionInfo.name);
    this.registerStatusBarCommand(customActionInfo.name, customActionInfo.path, customActionInfo.command);
    newAction.show();
    this.customStatusBars.push(newAction);
  }

  private commands: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [name: string]: Function;
  } = {};

  private registerStatusBarCommand = (name: string, path: string, commandToRun: string) => {
    if (!this.commands[this.calculateTheCommandName(name)]) {
      vscode.commands.registerCommand(this.calculateTheCommandName(name), () => {
        this.commands[this.calculateTheCommandName(name)]();
      });
    }
    this.makecommand(name, path, commandToRun);
  };

  private makecommand(name: string, path: string, commandToRun: string) {
    this.commands[this.calculateTheCommandName(name)] = this.callbackCommand.bind(this, name, path, commandToRun);
  }

  private callbackCommand(name: string, path: string, commandToRun: string) {
    const cwd = getRealPath(path);
    const terminal = vscode.window.createTerminal({ cwd, name });
    terminal.sendText(commandToRun);
    terminal.show();
  }
}

export const customActions: CustomActions = new CustomActions();
