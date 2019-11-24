import { Schema } from "./schema"

export type ParameterType = "path" | "body" | "query" | "header"

interface Parameter {
  /**
   * unique ID
   */
  id: string
  type: ParameterType
  required: boolean
  schema: Schema
  description: string

  /**
   * allow to use custom formatters
   * Default formatters:
   *  - path parameter: "encodeURIComponent"
   *  - query parameter: "encodeURIComponent"
   *  - body parameter: "{{ content-type }}",
   *  - header parameter: "header"
   *  - other: none
   */
  formatter?: "string"
}

export interface PathParameter extends Parameter {
  type: "path"
  name: string
}

export interface QueryParameter extends Parameter {
  type: "query"
}

export interface BodyParameter extends Parameter {
  type: "body"
}

export interface HeaderParameter extends Parameter {
  type: "header"
}
