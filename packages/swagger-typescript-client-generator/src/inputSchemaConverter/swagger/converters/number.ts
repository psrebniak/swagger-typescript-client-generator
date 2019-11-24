import * as Swagger from "swagger-schema-official"

import { NumberSchema } from "../../../models/schema"

export const convertSwaggerSchemaToNumberSchema = (
  definition: Swagger.Schema
): NumberSchema => {
  const enumerated = (definition.enum || []).map(e => Number(e))
  return {
    type: "number",
    enum: enumerated.length > 0 ? enumerated : undefined,
    description: definition.description,
    maximum: definition.maximum,
    minimum: definition.minimum,
    default:
      typeof definition.default !== "undefined"
        ? Number(definition.default)
        : undefined,
    format: definition.format
  }
}
