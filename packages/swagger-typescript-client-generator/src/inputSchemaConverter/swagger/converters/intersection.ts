import * as Swagger from "swagger-schema-official"

import { IntersectionSchema } from "../../../models/schema"
import { convertSwaggerSchemaToNormalizedSchema } from "./index"

export const convertSwaggerSchemaToIntersectionSchema = (
  definitions: Swagger.Schema[]
): IntersectionSchema => {
  return {
    type: "intersection",
    items: definitions.map(d => convertSwaggerSchemaToNormalizedSchema(d))
  }
}
