import { Parameter, Schema } from "swagger-schema-official"
import { ParametersArrayToSchemaConverter } from "./parameterArrayToSchemaConverter"

describe("ParametersArrayToSchemaConverter", () => {
  describe("convertToObject", () => {
    test("it should throw exception on falsy values", () => {
      const converter = new ParametersArrayToSchemaConverter()

      expect(() => {
        converter.convertToObject(null)
      }).toThrow("invalid argument")

      expect(() => {
        converter.convertToObject(undefined)
      }).toThrow("invalid argument")
    })

    test("it should return Schema#Object", () => {
      const converter = new ParametersArrayToSchemaConverter()

      const expected: Schema = {
        type: "object",
        required: [],
        properties: {}
      }

      expect(converter.convertToObject([])).toStrictEqual(expected)
    })

    test("it should have properties", () => {
      const converter = new ParametersArrayToSchemaConverter()

      const expected: Schema = {
        type: "object",
        required: [],
        properties: {
          test1: {
            name: "test1",
            type: "string",
            in: "header"
          } as any,
          test2: {
            name: "test2",
            type: "string",
            in: "header"
          } as any
        }
      }

      const parameters: Parameter[] = [
        {
          name: "test1",
          type: "string",
          in: "header"
        },
        {
          name: "test2",
          type: "string",
          in: "header"
        }
      ]

      expect(converter.convertToObject(parameters)).toStrictEqual(expected)
    })

    test("it should have properties", () => {
      const converter = new ParametersArrayToSchemaConverter()

      const expected: Schema = {
        type: "object",
        required: ["test2"],
        properties: {
          test1: {
            name: "test1",
            type: "string",
            in: "header"
          } as any,
          test2: {
            name: "test2",
            type: "string",
            in: "header",
            required: true
          } as any
        }
      }

      const parameters: Parameter[] = [
        {
          name: "test1",
          type: "string",
          in: "header"
        },
        {
          name: "test2",
          type: "string",
          in: "header",
          required: true
        }
      ]

      expect(converter.convertToObject(parameters)).toStrictEqual(expected)
    })
  })

  describe("convertToUnion", () => {
    test("it should throw exception on falsy values", () => {
      const converter = new ParametersArrayToSchemaConverter()

      expect(() => {
        converter.convertToUnion(null)
      }).toThrow("invalid argument")

      expect(() => {
        converter.convertToUnion(undefined)
      }).toThrow("invalid argument")
    })

    test("it should return Schema#Object", () => {
      const converter = new ParametersArrayToSchemaConverter()

      const expected: Schema = {
        allOf: []
      }

      expect(converter.convertToUnion([])).toStrictEqual(expected)
    })

    test("it should have properties", () => {
      const converter = new ParametersArrayToSchemaConverter()

      const expected: Schema = {
        allOf: [
          {
            name: "test1",
            type: "string",
            in: "header"
          } as any,
          {
            name: "test2",
            type: "string",
            in: "header"
          } as any
        ]
      }

      const parameters: Parameter[] = [
        {
          name: "test1",
          type: "string",
          in: "header"
        },
        {
          name: "test2",
          type: "string",
          in: "header"
        }
      ]

      expect(converter.convertToUnion(parameters)).toStrictEqual(expected)
    })
  })
})
