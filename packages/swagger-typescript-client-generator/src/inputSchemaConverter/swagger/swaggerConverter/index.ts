import { Spec } from "../../../models/Spec"
import * as Swagger from "swagger-schema-official"

const acceptedVersions: string[] = ["2", "2.0"]

export class SwaggerConverter {
  protected spec: Swagger.Spec

  constructor(spec: Swagger.Spec) {
    if (!spec) {
      throw new Error("Spec cannot be falsy value")
    }
    if (!acceptedVersions.includes(String(spec.swagger))) {
      throw new Error(`Spec version "${spec.swagger}" is not supported`)
    }
  }

  read(): Spec {
    const output: Spec = {
      definitions: {}
    }

    Object.entries(this.spec.definitions || {}).map(([name, definition]) => {
      const id = `#/definitions/${name}`
      output.definitions[id] = this.generateSchema(definition)
    })

    return output
  }
}
