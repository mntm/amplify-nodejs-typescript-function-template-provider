import { pathManager } from "amplify-cli-core";
import { TemplateContributionRequest } from "amplify-function-plugin-interface";
import { O_CREAT } from "constants";
import fs from "fs";
import _ from "lodash";
import path from "path";

export default async function (
  request: TemplateContributionRequest
): Promise<void> {

  const root = pathManager.findProjectRoot();
  if (!root) return Promise.resolve(void 0);
  const file = path.join(root, "package.json");
  try {
    const content = await fs.promises.readFile(file, { flag: O_CREAT });
    let json = content?.length ? JSON.parse(content.toString()) : {};
    const script = `cd ${path.join(
      pathManager.getBackendDirPath(),
      "function",
      request.contributionContext.functionName
    )} && npm run build && cd -`;
    json = _.chain(json)
      .set("devDependencies.typescript", "^4.5.5")
      .set(
        `scripts.amplify:${request.contributionContext.functionName}`,
        script
      );
    await fs.promises.writeFile(file, JSON.stringify(json, null, 2));
  } catch (error) {
    console.error(error);
  }
}
