#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const lib_1 = require("./lib");
const boot = () => {
    const params = process.argv.slice(2);
    for (let param of params) {
        const pathNfilesObj = lib_1.createFilePathObj(param);
        lib_1.makeDir(pathNfilesObj.path);
        lib_1.makeFiles(pathNfilesObj);
        // console.log(pathNfilesObj);
        if (pathNfilesObj.files[0] != '')
            child_process_1.exec(`"code" ${pathNfilesObj.cliParamFiles}`);
    }
};
boot();
//# sourceMappingURL=index.js.map