"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serialize_1 = require("./serialize");
exports.WhatWgFetchRequestFactory = function (baseUrl, options) { return function (path, query, body, formData, headers, method, configuration) {
    var headersObject = new Headers(options.requestInit.headers || {});
    new Headers(headers).forEach(function (value, key) {
        headersObject.set(key, String(value));
    });
    var fetchOptions = Object.assign({}, options.requestInit, {
        method: method,
        headers: headersObject
    });
    if (body && typeof body === "string") {
        fetchOptions.body = body;
    }
    else if (body && typeof body === "object" && Object.keys(body).length > 0) {
        fetchOptions.body = JSON.stringify(body);
    }
    else if (formData && Object.keys(formData).length > 0) {
        fetchOptions.body = Object.keys(formData).reduce(function (data, key) {
            data.append(key, formData[key]);
            return data;
        }, new FormData());
    }
    var hasQuery = query && Object.keys(query).length > 0;
    var fullUrl = [
        baseUrl,
        path,
        hasQuery ? (path.includes("?") ? "&" : "?") : "",
        hasQuery ? serialize_1.serialize(query) : ""
    ].join("");
    var callback = typeof options.fetch === "function" ? options.fetch : fetch;
    return callback(fullUrl, fetchOptions);
}; };
