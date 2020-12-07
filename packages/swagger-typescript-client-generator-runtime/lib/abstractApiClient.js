"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractApiClient = void 0;
var AbstractApiClient = /** @class */ (function () {
    function AbstractApiClient(configuration, requestFactory) {
        this.configuration = configuration;
        this.requestFactory = requestFactory;
    }
    return AbstractApiClient;
}());
exports.AbstractApiClient = AbstractApiClient;
