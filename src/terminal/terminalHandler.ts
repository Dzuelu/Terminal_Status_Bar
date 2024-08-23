import * as vscode from 'vscode';
import { ExTerminal } from '../model/exTerminal';
import { TerminalStatusBarItem } from './terminalStatusBarItem';

export class TerminalHandler {
  private static terminals: { [key: number]: TerminalStatusBarItem } = {};
  private static index = 1;

  static addTerminal(terminal: vscode.Terminal) {
    (terminal as ExTerminal)._id = this.index;
    this.terminals[this.index] = new TerminalStatusBarItem(terminal as ExTerminal);
    this.index += 1;
    this.cleanup();
  }

  static closeTerminal(terminal: vscode.Terminal) {
    const id = (terminal as ExTerminal)._id;
    this.terminals[id].dispose();
    this.cleanup();
  }

  static selectedTerminal(terminal: vscode.Terminal) {
    const id = (terminal as ExTerminal)._id;
    this.terminals[id].highlight();
    this.cleanup();
  }

  private static cleanup() {
    Object.keys(this.terminals).forEach(key => {
      const index = key as unknown as number;
      if (!this.terminals[index].isValid()) {
        delete this.terminals[index];
      }
    });
  }
}
