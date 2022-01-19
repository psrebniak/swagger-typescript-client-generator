"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writerFactory = void 0;
var prettierWriterComposite_1 = require("./prettierWriterComposite");
var stdoutWriter_1 = require("./stdoutWriter");
var writerFactory = function (options) {
    return (0, prettierWriterComposite_1.prettierWriterComposite)(stdoutWriter_1.stdoutWriter);
};
exports.writerFactory = writerFactory;
