"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prettier = require("prettier");
exports.prettierWriterComposite = function (writer) { return function (content, options) {
    return writer(prettier.format(content, {
        parser: "typescript"
    }), options);
}; };
//# sourceMappingURL=prettierWriterComposite.js.map