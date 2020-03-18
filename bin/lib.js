"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
/*
@param string : of paths/file(s),f2,f3
@return {} : PathNfilesObj
    {
        path : single dir path
        files : string[] of files (without path)
        cliParamFiles: string for convenience: of path/file path/file... space separated
    }
*/
exports.createFilePathObj = (pathNFiles) => {
    const lastSlashPos = pathNFiles.lastIndexOf('/');
    const path = pathNFiles
        .slice(0, lastSlashPos + 1)
        .replace(/^\.\//, ''); /* if ./ strip for consistent handling  */
    const files = pathNFiles.slice(lastSlashPos + 1).split(',');
    const cliParamFiles = files.map(val => path + val).join(' ');
    return { path, files, cliParamFiles };
};
/*
    @param path : string
    @return: undefined

    for each / separated dir in string create dir if does not exist.
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
 @param: pathNfileObj {path: required, files: required }
 creates empty files if they dont exist.
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