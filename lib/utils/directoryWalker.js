"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.directoryWalker = void 0;
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
async function directoryWalker(source) {
    let results = [];
    try {
        const dirents = await fs_1.default.promises.readdir(source, { withFileTypes: true });
        const lookUp = await Promise.all(dirents.map((dirent) => {
            const name = path_1.default.join(source, dirent.name);
            if (dirent.isDirectory())
                return directoryWalker(name);
            return Promise.resolve([name]);
        }));
        results = lodash_1.default.concat(results, lodash_1.default.flattenDeep(lookUp));
    }
    catch (error) {
    }
    finally {
        return Promise.resolve(results);
    }
}
exports.directoryWalker = directoryWalker;
//# sourceMappingURL=directoryWalker.js.map