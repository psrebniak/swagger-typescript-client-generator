"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writerFactory = void 0;
var prettierWriterComposite_1 = require("./prettierWriterComposite");
var stdoutWriter_1 = require("./stdoutWriter");
exports.writerFactory = function (options) {
    return prettierWriterComposite_1.prettierWriterComposite(stdoutWriter_1.stdoutWriter);
};
