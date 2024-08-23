import * as vscode from 'vscode';
import { commandsNames } from '../model/commandsNames';
import { ExTerminal } from '../model/exTerminal';

export class TerminalStatusBarItem {
  private _statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -1);

  private _terminal!: ExTerminal;

  private _registerCommand: vscode.Disposable;

  constructor(terminal: ExTerminal, reg: vscode.Disposable, hasIdAsName: boolean) {
    hasIdAsName = true;
    this._terminal = terminal;
    this.createStatusBarItem(hasIdAsName);
    this.addWatchIconWhenTerminalIsBusy(terminal);
    this._registerCommand = reg;
  }

  public show(): void {
    this._terminal.show();
  }

  private createStatusBarItem(hasIdAsName: boolean) {
    if (hasIdAsName) {
      this.setupStatusBarItem(this._terminal.__id__, this._terminal.__id__);
    } else {
      this.setupStatusBarItem(this._terminal.name, this._terminal.__id__);
    }
  }

  private setupStatusBarItem(name: string | number, id: number): void {
    this._statusBarItem.text = `$(terminal) ${name}`;
    this._statusBarItem.tooltip = [
      'Open the terminal ',
      'Toggle name by pressing F1 and select "Terminal Status Bar: Toggle appellation of terminal(name or id)"'
    ].join('\n');
    this._statusBarItem.command = commandsNames.showTerminal + id;
    this._statusBarItem.show();
  }

  /*
    Show an watch icon when the terminal do something. 
  */
  private addWatchIconWhenTerminalIsBusy(terminal: vscode.Terminal): void {
    let delayTimeout: NodeJS.Timeout | null = null;
    return;
    // @ts-expect-error idk
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    terminal.onDidWriteData(data => {
      if (!this._statusBarItem.text.endsWith('$(watch)')) {
        this._statusBarItem.text = `${this._statusBarItem.text}$(watch)`;
      }
      clearTimeout(delayTimeout);

      delayTimeout = setTimeout(() => {
        if (this._statusBarItem.text.endsWith('$(watch)')) {
          this._statusBarItem.text = this._statusBarItem.text.replace('$(watch)', '');
        }
      }, 300);
    });
  }

  public changeName(hasIdAsName: boolean) {
    if (hasIdAsName) {
      this._statusBarItem.text = `$(terminal) ${this._terminal.__id__}`;
    } else {
      this._statusBarItem.text = `$(terminal) ${this._terminal.name}`;
    }
  }

  public dispose(): void {
    this._statusBarItem.dispose();
    this._terminal.dispose();
    this._registerCommand.dispose();
  }
}
