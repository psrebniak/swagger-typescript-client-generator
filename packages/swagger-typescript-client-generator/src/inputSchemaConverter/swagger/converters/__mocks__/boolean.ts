import * as Swagger from "swagger-schema-official"

export const boolean: Swagger.Schema[] = [
  {
    type: "boolean",
    description: "type number"
  },
  {
    type: "boolean",
    default: true,
    description: "type and positive default"
  },
  {
    type: "boolean",
    default: false,
    description: "type and negative default"
  },
  {
    type: "boolean",
    default: 0,
    description: "type and numeric negative falsy default"
  },
  {
    type: "boolean",
    default: 1,
    description: "type and numeric truthy default"
  },
  {
    type: "boolean",
    default: "on" as any,
    description: "type and string default"
  },
  {
    type: "boolean",
    format: "timestamp",
    description: "type and format"
  },
  {
    type: "boolean",
    enum: [],
    description: "type and empty enum"
  },
  {
    type: "boolean",
    enum: [false, true],
    description: "type and boolean enum"
  },
  {
    type: "boolean",
    enum: [true, false, "2", 3],
    description: "type and mixed enum"
  }
]
