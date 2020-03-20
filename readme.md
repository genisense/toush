# toush - a touch++

    $ toush src/engines/thomas.js,henry.js src/controllers/fat.js,thin.js

toush does three things in one command:

1. Creates directories from the paths given.
2. Creates the files.
3. Opens the files in your IDE of choice.

## install:

    $ npm install -g toush

## Why toush ?

- Primarily intended to help make better tutorials. Its great when tutorials provide mkdir and touch snippets - less thought impedance than mouse clicking in IDE. Toush is three times faster than mkdir,touch, open. Also works for Windows.

- Secondarily, power user way of creating/opening files during development. Try it, you'll never go back!

## Examples:

Just open all existing files in a dir:

    $ toush src/engines/*

Open all existing .ts files in all sub-directories:

    $ toush src/**/*.ts

Create/open multiple files per directory (comma separted files per dir):

    $ toush src/engines/thomas.js,henry.js src/controllers/fat.js,thin.js

Tradiltional equivalent of the above (dont need to do it this verbose way anymore!)

    $ toush src/engines/thomas.js src/engines/henry.js src/controllers/fat.js src/controllers/thin.js

Should you want to create empty directories, end param string with fwd slash:

    $ toush src/empty/dir/for/later/  ./and/another/  and-make/this-file-by-the-by.js

# configure

By default '`code`' is executed to open the files in [vscode](https://github.com/microsoft/vscode). To change this, say to '`open`' for [Theia IDE](https://github.com/eclipse-theia/theia) ([Apache Che](https://www.eclipse.org/che/), [Gitpod](https://github.com/gitpod-io/gitpod)):

    toush -c open

This creates a `toushrc` file in your current directory. You can simply move the file to any higher up directory to share config across different projects.

## Changelog

### V0.0.4

- Set how to open IDE with `toush -c`. Move touchrc file to parent directory to reuse across projects.
  Tested with Theia IDE - gitpod, Apache Che ( set to `open`). For vscode set to `code`.
- Guards against destructive abuse.

### V0.0.3

- Switched to Typescript.

### V0.0.2

- Updated with globbing.

- Run tested ok on mac, linux, windows.

### v0.0.1

- initial release
- Why as a global npm not just a bash script/binary etc? - portable, ease of installation, ease of extension.
