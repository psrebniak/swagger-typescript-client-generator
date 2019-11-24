"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var abstractApiClient_1 = require("./abstractApiClient");
describe("Runtime: abstract api client does not cause typescript error", function () {
    var ApiClient = /** @class */ (function (_super) {
        __extends(ApiClient, _super);
        function ApiClient() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ApiClient;
    }(abstractApiClient_1.AbstractApiClient));
    assert.doesNotThrow(function () {
        new ApiClient({ baseUrl: "http://example.com" }, undefined);
    }, "new instance can be created");
});
//# sourceMappingURL=abstractApiClient.test.js.map