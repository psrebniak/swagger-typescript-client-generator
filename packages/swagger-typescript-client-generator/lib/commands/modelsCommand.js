"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescriptClientGenerator_1 = require("../typescriptClientGenerator");
var typescriptConverter_1 = require("../typescriptConverter");
exports.modelsCommand = function (swagger, options) {
    var generator = new typescriptClientGenerator_1.TypescriptClientGenerator(swagger, new typescriptConverter_1.TypescriptConverter(swagger, {
        allowVoidParameters: options.allowVoidParameterTypes,
    }));
    return generator.generateModels();
};
//# sourceMappingURL=modelsCommand.js.map