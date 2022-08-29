import fs from "fs";
import { exit } from "process";

function copyFile(src, dest, cb) {
  fs.readFile(src, (err, data) => {
    if (err) return cb(err);

    const packages = JSON.parse(data.toString());
    delete packages.devDependencies;
    delete packages.scripts;

    fs.writeFile(dest, JSON.stringify(packages, null, 2), () => {
      console.log(`>> ${src} copied!`);
      cb(null);
    });
  });
}

copyFile("./package.json", "./src/package.json", (err) => {
  if (err) {
    console.error(err);
    exit(1);
  }
  copyFile("./event.json", "./src/event.json", (err) => {
    if (err) {
      console.error(err);
    }
  });
});
