"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var typescriptNameNormalizer_1 = require("./typescriptNameNormalizer");
describe("TypescriptNameNormalizer", function () {
    it("it should return correct values when use dashes", function () {
        var normalizer = new typescriptNameNormalizer_1.TypescriptNameNormalizer();
        assert.deepEqual(normalizer.normalize("get-testing-dashes"), "GetTestingDashes");
    });
    it("it should split words by slash", function () {
        var normalizer = new typescriptNameNormalizer_1.TypescriptNameNormalizer();
        assert.deepEqual(normalizer.normalize("get-project/tasks"), "GetProjectTasks");
    });
    it("it should replace path params", function () {
        var normalizer = new typescriptNameNormalizer_1.TypescriptNameNormalizer();
        assert.deepEqual(normalizer.normalize("get-/project/{id}"), "GetProjectById");
        assert.deepEqual(normalizer.normalize("get-/project/{id}/tasks"), "GetProjectByIdTasks");
    });
    it("it ignores last slash", function () {
        var normalizer = new typescriptNameNormalizer_1.TypescriptNameNormalizer();
        assert.deepEqual(normalizer.normalize("get/project/"), "GetProject");
        assert.deepEqual(normalizer.normalize("get-/project/{id}/tasks/"), "GetProjectByIdTasks");
    });
});
//# sourceMappingURL=typescriptNameNormalizer.test.js.map