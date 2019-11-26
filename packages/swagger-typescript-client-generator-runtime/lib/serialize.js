"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = function (obj, prefix) {
    if (prefix === void 0) { prefix = ""; }
    var str = [];
    var p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p;
            var v = obj[p];
            str.push(v !== null && typeof v === "object"
                ? exports.serialize(v, k)
                : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
};
//# sourceMappingURL=serialize.js.map