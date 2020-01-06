import { TypescriptConverter } from "./typescriptConverter"

describe("TypescriptConverter", () => {
  describe("should generate correct type values", () => {
    let converter: TypescriptConverter

    beforeAll(() => {
      converter = new TypescriptConverter(null, null)
    })

    test("it should generate correct enum type", () => {
      expect(
        converter.generateTypeValue({
          type: "enum",
          enum: ["1", "2", "3"]
        })
      ).toBe("1 | 2 | 3")

      expect(
        converter.generateTypeValue({
          type: "enum",
          enum: ['"int"', '"string"', '"bool"']
        })
      ).toBe('"int" | "string" | "bool"')
    })

    test("it should generate correct number type", () => {
      expect(
        converter.generateTypeValue({
          type: "number"
        })
      ).toBe("number")
      expect(
        converter.generateTypeValue({
          type: "integer"
        })
      ).toBe("number")
    })

    test("it should generate correct string type", () => {
      expect(
        converter.generateTypeValue({
          type: "string"
        })
      ).toBe("string")
    })

    test("it should generate correct boolean type", () => {
      expect(
        converter.generateTypeValue({
          type: "boolean"
        })
      ).toBe("boolean")
    })

    test("it should generate correct Array type", () => {
      expect(
        converter.generateTypeValue({
          type: "array",
          items: {
            type: "boolean"
          }
        })
      ).toBe("Array<boolean>")

      expect(
        converter.generateTypeValue({
          type: "array",
          items: {
            $ref: "definitions/SomeType"
          }
        })
      ).toBe("Array<SomeType>")
    })

    test("it should generate correct object type with properties", () => {
      expect(
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
        })
      ).toBe(`{\n'test1'?: boolean\n'test2'?: string\n}`)
    })

    test("it should generate correct object type with required properties", () => {
      expect(
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
        })
      ).toBe(`{\n'test1': boolean\n'test2'?: string\n}`)
    })

    test("it should generate correct object type with props and additional props", () => {
      expect(
        converter.generateTypeValue({
          type: "object",
          properties: {
            type: {
              type: "string"
            }
          },
          additionalProperties: {
            type: "boolean"
          }
        })
      ).toBe(`{\n'type'?: string\n} & { [key: string]: boolean }`)
    })

    test("it should generate correct object type with props and additional props", () => {
      expect(
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
        })
      ).toBe(`{\n'test1'?: string\n} & { [key: string]: string }`)
    })

    test("it should generate correct object type with no properties", () => {
      expect(
        converter.generateTypeValue({
          type: "object"
        })
      ).toBe(`{}`)
    })

    test("it should generate correct object type with props if type is not defined but properties are defined", () => {
      expect(
        converter.generateTypeValue({
          properties: {
            key: {
              type: "string"
            }
          }
        })
      ).toBe(`{\n'key'?: string\n}`)
    })

    test("it should generate correct object type with props if type is not defined but additionalProperties are defined", () => {
      expect(
        converter.generateTypeValue({
          additionalProperties: {
            type: "string"
          }
        })
      ).toBe(`{ [key: string]: string }`)
    })

    test("it should generate correct intersection type", () => {
      expect(
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
        })
      ).toBe("{\n'key'?: string\n} & {\n'value'?: string\n}")
    })

    test("it should generate correct type for unknown type", () => {
      expect(converter.generateTypeValue({})).toBe(`any`)
    })
  })
})
