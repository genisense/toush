# toush - an extra touch

Super simple cli utility, toush does three tings:

1. creates directories if they dont exist.
2. creates the file(s) if the dont exist.
3. opens the file(s) in vscode.

neat example:

    $ toush src/engines/thomas.js,henry.js src/controllers/fat.js,thin.js

install:

    $ npm install -g @genisense/toush

examples:

    # simple example:

    $ toush src/engines/thomas.js


    # multiple paths as paramaters:

    $ toush src/controllers/fat.js src/controllers/thin.js src/engines/thomas.js src/engines/henry.js

    # The best bit again!: multiple comma separated files per directory:

    $ toush  src/engines/thomas.js,henry.js src/controllers/fat.js,thin.js

So whats toush for? Primarily it's for tutorials. Its really great when tutorials provide mkdir, touch snippets - less thought impedance than ide mouse clicking. But with toush, tutorials can be even AweSoma!

## V0.0.1

Hard coded to execute \$ code to open file in ide. (free to fork/alias if want different)

Why as a global npm not just a bash script/binary etc? - portable, ease of installation, ease of extension.

0% test coverage.

only tested on mac.

synchronous, dont even try it on huge amounts of files!
