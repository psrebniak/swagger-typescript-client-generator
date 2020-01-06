import { Operation, Spec } from "swagger-schema-official"
import { ParametersJarFactory } from "./parametersJarFactory"

const protectedSwagger: Spec = {
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
          } as any
        ],
        responses: {
          200: {
            description: ""
          }
        }
      }
    }
  }
} as any

const refSwagger: Spec = {
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
}

describe("ParametersJarFactory", () => {
  test("it should not throw if operation security is not defined", () => {
    const factory = new ParametersJarFactory(refSwagger)
    const operation: Operation = refSwagger.paths["/persons"].get

    expect(factory.createFromOperation(operation)).toBeTruthy()
  })

  test("it should include security if is defined", () => {
    const factory = new ParametersJarFactory(protectedSwagger)
    const operation: Operation = protectedSwagger.paths["/project"].get

    expect(factory.createFromOperation(operation)).toStrictEqual({
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
    })
  })
})
