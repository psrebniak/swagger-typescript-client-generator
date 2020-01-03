"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parameterArrayToSchemaConverter_1 = require("./parameterArrayToSchemaConverter");
var parametersJarFactory_1 = require("./parametersJarFactory");
var swaggerTypes_1 = require("./swaggerTypes");
var typescriptNameNormalizer_1 = require("./typescriptNameNormalizer");
exports.TYPESCRIPT_TYPE_UNDEFINED = "undefined";
exports.TYPESCRIPT_TYPE_VOID = "void";
exports.TYPESCRIPT_TYPE_ANY = "any";
exports.TYPESCRIPT_TYPE_EMPTY_OBJECT = "{}";
var PARAMETER_PATH_SUFFIX = "PathParameter";
var PARAMETERS_QUERY_SUFFIX = "QueryParameters";
var PARAMETERS_BODY_SUFFIX = "BodyParameters";
var PARAMETERS_FORM_DATA_SUFFIX = "FormDataParameters";
var PARAMETERS_HEADER_SUFFIX = "HeaderParameters";
var TypescriptConverter = /** @class */ (function () {
    function TypescriptConverter(swagger, settings) {
        this.swagger = swagger;
        this.settings = settings;
        this.normalizer = new typescriptNameNormalizer_1.TypescriptNameNormalizer();
        this.parametersJarFactory = new parametersJarFactory_1.ParametersJarFactory(this.swagger);
        this.parametersArrayToSchemaConverter = new parameterArrayToSchemaConverter_1.ParametersArrayToSchemaConverter();
        this.settings = Object.assign({}, {
            allowVoidParameters: true
        }, settings || {});
    }
    TypescriptConverter.prototype.generateParameterTypesForOperation = function (path, method, operation) {
        var name = this.getNormalizer().normalize(method + "-" + path);
        var _a = this.getParametersJarFactory().createFromOperation(operation), queryParams = _a.queryParams, bodyParams = _a.bodyParams, formDataParams = _a.formDataParams, headerParams = _a.headerParams;
        var parameterTypes = [];
        if (this.settings.allowVoidParameters || queryParams.length > 0) {
            var schema = this.getParametersArrayToSchemaConverter().convertToObject(queryParams);
            parameterTypes.push(this.generateType(name + PARAMETERS_QUERY_SUFFIX, schema));
        }
        if (this.settings.allowVoidParameters || bodyParams.length > 0) {
            var schema = this.getParametersArrayToSchemaConverter().convertToUnion(bodyParams);
            parameterTypes.push(this.generateType(name + PARAMETERS_BODY_SUFFIX, schema));
        }
        if (this.settings.allowVoidParameters || formDataParams.length > 0) {
            var schema = this.getParametersArrayToSchemaConverter().convertToUnion(formDataParams);
            parameterTypes.push(this.generateType(name + PARAMETERS_FORM_DATA_SUFFIX, schema));
        }
        if (this.settings.allowVoidParameters || headerParams.length > 0) {
            var schema = this.getParametersArrayToSchemaConverter().convertToObject(headerParams);
            parameterTypes.push(this.generateType(name + PARAMETERS_HEADER_SUFFIX, schema));
        }
        return parameterTypes.join("\n");
    };
    TypescriptConverter.prototype.generateOperation = function (path, method, operation) {
        var _this = this;
        var name = this.getNormalizer().normalize(method + "-" + path);
        var _a = this.getParametersJarFactory().createFromOperation(operation), pathParams = _a.pathParams, queryParams = _a.queryParams, bodyParams = _a.bodyParams, formDataParams = _a.formDataParams, headerParams = _a.headerParams;
        var output = "";
        var parameters = pathParams.map(function (parameter) {
            return "" + parameter.name + PARAMETER_PATH_SUFFIX + ": " + _this.generateTypeValue(parameter);
        });
        var args = [swaggerTypes_1.PARAMETER_TYPE_PATH];
        if (this.settings.allowVoidParameters || queryParams.length > 0) {
            parameters.push(swaggerTypes_1.PARAMETER_TYPE_QUERY + ": " + name + PARAMETERS_QUERY_SUFFIX);
            args.push(swaggerTypes_1.PARAMETER_TYPE_QUERY);
        }
        else {
            args.push(exports.TYPESCRIPT_TYPE_UNDEFINED);
        }
        if (this.settings.allowVoidParameters || bodyParams.length > 0) {
            parameters.push(swaggerTypes_1.PARAMETER_TYPE_BODY + ": " + name + PARAMETERS_BODY_SUFFIX);
            args.push(swaggerTypes_1.PARAMETER_TYPE_BODY);
        }
        else {
            args.push(exports.TYPESCRIPT_TYPE_UNDEFINED);
        }
        if (this.settings.allowVoidParameters || formDataParams.length > 0) {
            parameters.push(swaggerTypes_1.PARAMETER_TYPE_FORM_DATA + ": " + name + PARAMETERS_FORM_DATA_SUFFIX);
            args.push(swaggerTypes_1.PARAMETER_TYPE_FORM_DATA);
        }
        else {
            args.push(exports.TYPESCRIPT_TYPE_UNDEFINED);
        }
        if (this.settings.allowVoidParameters || headerParams.length > 0) {
            parameters.push(swaggerTypes_1.PARAMETER_TYPE_HEADER + ": " + name + PARAMETERS_HEADER_SUFFIX);
            args.push(swaggerTypes_1.PARAMETER_TYPE_HEADER);
        }
        else {
            args.push(exports.TYPESCRIPT_TYPE_UNDEFINED);
        }
        var responseTypes = Object.entries(operation.responses || {})
            .map(function (_a) {
            var code = _a[0], response = _a[1];
            return _this.generateTypeValue(response);
        })
            .join(" | ");
        output += name + " (" + parameters.join(", ") + "): Promise<ApiResponse<" + responseTypes + ">> {\n";
        output += "let path = '" + path + "'\n";
        output += pathParams
            .map(function (parameter) {
            return "path = path.replace('{" + parameter.name + "}', String(" + parameter.name + PARAMETER_PATH_SUFFIX + "))\n";
        })
            .join("\n");
        output += "return this.requestFactory(" + args.join(", ") + ", '" + method.toUpperCase() + "', this.configuration)\n";
        output += "}\n";
        return output;
    };
    TypescriptConverter.prototype.generateType = function (name, definition) {
        return "export type " + this.getNormalizer().normalize(name) + " = " + this.generateTypeValue(definition) + "\n";
    };
    TypescriptConverter.prototype.generateTypeValue = function (definition) {
        var _this = this;
        if (definition.schema) {
            return this.generateTypeValue(definition.schema);
        }
        if (definition.$ref) {
            return this.getNormalizer().normalize(definition.$ref.substring(definition.$ref.lastIndexOf("/") + 1));
        }
        if (Array.isArray(definition.allOf) && definition.allOf.length > 0) {
            return (definition.allOf
                .map(function (schema) { return _this.generateTypeValue(schema); })
                .join(" & ") || exports.TYPESCRIPT_TYPE_VOID);
        }
        switch (definition.type) {
            case swaggerTypes_1.DEFINITION_TYPE_ENUM: {
                return definition.enum.join(" | ");
            }
            case swaggerTypes_1.DEFINITION_TYPE_STRING:
            case swaggerTypes_1.DEFINITION_TYPE_NUMBER:
            case swaggerTypes_1.DEFINITION_TYPE_BOOLEAN: {
                return definition.type;
            }
            case swaggerTypes_1.DEFINITION_TYPE_INTEGER: {
                return swaggerTypes_1.DEFINITION_TYPE_NUMBER;
            }
            case swaggerTypes_1.DEFINITION_TYPE_ARRAY: {
                return "Array<" + this.generateTypeValue(definition.items) + ">";
            }
        }
        if (definition.type === swaggerTypes_1.DEFINITION_TYPE_OBJECT ||
            (!definition.type &&
                (definition.allOf ||
                    definition.properties ||
                    definition.additionalProperties))) {
            var output = "";
            var hasProperties = definition.properties && Object.keys(definition.properties).length > 0;
            if (hasProperties) {
                output += "{\n";
                output += Object.entries(definition.properties)
                    .map(function (_a) {
                    var name = _a[0], def = _a[1];
                    var isRequired = (definition.required || []).indexOf(name);
                    return "'" + name + "'" + (isRequired ? "?" : "") + ": " + _this.generateTypeValue(def);
                })
                    .join("\n");
                output += "\n}";
            }
            if (definition.additionalProperties &&
                typeof definition.additionalProperties === "object") {
                if (hasProperties) {
                    output += " & ";
                }
                output +=
                    "{ [key: string]: " +
                        this.generateTypeValue(definition.additionalProperties) +
                        " }";
            }
            if (output.trim().length === 0) {
                return exports.TYPESCRIPT_TYPE_EMPTY_OBJECT;
            }
            return output;
        }
        return exports.TYPESCRIPT_TYPE_ANY;
    };
    TypescriptConverter.prototype.generateClient = function (name) {
        var _this = this;
        var output = "\n\nexport interface ApiResponse<T> extends Response {\n  json (): Promise<T>\n}\nexport type RequestFactoryType = (path: string, query: any, body: any, formData: any, headers: any, method: string, configuration: any) => Promise<ApiResponse<any>>\n\nexport class " + name + "<T extends {} = {}> {\n  constructor(protected configuration: T, protected requestFactory: RequestFactoryType) {}\n";
        output += Object.entries(this.swagger.paths)
            .map(function (_a) {
            var path = _a[0], methods = _a[1];
            return Object.entries(methods)
                .map(function (_a) {
                var method = _a[0], operation = _a[1];
                return _this.generateOperation(path, method, operation);
            })
                .join("\n");
        })
            .join("\n");
        output += "}\n";
        return output;
    };
    TypescriptConverter.prototype.getNormalizer = function () {
        return this.normalizer;
    };
    TypescriptConverter.prototype.getParametersJarFactory = function () {
        return this.parametersJarFactory;
    };
    TypescriptConverter.prototype.getParametersArrayToSchemaConverter = function () {
        return this.parametersArrayToSchemaConverter;
    };
    return TypescriptConverter;
}());
exports.TypescriptConverter = TypescriptConverter;
//# sourceMappingURL=typescriptConverter.js.map