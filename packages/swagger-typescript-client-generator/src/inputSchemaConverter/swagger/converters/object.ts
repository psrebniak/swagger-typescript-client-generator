import * as Swagger from "swagger-schema-official"

import { ObjectSchema, ObjectSchemaProperty } from "../../../models/schema"
import { convertSwaggerSchemaToNormalizedSchema } from "./index"

export const convertSwaggerSchemaToObjectSchema = (
  definition: Swagger.Schema
): ObjectSchema => {
  return {
    type: "object",
    description: definition.description,
    properties: Object.entries(definition.properties || {}).map(
      ([name, property]): ObjectSchemaProperty => ({
        name: name,
        schema: convertSwaggerSchemaToNormalizedSchema(property),
        required: (definition.required || []).includes(name),
        readOnly: property.readOnly
      })
    ),
    additionalProperties: definition.additionalProperties
      ? convertSwaggerSchemaToNormalizedSchema(definition.additionalProperties)
      : undefined
  }
}
