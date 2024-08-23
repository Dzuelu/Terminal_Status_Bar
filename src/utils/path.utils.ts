import * as vscode from 'vscode';
import * as modulePath from 'path';

const getCurrentEditorPath = (): vscode.Uri | undefined => {
  const activeTextEditor = vscode.window.activeTextEditor!;
  if (!activeTextEditor || activeTextEditor.document.isUntitled) {
    return undefined;
  }
  return activeTextEditor.document.uri;
};

export const getRealPath = (path: string) => {
  const pathLowerCase = path.toLowerCase();
  if (pathLowerCase === 'root') {
    return vscode.workspace.workspaceFolders[0].uri.fsPath;
  }
  if (pathLowerCase === 'current') {
    return modulePath.dirname(getCurrentEditorPath().fsPath);
  }
  return path;
};
