const fs = require('fs');
const path = require('path');

fs.lstat('./sample', (err, stats) => {
  if (err) return console.log(err); //Handle error

  console.log(`Is file: ${stats.isFile()}`);
  console.log(`Is directory: ${stats.isDirectory()}`);
  console.log(`Is symbolic link: ${stats.isSymbolicLink()}`);
  console.log(`Is FIFO: ${stats.isFIFO()}`);
  console.log(`Is socket: ${stats.isSocket()}`);
  console.log(`Is character device: ${stats.isCharacterDevice()}`);
  console.log(`Is block device: ${stats.isBlockDevice()}`);
});

return;

const notes = '/users/joe/';
console.log(
  path.dirname(notes), // /users/joe
  path.basename(notes), // notes.txt
  path.extname(notes) // .txt
);

return;
fs.open('sample/sub', 'w', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  console.log('ok');
});
