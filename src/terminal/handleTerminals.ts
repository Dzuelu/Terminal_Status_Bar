import { TerminalStatusBarItem } from './terminalStatusBarItem';
import * as vscode from 'vscode';
import { commandsNames } from '../model/commandsNames';
import { clickListeningCommand } from './clickListeningCommand';
import { ExTerminal } from '../model/exTerminal';

class HandleTerminals {
  private _terminals: { [key: number]: TerminalStatusBarItem } = {};

  public registerStatusBarCommand = (id: number): vscode.Disposable => {
    // add to context.subscriptions some way
    return vscode.commands.registerCommand(commandsNames.showTerminal + id, () => clickListeningCommand(this, id));
  };

  constructor() {
    console.log('oxi dio fors');
  }

  public show(id: number) {
    this._terminals[id].show();
  }

  public dispose(id: number) {
    this._terminals[id].dispose();
    delete this._terminals[id];
  }

  public addIfIsNotThere(terminals: readonly vscode.Terminal[], hasIdAsNameTerminal: boolean) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const notYetInitTerminals = terminals.map((t, index) => {
      (t as ExTerminal).__id__ = index;
      return t as ExTerminal;
    });

    this.initializeTerminals(notYetInitTerminals, hasIdAsNameTerminal);
  }

  private initializeTerminals(notYetInitTerminals: ExTerminal[], hasIdAsNameTerminal: boolean) {
    notYetInitTerminals.forEach(terminal => {
      this._terminals[terminal.__id__] = new TerminalStatusBarItem(
        terminal,
        this.registerStatusBarCommand(terminal.__id__),
        hasIdAsNameTerminal
      );
    });
  }

  public switchNameAndId(HasIdAsNameTerminal: boolean) {
    Object.keys(this._terminals).forEach(term => {
      this._terminals[term as unknown as number].changeName(HasIdAsNameTerminal);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public delete(id: number) {
    vscode.commands.executeCommand(commandsNames.buildInTerminalKill);
  }
}

export const handleTerminals: HandleTerminals = new HandleTerminals();
