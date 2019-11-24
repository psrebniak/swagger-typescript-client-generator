import * as Swagger from "swagger-schema-official"

export const array: Swagger.Schema[] = [
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
