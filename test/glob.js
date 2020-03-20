/*
    e2e - toush currently relies on shell globbing path/file params.
    need to know works for win/linux/mac.
    if not, trivial to add.

    node bin/index.js temp/e2e/a,b,c
    node test/e2e/glob.js temp/e2e/*
*/
const path = require('path');
const cwd = path.resolve(process.cwd(), '.');
console.log({ cwd });
console.log(process.argv);
