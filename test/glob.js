/*
    e2e - toush currently relies on shell globbing path/file params.
    need to know works for win/linux/mac.
    if not, trivial to add.

    node bin/index.js temp/e2e/a,b,c
    node test/e2e/glob.js temp/e2e/*
*/

console.log(process.argv);
