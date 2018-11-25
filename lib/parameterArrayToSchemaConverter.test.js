"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var assert_1 = require("assert");
var parameterArrayToSchemaConverter_1 = require("./parameterArrayToSchemaConverter");
describe('ParametersArrayToSchemaConverter', function () {
    it('it should throw exception on falsy values', function () {
        var converter = new parameterArrayToSchemaConverter_1.ParametersArrayToSchemaConverter();
        assert_1.throws(function () {
            converter.convert(null);
        }, 'invalid argument exception');
        assert_1.throws(function () {
            converter.convert(undefined);
        }, 'invalid argument exception');
    });
    it('it should return Schema#Object', function () {
        var converter = new parameterArrayToSchemaConverter_1.ParametersArrayToSchemaConverter();
        var expected = {
            type: 'object',
            required: [],
            properties: {},
        };
        assert.deepEqual(converter.convert([]), expected, 'should return Schema with type object');
    });
    it('it should have properties', function () {
        var converter = new parameterArrayToSchemaConverter_1.ParametersArrayToSchemaConverter();
        var expected = {
            type: 'object',
            required: [],
            properties: {
                test1: {
                    name: 'test1',
                    type: 'string',
                    in: 'header',
                },
                test2: {
                    name: 'test2',
                    type: 'string',
                    in: 'header',
                },
            },
        };
        var parameters = [
            {
                name: 'test1',
                type: 'string',
                in: 'header',
            },
            {
                name: 'test2',
                type: 'string',
                in: 'header',
            },
        ];
        assert.deepEqual(converter.convert(parameters), expected, 'should return Schema with properties');
    });
    it('it should have properties', function () {
        var converter = new parameterArrayToSchemaConverter_1.ParametersArrayToSchemaConverter();
        var expected = {
            type: 'object',
            required: ['test2'],
            properties: {
                test1: {
                    name: 'test1',
                    type: 'string',
                    in: 'header',
                },
                test2: {
                    name: 'test2',
                    type: 'string',
                    in: 'header',
                    required: true,
                },
            },
        };
        var parameters = [
            {
                name: 'test1',
                type: 'string',
                in: 'header',
            },
            {
                name: 'test2',
                type: 'string',
                in: 'header',
                required: true,
            },
        ];
        assert.deepEqual(converter.convert(parameters), expected, 'should return Schema with required property');
    });
});
//# sourceMappingURL=parameterArrayToSchemaConverter.test.js.map