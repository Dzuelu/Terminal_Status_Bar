import * as vscode from 'vscode';
import { StatusBar } from './statusBar';
import { StatusBarsSettings } from './statusBarsSettings';

export class BuildStatusBar {
  private statusBars: {
    [name: string]: StatusBar;
  } = {};

  constructor(
    private context: vscode.ExtensionContext,
    statusBarsSettings: StatusBarsSettings[]
  ) {
    this.Build(statusBarsSettings);
  }

  public Build(statusBarsSettings: StatusBarsSettings[]) {
    statusBarsSettings.forEach(s => {
      this.createActionTerminal(s);
      this.registryTheCommands(s);
      this.createStatusBar(s);
    });
  }

  private createActionTerminal(s: StatusBarsSettings) {
    this.statusBars[s.name] = new StatusBar(
      s.name,
      this.context,
      s.priority,
      s.alignment || vscode.StatusBarAlignment.Left
    );
  }

  private registryTheCommands(s: StatusBarsSettings) {
    vscode.commands.registerCommand(s.F1command, () => {
      this.statusBars[s.name].setVisibility(true);
    });
  }

  private createStatusBar(e: StatusBarsSettings) {
    this.statusBars[e.name].StatusBar.text = e.text;
    this.statusBars[e.name].StatusBar.tooltip = e.tooltip;
    this.statusBars[e.name].StatusBar.command = e.command;
    this.statusBars[e.name].setVisibility(e.initVisibility);
  }
}
