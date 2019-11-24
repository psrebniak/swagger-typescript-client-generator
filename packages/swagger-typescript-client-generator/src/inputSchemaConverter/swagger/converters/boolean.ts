import * as Swagger from "swagger-schema-official"

import { BooleanSchema } from "../../../models/schema"

const convertBooleanValue = (val: any): boolean => {
  if (typeof val === "boolean") {
    return val
  }
  return ["1", "on", "true"].includes(String(val).toLowerCase())
}

export const convertSwaggerSchemaToBooleanSchema = (
  definition: Swagger.Schema
): BooleanSchema => {
  const enumerated = (definition.enum || []).map(e => convertBooleanValue(e))
  return {
    type: "boolean",
    enum: enumerated.length > 0 ? enumerated : undefined,
    description: definition.description,
    default:
      typeof definition.default !== "undefined"
        ? convertBooleanValue(definition.default)
        : undefined
  }
}
