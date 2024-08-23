import { commandsNames } from '../../model/commandsNames';
import * as vscode from 'vscode';

export interface StatusBarsSettings {
  F1command: string;
  alignment?: vscode.StatusBarAlignment;
  command: string;
  initVisibility: boolean;
  name: string;
  priority: number;
  text: string;
  tooltip: string;
}

const statusBarsSettings: StatusBarsSettings[] = [
  {
    F1command: commandsNames.ToggleRootTerminal,
    command: commandsNames.createRootTerminal,
    initVisibility: false,
    name: 'root',
    priority: 0,
    text: '$(terminal) root',
    tooltip: [
      'Create a new terminal to the root.',
      "Toggle visibility by pressing F1 and select 'Toggle visibility of root terminal'"
    ].join('\n')
  },
  {
    F1command: commandsNames.ToggleCurrentTerminal,
    command: commandsNames.openInTerminal,
    initVisibility: false,
    name: 'current',
    priority: 0,
    text: '$(terminal) current',
    tooltip: [
      'Create a new terminal to the current folder.',
      "Toggle visibility by pressing F1 and select 'Toggle visibility of current terminal'"
    ].join('\n')
  },
  {
    F1command: commandsNames.ToggleEditStatusBar,
    alignment: vscode.StatusBarAlignment.Right,
    command: commandsNames.editConfigurationFile,
    initVisibility: false,
    name: 'edit',
    priority: 9999999,
    text: '|$(settings)|',
    tooltip: [
      'Open json that is responsible about the custom terminal actions.',
      "Toggle visibility by pressing F1 and select 'Toggle visibility of edit json button'"
    ].join('\n')
  }
];

export default statusBarsSettings;
