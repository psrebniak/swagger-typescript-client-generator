import * as Swagger from "swagger-schema-official"

import { Schema } from "../../../models/schema"
import {
  DEFINITION_TYPE_ARRAY,
  DEFINITION_TYPE_BOOLEAN,
  DEFINITION_TYPE_INTEGER,
  DEFINITION_TYPE_NUMBER,
  DEFINITION_TYPE_OBJECT,
  DEFINITION_TYPE_STRING
} from "../../../swaggerTypes"

import { convertSwaggerSchemaToArraySchema } from "./array"
import { convertSwaggerSchemaToBooleanSchema } from "./boolean"
import { convertSwaggerSchemaToIntersectionSchema } from "./intersection"
import { convertSwaggerSchemaToNumberSchema } from "./number"
import { convertSwaggerSchemaToObjectSchema } from "./object"
import { convertSwaggerSchemaToRefSchema } from "./ref"
import { convertSwaggerSchemaToStringSchema } from "./string"
import { convertSwaggerSchemaToUnknownSchema } from "./unknown"

export const convertSwaggerSchemaToNormalizedSchema = (
  definition: Swagger.Schema & { schema?: Swagger.Schema }
): Schema => {
  if (definition.schema) {
    return convertSwaggerSchemaToNormalizedSchema(definition.schema)
  }

  if (definition.$ref) {
    return convertSwaggerSchemaToRefSchema(definition)
  }

  if (Array.isArray(definition.allOf) && definition.allOf.length > 0) {
    return convertSwaggerSchemaToIntersectionSchema(definition.allOf)
  }

  switch (definition.type) {
    case DEFINITION_TYPE_STRING:
      return convertSwaggerSchemaToStringSchema(definition)
    case DEFINITION_TYPE_NUMBER:
    case DEFINITION_TYPE_INTEGER:
      return convertSwaggerSchemaToNumberSchema(definition)
    case DEFINITION_TYPE_BOOLEAN:
      return convertSwaggerSchemaToBooleanSchema(definition)
    case DEFINITION_TYPE_ARRAY:
      return convertSwaggerSchemaToArraySchema(definition)
    case DEFINITION_TYPE_OBJECT:
      return convertSwaggerSchemaToObjectSchema(definition)
  }

  return convertSwaggerSchemaToUnknownSchema(definition)
}
