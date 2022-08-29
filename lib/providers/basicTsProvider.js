"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideBasicTs = void 0;
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../utils/constants");
const directoryWalker_js_1 = require("../utils/directoryWalker.js");
const pathToTemplateFiles = path_1.default.join(constants_1.templateRoot, "lambda/basic-ts-esm");
async function provideBasicTs() {
    let files = await (0, directoryWalker_js_1.directoryWalker)(pathToTemplateFiles);
    files = files.map((src) => src.replace(pathToTemplateFiles + "/", ""));
    const destMap = files.reduce((acc, it) => lodash_1.default.assign(acc, { [it]: it.replace(/\.ejs$/, "") }), {});
    return Promise.resolve({
        functionTemplate: {
            sourceRoot: pathToTemplateFiles,
            sourceFiles: files,
            defaultEditorFile: path_1.default.join("lib", "index.ts"),
            destMap: destMap,
        },
    });
}
exports.provideBasicTs = provideBasicTs;
//# sourceMappingURL=basicTsProvider.js.map