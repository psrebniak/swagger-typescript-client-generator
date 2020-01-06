import * as Swagger from "swagger-schema-official"
import { convertSwaggerSchemaToNormalizedSchema } from "./index"

const testCases: Swagger.Schema[] = [
  {
    type: undefined,
    allOf: [
      {
        type: "boolean"
      },
      {
        type: "number"
      }
    ],
    description: "allOf should create intersection"
  }
]

test.each(testCases.map(item => [item.description, item]))(
  `converter converts scenario "%s"`,
  (description, definition) => {
    const spec = convertSwaggerSchemaToNormalizedSchema(definition as unknown)
    expect(spec).toMatchSnapshot()
  }
)
