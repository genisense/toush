import fs from 'fs';

interface PathNfilesObj {
  path: string;
  files: string[];
  cliParamFiles: string;
}

/*
@param string : of paths/file(s),f2,f3
@return {} : PathNfilesObj
    {
        path : single dir path
        files : string[] of files (without path)
        cliParamFiles: string for convenience: of path/file path/file... space separated
    }
*/
export const createFilePathObj = (pathNFiles: string): PathNfilesObj => {
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
export const makeDir = (path: string): void => {
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
/*
 @param: pathNfileObj {path: required, files: required }
 creates empty files if they dont exist.
*/
export const makeFiles = (pathNfilesObj: PathNfilesObj): void => {
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
