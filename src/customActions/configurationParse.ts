import * as fs from 'async-file';
import * as filePath from 'path';
import { customActions } from './customActions';
import { CustomActionInfo } from '../model/configurationInfo';
import { getRealPath } from '../utils/path.utils';
import * as vscode from 'vscode';

class ConfigurationParse {
  private async isWhenExist(path: string | undefined, whenPath: string): Promise<boolean> {
    try {
      if (path && whenPath && (await fs.exists(filePath.join(path, whenPath)))) {
        return true;
      }
    } catch (e) {
      console.log('TerminalStatusBar');
      console.log(e);
    }
    return false;
  }

  public async parse(fullPath: string) {
    let fileContent: string | null = null;
    try {
      fileContent = await fs.readTextFile(fullPath);
    } catch {
      vscode.window.showInformationMessage(`Terminal Status bar: Unable to read file from path\n\n${fullPath}`);
      return;
    }

    let parsedContents: CustomActionInfo[] = null;
    try {
      parsedContents = JSON.parse(fileContent);
    } catch {
      vscode.window.showInformationMessage('Terminal Status bar: Problem with parsing the json');
      return;
    }

    try {
      this.create(parsedContents);
    } catch {
      vscode.window.showInformationMessage('Terminal Status bar: Problem using the CustomActionInfo json');
    }
  }

  private async create(fileContentParseJson: CustomActionInfo[]) {
    customActions.removeAll();
    fileContentParseJson.forEach(async (actionsInfo: CustomActionInfo) => {
      if (actionsInfo.hide) {
        return;
      }
      if (actionsInfo.when && !(await this.isWhenExist(getRealPath(actionsInfo.path), actionsInfo.when))) {
        return;
      }

      customActions.add(actionsInfo);
    });
  }
}

export const configurationParse: ConfigurationParse = new ConfigurationParse();
