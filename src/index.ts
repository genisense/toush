#!/usr/bin/env node
'use strict';
import { exec } from 'child_process';
import { createFilePathObj, makeDir, makeFiles } from './lib';

const boot = () => {
  const params = process.argv.slice(2);

  for (let param of params) {
    const pathNfilesObj = createFilePathObj(param);
    makeDir(pathNfilesObj.path);
    makeFiles(pathNfilesObj);
    // console.log(pathNfilesObj);
    if (pathNfilesObj.files[0] != '')
      exec(`"code" ${pathNfilesObj.cliParamFiles}`);
  }
};

boot();
