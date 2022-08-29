"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionTemplateContributorFactory = void 0;
const writeBuildConfig_js_1 = __importDefault(require("./utils/writeBuildConfig.js"));
const basicTsProvider_1 = require("./providers/basicTsProvider");
const functionTemplateContributorFactory = (context) => {
    return {
        contribute: (request) => {
            console.dir(request);
            switch (request.selection) {
                case "basic-ts-esm": {
                    return Promise.all([
                        (0, basicTsProvider_1.provideBasicTs)(),
                        (0, writeBuildConfig_js_1.default)(request),
                    ]).then((result) => result[0]);
                }
                default: {
                    throw new Error(`Unknown template selection [${request.selection}]`);
                }
            }
        },
    };
};
exports.functionTemplateContributorFactory = functionTemplateContributorFactory;
//# sourceMappingURL=index.js.map