"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonReader = void 0;
var fs = require("fs");
exports.jsonReader = function (options) {
    var content = fs.readFileSync(options.file, {
        encoding: "utf-8",
        flag: "r",
    });
    return JSON.parse(content);
};
