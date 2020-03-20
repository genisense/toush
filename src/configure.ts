'use strict';
import fs from 'fs';
const path = require('path');
const cwd = path.resolve(process.cwd(), '.');
const CONFIG_FILE = 'toushrc';

/* 
given @param args, is first param -c ?
*/
export const findConfig = (): string => {
  let path = cwd;
  while (!fs.existsSync(path + '/' + CONFIG_FILE) && path.length > 0) {
    const lastSlashPos = path.lastIndexOf('/');
    path = path.slice(0, lastSlashPos);
  }
  if (path.length == 0) throw new Error('toushrc file not found.');
  return path + '/' + CONFIG_FILE;
};

/*
given @param command,
	
	set command=command in ./toushrc
	if no toushrc found (in directory tree above) return false.
*/
export const setConfig = (command: string): void => {
  const configFile = findConfig();
  fs.writeFileSync(configFile, `{"idecommand" : "${command}" }`);
  console.log(`config file: ${configFile} updated: idecommand : ${command}.`);
};

/*
	@param command:
	@effect: 
		find lowest toushrc in directory tree path above.
		and get command=command from it.
		X- in case no toushrc found (in directory tree above) create one at cwd.
*/
export const getConfig = (): string => {
  try {
    const configFile = findConfig();
    const data = fs.readFileSync(configFile, 'utf8');
    const command = JSON.parse(data).idecommand;
    console.log(`using config file: ${path + '/' + CONFIG_FILE}`);
    return command;
  } catch (error) {
    // if typeof error FileNotFoundError
    console.log('no toushrc config file found. Use toush -c  to create one.');
    return 'code';
  }
};

export const configure = (params: string[]): string | null => {
  if (params[0] === '-c') {
    if (params[1] && params[1].length > 0) {
      setConfig(params[1]);
    } else {
      console.log(`toush -c requires parameter commandToOpenIde `);
      console.log('e.g: toush -c myCommandToOpenIde');
    }
    return null;
  } else {
    return getConfig();
  }
};
