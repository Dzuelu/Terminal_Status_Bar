const path = require("path");
import * as vscode from "vscode";
import * as fs from "async-file";
import { configurationParse } from "./configurationParse";
import { commandsNames } from "../model/commandsNames";
import defaultJsonFile from "./defaultJsonFile";
import { filename } from "../model/configurationInfo";

export class ConfigurationFile {
  private configurationFileName = filename;
  private globalStoragePath: string;
  private fullPath: string;

  constructor(private context: vscode.ExtensionContext) {
    this.globalStoragePath = context.globalStoragePath;
    this.fullPath = this.globalStoragePath + this.configurationFileName;
  }
  public async checkIfFileExistAndCrete() {
    if (!(await fs.exists(this.globalStoragePath))) {
      await fs.createDirectory(this.globalStoragePath);
    }
    if (!(await fs.exists(this.fullPath))) {
      await this.createFile();
    }
  }

  public async createFile() {
    await fs.writeTextFile(this.fullPath, defaultJsonFile);
  }

  public watchConfigurationChanges(context: vscode.ExtensionContext) {
    fs.watchFile(this.fullPath, async (event: any) => {
      this.parseFile();
    });
  }

  public async parseFile() {
    configurationParse.parse(this.fullPath);
  }

  public editConfigurationFile(context: vscode.ExtensionContext) {
    let editTerminals = vscode.commands.registerCommand(
      commandsNames.editConfigurationFile,
      () => {
        let terminalsJsonPath = path.join(
          context.globalStoragePath,
          this.configurationFileName
        );
        vscode.window.showTextDocument(vscode.Uri.file(terminalsJsonPath));
      }
    );
    context.subscriptions.push(editTerminals);
  }
}
