import * as vscode from "vscode";

export class StatusBar {
  public StatusBar: vscode.StatusBarItem;
  private visibility: boolean;

  constructor(
    private name: string,
    private context: vscode.ExtensionContext,
    priority: number,
    barAlignment: vscode.StatusBarAlignment = vscode.StatusBarAlignment.Left
  ) {
    this.StatusBar = vscode.window.createStatusBarItem(barAlignment, priority);
    this.visibility = this.getGlobalStateOrTrue(name);
  }

  private getGlobalStateOrTrue(name: string) {
    return this.context.globalState.get(name, true);
  }

  public setVisibility(toogle: boolean = false) {
    if (toogle) {
      this.visibility = !this.visibility;
    }
    if (this.visibility) {
      this.StatusBar.show();
    } else {
      this.StatusBar.hide();
    }
    this.updateGlobalState(this.name, this.visibility);
  }

  private updateGlobalState(name: string, value: boolean) {
    this.context.globalState.update(name, value);
  }
}

