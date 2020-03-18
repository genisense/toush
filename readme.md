# toush - touch++

    $ toush src/engines/thomas.js,henry.js src/controllers/fat.js,thin.js

toush does three things in one command:

1. Creates directories from the paths given if they dont exist. e.g: src, src/engines, src/controllers
2. Creates the file(s) if they dont exist.
3. Opens the file(s) in vscode.

install:

    $ npm install -g toush

further examples:

    # just open all files in a dir:
    $ toush src/engines/*

    # standard globbing, all subdirs:
    $ toush src/**/*

    #  Multiple comma separated files created/opened per directory:
    $ toush src/engines/thomas.js,henry.js src/controllers/fat.js,thin.js

    # multiple paths as paramaters (verbose longform version of the above)
    $ toush src/controllers/fat.js src/controllers/thin.js src/engines/thomas.js src/engines/henry.js

    # should you want to make empty directory - end with fwd slash:
    $ toush src/empty/dir/for/later/  ./and/another/  and-make/this-file-by-the-by.js

# What is toush good for anyway?

- Primarily made for tutorials. Its really great when tutorials provide mkdir, touch snippets - less thought impedance than ide mouse clicking. But with toush, tutorials can be even more awesome!

- Secondarily, power user way of creating/opening files during development.

## V0.0.3

Updated readme with globbing.

Run tested ok on mac, linux, windows.

Note - wired to execute `$ code` for opening files in IDE. (you are free to fork/alias if want other).

Why as a global npm not just a bash script/binary etc? - portable, ease of installation, ease of extension.

Switched to Typescript.
