"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withHeaders = function (requestFactory, overrideHeaders) {
    return function (path, query, body, formData, headers, method, configuration) {
        var headersObject = new Headers(headers || {});
        new Headers(overrideHeaders).forEach(function (value, key) {
            headersObject.set(key, String(value));
        });
        return requestFactory(path, query, body, formData, headersObject, method, configuration);
    };
};
//# sourceMappingURL=withHeaders.js.map