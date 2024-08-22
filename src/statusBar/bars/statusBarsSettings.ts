import { commandsNames } from "../../model/commandsNames";
import * as vscode from "vscode";

let statusBarsSettings: StatusBarsSettings[] = [
    {
        name: "root",
        text: "$(terminal) root",
        tooltip: "Create a new terimanl to the root.\nToggle visibility by pressing F1 and select 'Toggle visibility of root teriminal'",
        command: commandsNames.createRootTerminal,
        F1command: commandsNames.ToggleRootTerminal,
        initVisibility: false,
        priority: 0
    },
    {
        name: "current",
        text: "$(terminal) current",
        tooltip: "Create a new terimanl to the current folder.\nToggle visibility by pressing F1 and select 'Toggle visibility of current teriminal'",
        command: commandsNames.openInTerminal,
        F1command: commandsNames.ToggleCurrentTerminal,
        initVisibility: false,
        priority: 0
    },
    {
        name: "edit",
        text: "|$(settings)|",
        tooltip: "Open json that is responsible about the custom terminal actions.\nToggle visibility by pressing F1 and select 'Toggle visibility of edit json button' ",
        command: commandsNames.editConfigurationFile,
        F1command: commandsNames.ToggleEditStatusBar,
        initVisibility: false,
        priority: 9999999,
        alignment: vscode.StatusBarAlignment.Right
    }
];

export interface StatusBarsSettings {
    name: string;
    text: string;
    tooltip: string;
    command: string;
    F1command: string;
    initVisibility: boolean;
    priority: number;
    alignment?: vscode.StatusBarAlignment;
}

export default statusBarsSettings;