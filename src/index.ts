#!/usr/bin/env node
'use strict';
import { exec } from 'child_process';
import { configure } from './configure';
import { createFilePathObj, makeDir, makeFiles } from './lib';

const boot = () => {
  const params = process.argv.slice(2);
  if (params.length === 0) return;
  const ideCmd = configure(params);
  if (ideCmd) {
    for (let param of params) {
      const pathNfilesObj = createFilePathObj(param);
      makeDir(pathNfilesObj.path);
      makeFiles(pathNfilesObj);
      console.dir(JSON.stringify(pathNfilesObj));
      if (pathNfilesObj.files[0] != '') {
        let cliFormattedFiles = pathNfilesObj.files
          .map(val => pathNfilesObj.path + val)
          .join(' ');
        exec(`"${ideCmd}" ${cliFormattedFiles}`);
      }
    }
  }
};

boot();
