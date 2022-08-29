import { FunctionTemplateParameters } from "amplify-function-plugin-interface";
import _ from "lodash";
import path from "path";

import { templateRoot } from "../utils/constants";
import { directoryWalker } from "../utils/directoryWalker.js";

const pathToTemplateFiles = path.join(templateRoot, "lambda/basic-ts-esm");

export async function provideBasicTs(): Promise<FunctionTemplateParameters> {
  
  let files = await directoryWalker(pathToTemplateFiles);
  files = files.map((src) => src.replace(pathToTemplateFiles + "/", ""));
  const destMap = files.reduce(
    (acc, it) => _.assign(acc, { [it]: it.replace(/\.ejs$/, "") }),
    {}
  );

  return Promise.resolve({
    functionTemplate: {
      sourceRoot: pathToTemplateFiles,
      sourceFiles: files,
      defaultEditorFile: path.join("lib", "index.ts"),
      destMap: destMap,
    },
  });
}
