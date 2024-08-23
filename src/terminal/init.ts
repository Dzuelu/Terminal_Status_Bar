import * as vscode from 'vscode';
import { TerminalHandler } from './terminalHandler';

export default function activate(context: vscode.ExtensionContext) {
  const subscriptions = [
    vscode.window.onDidOpenTerminal(terminal => TerminalHandler.addTerminal(terminal)),
    vscode.window.onDidCloseTerminal(terminal => TerminalHandler.closeTerminal(terminal)),
    vscode.window.onDidChangeActiveTerminal(terminal => TerminalHandler.selectedTerminal(terminal))
    // vscode.commands.registerCommand(commandsNames.HasIdAsNameTerminal, () => this.HasIdAsNameCommand(context))
  ];
  context.subscriptions.push(...subscriptions);

  vscode.window.terminals.forEach(terminal => TerminalHandler.addTerminal(terminal));
}
