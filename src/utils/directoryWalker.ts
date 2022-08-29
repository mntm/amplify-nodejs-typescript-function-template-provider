import fs from "fs";
import _ from "lodash";
import path from "path";

export async function directoryWalker(source: string): Promise<string[]> {
  let results: string[] = [];
  try {
    const dirents = await fs.promises.readdir(source, { withFileTypes: true });
    const lookUp = await Promise.all(
      dirents.map((dirent) => {
        const name = path.join(source, dirent.name);
        if (dirent.isDirectory()) return directoryWalker(name);
        return Promise.resolve([name]);
      })
    );
    results = _.concat(results, _.flattenDeep(lookUp));
  } catch (error) {
  } finally {
    return Promise.resolve(results);
  }
}
