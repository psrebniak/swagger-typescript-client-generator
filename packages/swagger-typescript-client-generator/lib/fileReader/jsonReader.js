"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.jsonReader = function (options) {
    var content = fs.readFileSync(options.file, {
        encoding: "UTF-8",
        flag: "r"
    });
    return JSON.parse(content);
};
//# sourceMappingURL=jsonReader.js.map