import fs, { exists } from 'fs';

interface PathNfilesObj {
  path: string; // single dir path
  files: string[]; //array of files (at path)
}

export const createFilePathObj = (pathNFiles: string): PathNfilesObj => {
  if (pathNFiles.match(/^\.\.\//)) {
    console.error(
      `Sorry, using toush with ../ disallowed. Can only affect current/sub directories.`
    );
    process.exit(1);
  }
  const lastSlashPos = pathNFiles.lastIndexOf('/');
  const path = pathNFiles
    .slice(0, lastSlashPos + 1)
    .replace(
      /^\.\//,
      ''
    ); /* in case path starts ./ strip for consistent handling  */

  const maybeFiles = pathNFiles.slice(lastSlashPos + 1).split(',');

  const files = [];
  for (let file of maybeFiles) {
    if (!fs.existsSync(path + file)) {
      files.push(file);
    } else {
      /* check its a file not dir (needed because : glob /* leaves trailing slash off) */
      const stats = fs.lstatSync(path + file);
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
  @param: PathNfileObj
  @effect: creates empty files (if they dont exist).
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
