import { FunctionTemplateContributorFactory } from "amplify-function-plugin-interface";
import writeBuildConfig from "./utils/writeBuildConfig.js";

import { provideBasicTs } from "./providers/basicTsProvider";

export const functionTemplateContributorFactory: FunctionTemplateContributorFactory =
  (context) => {
    return {
      contribute: (request) => {
        console.dir(request);
        switch (request.selection) {
          case "basic-ts-esm": {
            return Promise.all([
              provideBasicTs(),
              writeBuildConfig(request),
            ]).then((result) => result[0]);
          }
          default: {
            throw new Error(
              `Unknown template selection [${request.selection}]`
            );
          }
        }
      },
    };
  };
