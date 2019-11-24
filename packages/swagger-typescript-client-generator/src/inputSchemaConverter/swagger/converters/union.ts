import * as Swagger from "swagger-schema-official"

import { UnionSchema } from "../../../models/schema"
import { convertSwaggerSchemaToNormalizedSchema } from "./index"

export const convertSwaggerSchemaToUnionSchema = (
  definitions: Swagger.Schema[]
): UnionSchema => {
  return {
    type: "union",
    items: definitions.map(d => convertSwaggerSchemaToNormalizedSchema(d))
  }
}
