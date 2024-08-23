import * as vscode from 'vscode';
import { terminals } from './terminal';
import { ExTerminal } from '../model/exTerminal';

export default function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.onDidOpenTerminal(() => {
      terminals.concatTerminals(context);
    })
  );

  context.subscriptions.push(
    vscode.window.onDidCloseTerminal(terminal => {
      terminals.onDidCloseTerminal(terminal as ExTerminal);
    })
  );

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTerminal(() => {
      terminals.concatTerminals(context);
    })
  );

  terminals.concatTerminals(context);
  terminals.registryCommandForNameOrId(context);
}
