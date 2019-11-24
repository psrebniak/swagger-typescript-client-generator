"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var parametersJarFactory_1 = require("./parametersJarFactory");
var protectedSwagger = {
    securityDefinitions: {
        apiKey: {
            type: "apiKey",
            in: "header"
        }
    },
    paths: {
        "/project": {
            get: {
                parameters: [
                    {
                        name: "token",
                        description: "Auth token",
                        required: false,
                        type: "string",
                        in: "query"
                    }
                ],
                security: [
                    {
                        apiKey: []
                    }
                ],
                responses: {
                    200: {
                        description: ""
                    }
                }
            }
        }
    }
};
var refSwagger = {
    swagger: "2.0",
    info: {
        version: "0.0.0",
        title: "<enter your title>"
    },
    parameters: {
        id: {
            name: "id",
            in: "query",
            description: "id",
            required: true,
            type: "string"
        }
    },
    paths: {
        "/persons": {
            parameters: [
                {
                    $ref: "#/parameters/id"
                }
            ],
            get: {
                description: "Gets `Person` object.",
                parameters: [
                    {
                        name: "token",
                        description: "Auth token",
                        required: false,
                        type: "string",
                        in: "query"
                    }
                ],
                responses: {
                    200: {
                        description: "Successful response"
                    }
                }
            }
        }
    }
};
describe("ParametersJarFactory", function () {
    it("it should not throw if operation security is not defined", function () {
        var factory = new parametersJarFactory_1.ParametersJarFactory(refSwagger);
        var operation = refSwagger.paths["/persons"].get;
        assert.doesNotThrow(function () { return factory.createFromOperation(operation); }, "should not throw");
    });
    it("it should include security if is defined", function () {
        var factory = new parametersJarFactory_1.ParametersJarFactory(protectedSwagger);
        var operation = protectedSwagger.paths["/project"].get;
        assert.deepEqual(factory.createFromOperation(operation), {
            pathParams: [],
            queryParams: [
                {
                    name: "token",
                    description: "Auth token",
                    required: false,
                    type: "string",
                    in: "query"
                }
            ],
            bodyParams: [],
            formDataParams: [],
            headerParams: [{ type: "apiKey", in: "header" }]
        }, "should contain auth token");
    });
});
//# sourceMappingURL=parametersJarFactory.test.js.map