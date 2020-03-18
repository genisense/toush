# toush - an extra touch

Super simple cli utility.

example:

    $ toush src/engines/thomas.js,henry.js src/controllers/fat.js,thin.js

toush does three things in one command:

1. creates directories if they dont exist. e.g: src, src/engines, src/controllers
2. creates the file(s) if they dont exist.
3. opens the file(s) in vscode.

install:

    $ npm install -g toush

further examples:

    # simple example:
    $ toush src/engines/thomas.js

    # just open all files in a dir:
    $ toush src/engines/*

    # standard globbing, all subdirs:
    $ toush src/**/*

    # The best bit again!: multiple comma separated files created/opened per directory:
    $ toush src/engines/thomas.js,henry.js src/controllers/fat.js,thin.js

    # multiple paths as paramaters (verbose version of the above)
    $ toush src/controllers/fat.js src/controllers/thin.js src/engines/thomas.js src/engines/henry.js

    # should you want to make empty directory - end with fwd slash:
    $toush src/empty/dir/for/later/  ./and/another/  and-make/this-file-by-the-by.js

# What is toush good for anyway?

- Primarily it's for tutorials. Its really great when tutorials provide mkdir, touch snippets - less thought impedance than ide mouse clicking. But with toush, tutorials can be even more Awesome.

- Secondarily, power user way of creating/opening files during development.

## V0.0.2

Updated readme with globbing.

basic run tested ok on mac, linux, windows.

Wired to execute `$ code` for opening files in ide. (you are free to fork/alias if want other).

Why as a global npm not just a bash script/binary etc? - portable, ease of installation, ease of extension.

0% test coverage.

synchronous, dont even try it on huge amounts of files!
