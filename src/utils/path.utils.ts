import * as vscode from 'vscode';
import * as modulePath from 'path';

const getCurrentEditorPath = (): vscode.Uri | undefined => {
  const activeTextEditor = vscode.window.activeTextEditor!;
  if (!activeTextEditor || activeTextEditor.document.isUntitled) {
    return undefined;
  }
  return activeTextEditor.document.uri;
};

export const getRealPath = (path: string): string | undefined => {
  try {
    const pathLowerCase = path.toLowerCase();
    if (pathLowerCase === 'root') {
      console.log('getRealPath-root');
      return vscode.workspace.workspaceFolders[0].uri.fsPath;
    }
    if (pathLowerCase === 'current') {
      console.log('getRealPath-current');
      return modulePath.dirname(getCurrentEditorPath().fsPath);
    }
    console.log(`getRealPath: ${path}`);
    return path;
  } catch (e) {
    console.log(`Was trying to getRealPath(${path}), but failed`);
    return undefined;
  }
};
