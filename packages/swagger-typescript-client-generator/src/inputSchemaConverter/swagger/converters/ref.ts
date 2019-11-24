import * as Swagger from "swagger-schema-official"

import { RefSchema } from "../../../models/schema"

export const convertSwaggerSchemaToRefSchema = (
  definition: Swagger.Schema
): RefSchema => {
  return {
    type: "ref",
    ref: definition.$ref,
    description: definition.description
  }
}
