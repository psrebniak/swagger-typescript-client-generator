"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var writerFactory_1 = require("./writer/writerFactory");
var yargs = require("yargs");
var commands_1 = require("./commands");
var readerFactory_1 = require("./fileReader/readerFactory");
var pkg = require('../package.json'); // tslint:disable-line no-var-requires
var useCommand = function (command) {
    return function (args) {
        var reader = readerFactory_1.readerFactory(args);
        var spec = reader(args);
        var output = command(spec, args);
        var writer = writerFactory_1.writerFactory(args);
        writer(output, args);
    };
};
var args = yargs
    .option('file', {
    type: 'string',
    alias: 'f',
    description: 'swagger file',
    required: true,
})
    .option('allowVoidParameterTypes', {
    boolean: true,
    default: false,
    alias: 'a',
})
    .command('models', 'generate models files', function (yargsModels) { return yargsModels; }, useCommand(commands_1.modelsCommand))
    .command('client <name> [importModelsFrom]', 'generate client code', function (yargsClient) {
    return yargsClient
        .positional('name', {
        type: 'string',
    })
        .positional('importModelsFrom', {
        default: './model',
        type: 'string',
    });
}, useCommand(commands_1.clientCommand))
    .command('bundle <name>', 'generate models and client', function (yarngsBundle) {
    return yarngsBundle
        .positional('name', {
        type: 'string',
    });
}, useCommand(commands_1.bundleCommand))
    .version(pkg.version)
    .demandCommand(1)
    .argv;
if (process.env.DEBUG) {
    // tslint:disable-next-line no-console
    console.log(args);
}
//# sourceMappingURL=cli.js.map