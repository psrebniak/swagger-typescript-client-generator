"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonReader_1 = require("./jsonReader");
var yamlReader_1 = require("./yamlReader");
exports.readerFactory = function (options) {
    if (typeof options.file !== "string") {
        throw new Error("invalid type for file option, string expected");
    }
    if (options.file.endsWith(".json")) {
        return jsonReader_1.jsonReader;
    }
    if (options.file.endsWith(".yml") || options.file.endsWith(".yaml")) {
        return yamlReader_1.yamlReader;
    }
    throw new Error("cannot create reader for " + options.file + ". Supported formats: json");
};
//# sourceMappingURL=readerFactory.js.map