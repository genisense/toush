#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const configure_1 = require("./configure");
const lib_1 = require("./lib");
const boot = () => {
    const params = process.argv.slice(2);
    if (params.length === 0)
        return;
    const ideCmd = configure_1.configure(params);
    if (ideCmd) {
        for (let param of params) {
            const pathNfilesObj = lib_1.createFilePathObj(param);
            lib_1.makeDir(pathNfilesObj.path);
            lib_1.makeFiles(pathNfilesObj);
            console.dir(JSON.stringify(pathNfilesObj));
            if (pathNfilesObj.files[0] != '') {
                let cliFormattedFiles = pathNfilesObj.files
                    .map(val => pathNfilesObj.path + val)
                    .join(' ');
                child_process_1.exec(`"${ideCmd}" ${cliFormattedFiles}`);
            }
        }
    }
};
boot();
//# sourceMappingURL=index.js.map