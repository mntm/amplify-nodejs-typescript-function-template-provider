"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amplify_cli_core_1 = require("amplify-cli-core");
const constants_1 = require("constants");
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
async function default_1(request) {
    const root = amplify_cli_core_1.pathManager.findProjectRoot();
    if (!root)
        return Promise.resolve(void 0);
    const file = path_1.default.join(root, "package.json");
    try {
        const content = await fs_1.default.promises.readFile(file, { flag: constants_1.O_CREAT });
        let json = (content === null || content === void 0 ? void 0 : content.length) ? JSON.parse(content.toString()) : {};
        const script = `cd ${path_1.default.join(amplify_cli_core_1.pathManager.getBackendDirPath(), "function", request.contributionContext.functionName)} && npm run build && cd -`;
        json = lodash_1.default.chain(json)
            .set("devDependencies.typescript", "^4.5.5")
            .set(`scripts.amplify:${request.contributionContext.functionName}`, script);
        await fs_1.default.promises.writeFile(file, JSON.stringify(json, null, 2));
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = default_1;
//# sourceMappingURL=writeBuildConfig.js.map