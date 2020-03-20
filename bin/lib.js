"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.createFilePathObj = (pathNFiles) => {
    if (pathNFiles.match(/^\.\.\//)) {
        console.error(`Sorry, using toush with ../ disallowed. Can only affect current/sub directories.`);
        process.exit(1);
    }
    const lastSlashPos = pathNFiles.lastIndexOf('/');
    const path = pathNFiles
        .slice(0, lastSlashPos + 1)
        .replace(/^\.\//, ''); /* in case path starts ./ strip for consistent handling  */
    const maybeFiles = pathNFiles.slice(lastSlashPos + 1).split(',');
    const files = [];
    for (let file of maybeFiles) {
        if (!fs_1.default.existsSync(path + file)) {
            files.push(file);
        }
        else {
            /* check its a file not dir (needed because : glob /* leaves trailing slash off) */
            const stats = fs_1.default.lstatSync(path + file);
            if (stats.isFile()) {
                files.push(file);
            }
        }
    }
    return { path, files };
};
/*
 makes all directories that dont exist for given path
*/
exports.makeDir = (path) => {
    const parts = path.split('/');
    let dir = null;
    for (let i = 0; parts.length > 0; i++) {
        if (dir) {
            dir = dir + '/';
        }
        else {
            dir = './';
        }
        dir = dir + parts.splice(0, 1);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
    }
};
/*
  @param: PathNfileObj
  @effect: creates empty files (if they dont exist).
*/
exports.makeFiles = (pathNfilesObj) => {
    const path = pathNfilesObj.path;
    for (let file of pathNfilesObj.files) {
        let pathedFile = path + file;
        if (fs_1.default.existsSync(pathedFile)) {
            //noop
        }
        else {
            fs_1.default.writeFileSync(pathedFile, '');
        }
    }
};
//# sourceMappingURL=lib.js.map