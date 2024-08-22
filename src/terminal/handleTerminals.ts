import { TerminalStatusBarItem } from "./terminalStatusBarItem";
import * as vscode from 'vscode';
import { commandsNames } from "../model/commandsNames";
import { clickListeningCommand } from './clickListeningCommand';

class HandleTerminals {

    private _terminals: { [key: string]: TerminalStatusBarItem } = {};

    public registerStatusBarCommand = (id: number): vscode.Disposable => {
        // add to context.subscriptions some way
        return vscode.commands.registerCommand(
            commandsNames.showTerminal + id,
            () => clickListeningCommand(this, id)
            );
    }

    constructor() {
        console.log("oxi dio fors");
    }

    public show(id: number) {
        this._terminals[id].show();
    }

    public dispose(id: number) {
        this._terminals[id].dispose();
        delete this._terminals[id];
    }

    public addIfIsNotThere(terminals: readonly vscode.Terminal[], hasIdAsNameTerminal: boolean) {
        let notYetInitTerminals = terminals.filter((t: any) => {
            t.__id__ = t._id;
            return !this._terminals[t.__id__];
        });

        this.initilizeTerminals(notYetInitTerminals, hasIdAsNameTerminal);
    }

    private initilizeTerminals(notYetInitTerminals: vscode.Terminal[], hasIdAsNameTerminal: boolean){
    notYetInitTerminals.forEach((terminal: any) => {
            this._terminals[terminal.__id__] = new TerminalStatusBarItem(
                terminal,
                this.registerStatusBarCommand(terminal.__id__),
                hasIdAsNameTerminal
            );
        });
    }

    public switchNameAndId(HasIdAsNameTerminal: boolean) {
        for (let term in this._terminals) {
            this._terminals[term].changeName(
                HasIdAsNameTerminal
            );
        }
    }

    public delete(id: number) {
        vscode.commands.executeCommand(commandsNames.buildInTerminalKill);
    }

}

export const handleTerminals: HandleTerminals = new HandleTerminals();
