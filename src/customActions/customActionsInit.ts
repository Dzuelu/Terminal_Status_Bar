import * as vscode from "vscode";
import { ConfigurationFile } from "./configurationFile";

export default function activate(context: vscode.ExtensionContext) {
  const configurationFile = new ConfigurationFile(context);
  try {
    configurationFile.checkIfFileExistAndCrete();
    configurationFile.parseFile();
    configurationFile.watchConfigurationChanges(context);
    configurationFile.editConfigurationFile(context);
  } catch(e){
      console.log(e);
    vscode.window.showInformationMessage(
      "Problem with custom actions, check if you have permissions to write and read files."
    );
  }
}
