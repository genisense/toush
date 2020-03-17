#!/usr/bin/env node
'use strict';

const fs = require('fs');
const { exec } = require('child_process');

const createFilePathObj = pathNFiles => {
  const lastSlashPos = pathNFiles.lastIndexOf('/');
  const path = pathNFiles.slice(0, lastSlashPos + 1).replace(/^\.\//, ''); // strip ./ if starts with.
  const files = pathNFiles.slice(lastSlashPos + 1).split(',');
  const cliParamFiles = files.map(val => path + val).join(' ');
  return { path, files, cliParamFiles };
};

const makeDir = path => {
  const parts = path.split('/');
  let dir = null;
  for (let i = 0; parts.length > 0; i++) {
    if (dir) {
      dir = dir + '/';
    } else {
      dir = './';
    }
    dir = dir + parts.splice(0, 1);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
};

const makeFiles = pathNfilesObj => {
  const path = pathNfilesObj.path;
  for (let file of pathNfilesObj.files) {
    let pathedFile = path + file;
    if (fs.existsSync(pathedFile)) {
      //noop
    } else {
      fs.writeFileSync(pathedFile, '');
    }
  }
};

const boot = () => {
  const params = process.argv.slice(2);

  for (let param of params) {
    const pathNfilesObj = createFilePathObj(param);
    makeDir(pathNfilesObj.path);
    makeFiles(pathNfilesObj);
    console.log(pathNfilesObj);
    exec(`"code" ${pathNfilesObj.cliParamFiles}`);
  }
};

boot();
