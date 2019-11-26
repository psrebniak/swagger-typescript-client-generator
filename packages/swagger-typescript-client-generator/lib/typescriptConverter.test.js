"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var typescriptConverter_1 = require("./typescriptConverter");
describe("TypescriptConverter", function () {
    describe("should generate correct type values", function () {
        var converter;
        before(function () {
            converter = new typescriptConverter_1.TypescriptConverter(null, null);
        });
        it("it should generate correct enum type", function () {
            assert.deepEqual(converter.generateTypeValue({
                type: "enum",
                enum: ["1", "2", "3"]
            }), "1 | 2 | 3");
            assert.deepEqual(converter.generateTypeValue({
                type: "enum",
                enum: ['"int"', '"string"', '"bool"']
            }), '"int" | "string" | "bool"');
        });
        it("it should generate correct number type", function () {
            assert.deepEqual(converter.generateTypeValue({
                type: "number"
            }), "number");
            assert.deepEqual(converter.generateTypeValue({
                type: "integer"
            }), "number");
        });
        it("it should generate correct string type", function () {
            assert.deepEqual(converter.generateTypeValue({
                type: "string"
            }), "string");
        });
        it("it should generate correct boolean type", function () {
            assert.deepEqual(converter.generateTypeValue({
                type: "boolean"
            }), "boolean");
        });
        it("it should generate correct Array type", function () {
            assert.deepEqual(converter.generateTypeValue({
                type: "array",
                items: {
                    type: "boolean"
                }
            }), "Array<boolean>");
            assert.deepEqual(converter.generateTypeValue({
                type: "array",
                items: {
                    $ref: "definitions/SomeType"
                }
            }), "Array<SomeType>");
        });
        it("it should generate correct object type with properties", function () {
            assert.deepEqual(converter.generateTypeValue({
                type: "object",
                properties: {
                    test1: {
                        type: "boolean"
                    },
                    test2: {
                        type: "string"
                    }
                }
            }), "{\n'test1'?: boolean\n'test2'?: string\n}");
        });
        it("it should generate correct object type with required properties", function () {
            assert.deepEqual(converter.generateTypeValue({
                type: "object",
                properties: {
                    test1: {
                        type: "boolean"
                    },
                    test2: {
                        type: "string"
                    }
                },
                required: ["test1"]
            }), "{\n'test1': boolean\n'test2'?: string\n}");
        });
        it("it should generate correct object type with props and additional props", function () {
            assert.deepEqual(converter.generateTypeValue({
                type: "object",
                properties: {
                    type: {
                        type: "string"
                    }
                },
                additionalProperties: {
                    type: "boolean"
                }
            }), "{\n'type'?: string\n} & { [key: string]: boolean }");
        });
        it("it should generate correct object type with props and additional props", function () {
            assert.deepEqual(converter.generateTypeValue({
                type: "object",
                properties: {
                    test1: {
                        type: "string"
                    }
                },
                additionalProperties: {
                    type: "string"
                }
            }), "{\n'test1'?: string\n} & { [key: string]: string }");
        });
        it("it should generate correct object type with no props", function () {
            assert.deepEqual(converter.generateTypeValue({
                type: "object"
            }), "void");
        });
        it("it should generate correct object type with props if type is not defined but properties are defined", function () {
            assert.deepEqual(converter.generateTypeValue({
                properties: {
                    key: {
                        type: "string"
                    }
                }
            }), "{\n'key'?: string\n}");
        });
        it("it should generate correct object type with props if type is not defined but additionalProperties are defined", function () {
            assert.deepEqual(converter.generateTypeValue({
                additionalProperties: {
                    type: "string"
                }
            }), "{ [key: string]: string }");
        });
        it("it should generate correct intersection type", function () {
            assert.deepEqual(converter.generateTypeValue({
                type: "object",
                allOf: [
                    {
                        type: "object",
                        properties: {
                            key: {
                                type: "string"
                            }
                        }
                    },
                    {
                        type: "object",
                        properties: {
                            value: {
                                type: "string"
                            }
                        }
                    }
                ]
            }), "{\n'key'?: string\n} & {\n'value'?: string\n}");
        });
        it("it should generate correct type for unknown type", function () {
            assert.deepEqual(converter.generateTypeValue({}), "any");
        });
    });
});
//# sourceMappingURL=typescriptConverter.test.js.map