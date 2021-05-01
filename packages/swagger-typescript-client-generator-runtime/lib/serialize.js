"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = void 0;
// https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object/1714899#1714899
var serialize = function (obj, prefix) {
    if (prefix === void 0) { prefix = ""; }
    var str = [];
    var p;
    for (p in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, p)) {
            var k = prefix ? prefix + "[" + p + "]" : p;
            var v = obj[p];
            str.push(v !== null && typeof v === "object"
                ? exports.serialize(v, k)
                : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
};
exports.serialize = serialize;
