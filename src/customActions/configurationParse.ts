import * as fs from "async-file";
import { customActions } from "./customActions";
import { CustomActionInfo } from "../model/configurationInfo";
import { getRealPath } from "../utils/path.utils";
import * as vscode from "vscode";

class ConfigurationParse {
  private async isWhenExist(path: string, whenPath: string): Promise<boolean> {
    try {
      if (whenPath && (await fs.exists(path + "\\" + whenPath))) {
        return true;
      }
    } catch (e) {
      console.log("TerminalStatusBar");
      console.log(e);
    }
    return false;
  }

  public async parse(fullPath: string) {
    const fileContent = await fs.readTextFile(fullPath);
    try {
      this.create(JSON.parse(fileContent));
    } catch {
      vscode.window.showInformationMessage(
        "Terminal Status bar: Problem with parsing the json"
      );
    }
  }

  private async create(fileContentParseJson: CustomActionInfo[]) {
    customActions.removeAll();
    fileContentParseJson.forEach(async (actionsInfo: CustomActionInfo) => {
      if (actionsInfo.hide) {
        return;
      }
      if (
        actionsInfo.when &&
        !(await this.isWhenExist(
          getRealPath(actionsInfo.path),
          actionsInfo.when
        ))
      ) {
        return;
      }

      customActions.add(actionsInfo);
    });
  }
}

export const configurationParse: ConfigurationParse = new ConfigurationParse();
