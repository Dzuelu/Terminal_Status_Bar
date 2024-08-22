import * as vscode from "vscode";
import * as modulePath from 'path';

export const getRealPath = (path: string) => {
  const pathLowerCase = path.toLowerCase();
  if (pathLowerCase === "root") {
    return vscode.workspace.workspaceFolders[0].uri.fsPath;
  }
  if (pathLowerCase === "current") {
    return modulePath.dirname(getCurrentEditorPath().fsPath);
  }
  return path;
};

const getCurrentEditorPath = () => {
  const activeTextEditor = vscode.window.activeTextEditor!;
  if (!activeTextEditor || activeTextEditor.document.isUntitled) {
    return;
  }
  return activeTextEditor.document.uri;
};