import { convertSwaggerSchemaToNormalizedSchema } from "./index"
import * as Swagger from "swagger-schema-official"

const testCases: Swagger.Schema[] = [
  {
    type: "array",
    description: "type without items"
  },
  {
    type: "array",
    items: {},
    description: "type with single item"
  }
]
const type = "array"

test.each(testCases.map(item => [item.description, item]))(
  `converter converts scenario "%s"`,
  (description, definition) => {
    const spec = convertSwaggerSchemaToNormalizedSchema(definition as unknown)
    expect(spec.type).toEqual(type)
    expect(spec).toMatchSnapshot()
  }
)
