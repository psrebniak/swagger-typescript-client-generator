"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelsCommand = void 0;
var typescriptClientGenerator_1 = require("../typescriptClientGenerator");
var typescriptConverter_1 = require("../typescriptConverter");
var modelsCommand = function (swagger, options) {
    var generator = new typescriptClientGenerator_1.TypescriptClientGenerator(swagger, new typescriptConverter_1.TypescriptConverter(swagger, {
        allowVoidParameters: options.allowVoidParameterTypes
    }));
    return generator.generateModels();
};
exports.modelsCommand = modelsCommand;
