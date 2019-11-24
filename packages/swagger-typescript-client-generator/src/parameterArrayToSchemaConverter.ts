import { Parameter, Schema } from "swagger-schema-official"

export class ParametersArrayToSchemaConverter {
  public convertToObject(parameters: Parameter[]): Schema {
    if (!Array.isArray(parameters)) {
      throw new Error("invalid argument")
    }

    const schema: Schema = {
      type: "object",
      required: parameters
        .filter(param => Boolean(param.required))
        .map(param => param.name),
      properties: {}
    }

    parameters.forEach(param => {
      schema.properties[param.name] = (param as any) as Schema
    })

    return schema
  }

  public convertToUnion(parameters: Parameter[]): Schema {
    if (!Array.isArray(parameters)) {
      throw new Error("invalid argument")
    }

    return {
      allOf: (parameters as any) as Schema[]
    }
  }
}
