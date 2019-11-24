export type SchemaType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "ref"
  | "array"
  | "union"
  | "intersection"
  | "unknown"

export interface Schema {
  type: SchemaType
  description?: string
}

export interface StringSchema extends Schema {
  type: "string"
  enum?: string[]
  default?: string
  format?: string
}

export interface NumberSchema extends Schema {
  type: "number"
  enum?: number[]
  minimum?: number
  maximum?: number
  default?: number
  format?: string
}

export interface BooleanSchema extends Schema {
  type: "boolean"
  enum?: boolean[]
  default?: boolean
}

export interface ObjectSchemaProperty {
  name: string
  schema: Schema
  required?: boolean
  nullable?: boolean
  readOnly?: boolean
}

export interface ObjectSchema extends Schema {
  type: "object"
  properties: ObjectSchemaProperty[]
  additionalProperties?: Schema
}

export interface ArraySchema extends Schema {
  type: "array"
  items: Schema
}

export interface RefSchema extends Schema {
  type: "ref"
  ref: string
}

export interface UnionSchema extends Schema {
  type: "union"
  items: Schema[]
}

export interface IntersectionSchema extends Schema {
  type: "intersection"
  items: Schema[]
}

export interface UnknownSchema extends Schema {
  type: "unknown"
}
