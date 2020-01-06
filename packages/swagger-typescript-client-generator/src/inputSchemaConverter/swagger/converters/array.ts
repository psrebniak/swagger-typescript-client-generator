import * as Swagger from "swagger-schema-official"

import { ArraySchema, Schema } from "../../../models/schema"
import { convertSwaggerSchemaToNormalizedSchema } from "./index"
import { convertSwaggerSchemaToUnionSchema } from "./union"

export const convertSwaggerSchemaToArraySchema = (
  definition: Swagger.Schema
): ArraySchema => {
  let items: Schema = {
    type: "unknown"
  }

  if (definition.items) {
    items = Array.isArray(definition.items)
      ? convertSwaggerSchemaToUnionSchema(definition.items)
      : convertSwaggerSchemaToNormalizedSchema(definition.items)
  }

  return {
    type: "array",
    items: items,
    description: definition.description
  }
}
