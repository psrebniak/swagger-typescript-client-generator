"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypescriptNameNormalizer = /** @class */ (function () {
    function TypescriptNameNormalizer() {
    }
    TypescriptNameNormalizer.prototype.normalize = function (name) {
        return name
            .split(/[\/.-]/g)
            .filter(Boolean)
            .map(function (segment) {
            if (segment[0] === "{" && segment[segment.length - 1] === "}") {
                segment =
                    "By" +
                        segment[1].toUpperCase() +
                        segment.substring(2, segment.length - 1);
            }
            return segment;
        })
            .map(function (str) {
            return str.replace(/[^a-zA-Z0-9_]/g, "");
        })
            .map(function (str) {
            return str[0].toUpperCase() + str.substr(1);
        })
            .join("");
    };
    return TypescriptNameNormalizer;
}());
exports.TypescriptNameNormalizer = TypescriptNameNormalizer;
//# sourceMappingURL=typescriptNameNormalizer.js.map