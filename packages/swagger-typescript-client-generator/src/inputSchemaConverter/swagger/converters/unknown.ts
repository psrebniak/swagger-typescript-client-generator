import * as Swagger from "swagger-schema-official"
import { UnknownSchema } from "../../../models/schema"

export const convertSwaggerSchemaToUnknownSchema = (
  definition: Swagger.Schema
): UnknownSchema => {
  return {
    type: "unknown",
    description: definition.description
  }
}
