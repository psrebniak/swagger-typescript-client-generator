"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var yargs = require("yargs");
var typescriptClientGenerator_1 = require("./typescriptClientGenerator");
var typescriptConverter_1 = require("./typescriptConverter");
var pkg = require('../package.json'); // tslint:disable-line no-var-requires
var swaggerReader = function (file) {
    return JSON.parse(fs.readFileSync(file, { encoding: 'UTF-8' }));
};
yargs
    .alias('f', 'file')
    .demandOption(['f'])
    .option('allowVoidParameterTypes', {
    boolean: true,
    default: false,
})
    .alias('a', 'allowVoidParameterTypes')
    .command('models', 'generate models files', function (yargsModels) { return yargsModels; }, function (args) {
    var swagger = swaggerReader(args.file);
    var generator = new typescriptClientGenerator_1.TypescriptClientGenerator(swagger, new typescriptConverter_1.TypescriptConverter(swagger, {
        allowVoidParameters: args.allowVoidParameterTypes,
    }));
    process.stdout.write(generator.generateModels());
})
    .command('client <name> [importModelsFrom]', 'generate client code', function (yargsClient) {
    return yargsClient
        .positional('name', {
        type: 'string',
    })
        .positional('importModelsFrom', {
        default: './model',
        type: 'string',
    });
}, function (args) {
    var swagger = swaggerReader(args.file);
    var generator = new typescriptClientGenerator_1.TypescriptClientGenerator(swagger, new typescriptConverter_1.TypescriptConverter(swagger, {
        allowVoidParameters: args.allowVoidParameterTypes,
    }));
    process.stdout.write(generator.generateImportsFromFile(args.importModelsFrom));
    process.stdout.write(generator.generateClient(args.name));
})
    .command('bundle <name>', 'generate models and client', function (yarngsBundle) { return yarngsBundle; }, function (args) {
    var swagger = swaggerReader(args.file);
    var generator = new typescriptClientGenerator_1.TypescriptClientGenerator(swagger, new typescriptConverter_1.TypescriptConverter(swagger, {
        allowVoidParameters: args.allowVoidParameterTypes,
    }));
    process.stdout.write(generator.generateSingleFile(args.name));
})
    .version(pkg.version);
//# sourceMappingURL=cli.js.map