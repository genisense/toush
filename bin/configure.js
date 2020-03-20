'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Path = require('path');
const cwd = Path.resolve(process.cwd(), '.');
const CONFIG_FILE = 'toushrc';
/*
given @param args, is first param -c ?
*/
exports.findConfig = () => {
    let path = cwd;
    while (!fs_1.default.existsSync(path + '/' + CONFIG_FILE) && path.length > 0) {
        const lastSlashPos = path.lastIndexOf('/');
        path = path.slice(0, lastSlashPos);
    }
    if (path.length == 0)
        throw new Error('toushrc file not found.');
    return path + '/' + CONFIG_FILE;
};
/*
given @param command,
    
    set command=command in ./toushrc
    if no toushrc found (in directory tree above) return false.
*/
exports.setConfig = (command) => {
    const configFile = exports.findConfig();
    fs_1.default.writeFileSync(configFile, `{"idecommand" : "${command}" }`);
    console.log(`config file: ${configFile} updated: idecommand : ${command}.`);
};
/*
    @param command:
    @effect:
        find lowest toushrc in directory tree path above.
        and get command=command from it.
        X- in case no toushrc found (in directory tree above) create one at cwd.
*/
exports.getConfig = () => {
    try {
        const configFile = exports.findConfig();
        const data = fs_1.default.readFileSync(configFile, 'utf8');
        const command = JSON.parse(data).idecommand;
        if (command.match(/rm|del|rimraf/)) {
            console.error(`Naughty naughty! - destructive command set in toushrc config file: ${configFile}. Command: '${command}', Disallowed.`);
            console.log('Recomend reset command with toush -c, and find practical joker!');
            process.exit(1);
        }
        console.log(`using config file: ${configFile}`);
        return command;
    }
    catch (error) {
        // if typeof error FileNotFoundError
        console.log('no toushrc config file found. Use toush -c  to create one.');
        return 'code';
    }
};
exports.configure = (params) => {
    if (params[0] === '-c') {
        if (params[1] && params[1].length > 0) {
            exports.setConfig(params[1]);
        }
        else {
            console.log(`toush -c requires parameter commandToOpenIde `);
            console.log('e.g: toush -c myCommandToOpenIde');
        }
        return null;
    }
    else {
        return exports.getConfig();
    }
};
//# sourceMappingURL=configure.js.map