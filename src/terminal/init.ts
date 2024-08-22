import * as vscode from 'vscode';
import { terminals } from './terminal';

export default function activate(context: vscode.ExtensionContext) {

  context.subscriptions.push(vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => {
    terminals.concatTerminals(context);
  }));

  context.subscriptions.push(vscode.window.onDidCloseTerminal((terminal: any) => {
    terminals.onDidCloseTerminal(terminal);
  }));

  context.subscriptions.push(vscode.window.onDidChangeActiveTerminal((terminal: vscode.Terminal) => {
    terminals.concatTerminals(context);
  }));

  terminals.concatTerminals(context);
  terminals.registryCommandForNameOrId(context);
}