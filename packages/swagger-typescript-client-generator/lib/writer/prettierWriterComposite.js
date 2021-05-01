"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettierWriterComposite = void 0;
var prettier = require("prettier");
var prettierWriterComposite = function (writer) { return function (content, options) {
    return writer(prettier.format(content, {
        parser: "typescript"
    }), options);
}; };
exports.prettierWriterComposite = prettierWriterComposite;
