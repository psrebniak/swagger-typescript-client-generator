import * as assert from "assert"
import { TypescriptConverter } from "./typescriptConverter"

describe("TypescriptConverter", () => {
  describe("should generate correct type values", () => {
    let converter: TypescriptConverter

    before(() => {
      converter = new TypescriptConverter(null, null)
    })

    it("it should generate correct enum type", () => {
      assert.deepEqual(
        converter.generateTypeValue({
          type: "enum",
          enum: ["1", "2", "3"]
        }),
        "1 | 2 | 3"
      )
      assert.deepEqual(
        converter.generateTypeValue({
          type: "enum",
          enum: ['"int"', '"string"', '"bool"']
        }),
        '"int" | "string" | "bool"'
      )
    })

    it("it should generate correct number type", () => {
      assert.deepEqual(
        converter.generateTypeValue({
          type: "number"
        }),
        "number"
      )
      assert.deepEqual(
        converter.generateTypeValue({
          type: "integer"
        }),
        "number"
      )
    })

    it("it should generate correct string type", () => {
      assert.deepEqual(
        converter.generateTypeValue({
          type: "string"
        }),
        "string"
      )
    })

    it("it should generate correct boolean type", () => {
      assert.deepEqual(
        converter.generateTypeValue({
          type: "boolean"
        }),
        "boolean"
      )
    })

    it("it should generate correct Array type", () => {
      assert.deepEqual(
        converter.generateTypeValue({
          type: "array",
          items: {
            type: "boolean"
          }
        }),
        "Array<boolean>"
      )

      assert.deepEqual(
        converter.generateTypeValue({
          type: "array",
          items: {
            $ref: "definitions/SomeType"
          }
        }),
        "Array<SomeType>"
      )
    })

    it("it should generate correct object type with properties", () => {
      assert.deepEqual(
        converter.generateTypeValue({
          type: "object",
          properties: {
            test1: {
              type: "boolean"
            },
            test2: {
              type: "string"
            }
          }
        }),
        `{\n'test1'?: boolean\n'test2'?: string\n}`
      )
    })

    it("it should generate correct object type with required properties", () => {
      assert.deepEqual(
        converter.generateTypeValue({
          type: "object",
          properties: {
            test1: {
              type: "boolean"
            },
            test2: {
              type: "string"
            }
          },
          required: ["test1"]
        }),
        `{\n'test1': boolean\n'test2'?: string\n}`
      )
    })

    it("it should generate correct object type with additional props", () => {
      assert.deepEqual(
        converter.generateTypeValue({
          type: "object",
          additionalProperties: {
            type: "string"
          }
        }),
        `string`
      )
    })

    it("it should generate correct object type with props and additional props", () => {
      assert.deepEqual(
        converter.generateTypeValue({
          type: "object",
          properties: {
            test1: {
              type: "string"
            }
          },
          additionalProperties: {
            type: "string"
          }
        }),
        `{\n'test1'?: string\n} & string`
      )
    })

    it("it should generate correct object type with no props", () => {
      assert.deepEqual(
        converter.generateTypeValue({
          type: "object"
        }),
        `void`
      )
    })

    it("it should generate correct intersection type", () => {
      assert.deepEqual(
        converter.generateTypeValue({
          type: "object",
          allOf: [
            {
              type: "object",
              properties: {
                key: {
                  type: "string"
                }
              }
            },
            {
              type: "object",
              properties: {
                value: {
                  type: "string"
                }
              }
            }
          ]
        }),
        "{\n'key'?: string\n} & {\n'value'?: string\n}"
      )
    })

    it("it should generate correct type for unknown type", () => {
      assert.deepEqual(converter.generateTypeValue({}), `any`)
    })
  })
})
