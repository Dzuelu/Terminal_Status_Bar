import * as vscode from 'vscode';
import { commandsNames } from '../model/commandsNames';
import { handleTerminals } from './handleTerminals';

class Terminal {

  public registryCommandForNameOrId = (context: vscode.ExtensionContext) => {
    this.InitGlobalValueOfHasIdAsName(context);

    context.subscriptions.push(
      vscode.commands.registerCommand(
        commandsNames.HasIdAsNameTerminal,
        () => this.HasIdasNameCommand(context)
      ));
  }

  private HasIdasNameCommand(context: any) {
    context.globalState.update(
      commandsNames.HasIdAsNameTerminal,
      !context.globalState.get(commandsNames.HasIdAsNameTerminal, true)
    );
    handleTerminals.switchNameAndId(
      context.globalState.get(commandsNames.HasIdAsNameTerminal, false)
    );
  }

  private InitGlobalValueOfHasIdAsName(context: vscode.ExtensionContext) {
    context.globalState.update(
      commandsNames.HasIdAsNameTerminal,
      context.globalState.get(commandsNames.HasIdAsNameTerminal,
        true));
  }

  public onDidCloseTerminal = (terminal: any): void => {
    handleTerminals.dispose(terminal._id);
  }

  public concatTerminals = async (context: vscode.ExtensionContext) => {
    handleTerminals.addIfIsNotThere(
      vscode.window.terminals,
      context.globalState.get(commandsNames.HasIdAsNameTerminal, true));

  }

}

export const terminals: Terminal = new Terminal();
