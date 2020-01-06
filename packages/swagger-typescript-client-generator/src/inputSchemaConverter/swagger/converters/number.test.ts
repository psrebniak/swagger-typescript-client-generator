import { convertSwaggerSchemaToNormalizedSchema } from "./index"
import * as Swagger from "swagger-schema-official"

const testCases: Swagger.Schema[] = [
  {
    type: "number",
    description: "type number"
  },
  {
    type: "integer",
    description: "type integer"
  },
  {
    type: "number",
    minimum: 1,
    description: "type and numeric minimum"
  },
  {
    type: "number",
    minimum: ("1" as unknown) as number,
    description: "type and string minimum"
  },
  {
    type: "number",
    maximum: 1,
    description: "type and numeric maximum"
  },
  {
    type: "number",
    maximum: ("1" as unknown) as number,
    description: "type and string maximum"
  },
  {
    type: "number",
    default: 1,
    description: "type and numeric default"
  },
  {
    type: "number",
    default: ("1" as unknown) as number,
    description: "type and string default"
  },
  {
    type: "number",
    format: "timestamp",
    description: "type and format"
  },
  {
    type: "number",
    enum: [],
    description: "type and empty enum"
  },
  {
    type: "number",
    enum: [1, 2, 3],
    description: "type and numeric enum"
  },
  {
    type: "number",
    enum: [true, "2", 3],
    description: "type and mixed enum"
  }
]

const type = "number"

test.each(testCases.map(item => [item.description, item]))(
  `converter converts scenario "%s"`,
  (description, definition) => {
    const spec = convertSwaggerSchemaToNormalizedSchema(definition as unknown)
    expect(spec.type).toEqual(type)
    expect(spec).toMatchSnapshot()
  }
)
