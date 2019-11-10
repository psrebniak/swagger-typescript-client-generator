"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParametersArrayToSchemaConverter = /** @class */ (function () {
    function ParametersArrayToSchemaConverter() {
    }
    ParametersArrayToSchemaConverter.prototype.convertToObject = function (parameters) {
        if (!Array.isArray(parameters)) {
            throw new Error('invalid argument');
        }
        var schema = {
            type: 'object',
            required: parameters
                .filter(function (param) { return Boolean(param.required); })
                .map(function (param) { return param.name; }),
            properties: {},
        };
        parameters.forEach(function (param) {
            schema.properties[param.name] = param;
        });
        return schema;
    };
    ParametersArrayToSchemaConverter.prototype.convertToUnion = function (parameters) {
        if (!Array.isArray(parameters)) {
            throw new Error('invalid argument');
        }
        return {
            allOf: parameters
        };
    };
    return ParametersArrayToSchemaConverter;
}());
exports.ParametersArrayToSchemaConverter = ParametersArrayToSchemaConverter;
//# sourceMappingURL=parameterArrayToSchemaConverter.js.map