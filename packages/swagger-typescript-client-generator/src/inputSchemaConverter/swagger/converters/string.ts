import * as Swagger from "swagger-schema-official"
import { StringSchema } from "../../../models/schema"

export const convertSwaggerSchemaToStringSchema = (
  definition: Swagger.Schema
): StringSchema => {
  const enumerated = (definition.enum || []).map(e => String(e))
  return {
    type: "string",
    enum: enumerated?.length > 0 ? enumerated : undefined,
    description: definition.description,
    default:
      typeof definition.default !== "undefined"
        ? String(definition.default)
        : undefined
  }
}
