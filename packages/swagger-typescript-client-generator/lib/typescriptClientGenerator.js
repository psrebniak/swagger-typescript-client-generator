"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypescriptClientGenerator = /** @class */ (function () {
    function TypescriptClientGenerator(swagger, converter) {
        this.swagger = swagger;
        this.converter = converter;
    }
    TypescriptClientGenerator.prototype.generateSingleFile = function (clientName) {
        return [
            this.generateModels(),
            this.generateParameterTypesForOperations(),
            this.generateClient(clientName)
        ].join("\n");
    };
    TypescriptClientGenerator.prototype.generateModels = function () {
        var _this = this;
        return []
            .concat(Object.entries(this.swagger.definitions || {}))
            .concat(Object.entries(this.swagger.responses || {}))
            .map(function (_a) {
            var name = _a[0], def = _a[1];
            return _this.converter.generateType(name, def);
        })
            .join("\n");
    };
    TypescriptClientGenerator.prototype.generateParameterTypesForOperations = function () {
        var _this = this;
        return Object.entries(this.swagger.paths)
            .map(function (_a) {
            var path = _a[0], methods = _a[1];
            return Object.entries(methods)
                .map(function (_a) {
                var method = _a[0], operation = _a[1];
                return _this.converter.generateParameterTypesForOperation(path, method, operation);
            })
                .join("\n");
        })
            .join("\n");
    };
    TypescriptClientGenerator.prototype.generateImportsFromFile = function (importPath) {
        var _this = this;
        var names = []
            .concat(Object.keys(this.swagger.definitions || {}))
            .map(function (name) { return _this.converter.getNormalizer().normalize(name); })
            .join(",\n  ");
        return "import {\n  " + names + " \n} from '" + importPath + "'\n";
    };
    TypescriptClientGenerator.prototype.generateClient = function (clientName) {
        return this.converter.generateClient(clientName);
    };
    return TypescriptClientGenerator;
}());
exports.TypescriptClientGenerator = TypescriptClientGenerator;
