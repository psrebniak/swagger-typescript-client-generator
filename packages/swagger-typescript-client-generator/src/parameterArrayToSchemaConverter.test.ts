import * as assert from "assert"
import { throws } from "assert"
import { Parameter, Schema } from "swagger-schema-official"
import { ParametersArrayToSchemaConverter } from "./parameterArrayToSchemaConverter"

describe("ParametersArrayToSchemaConverter", () => {
  describe("convertToObject", () => {
    it("it should throw exception on falsy values", () => {
      const converter = new ParametersArrayToSchemaConverter()

      throws(() => {
        converter.convertToObject(null)
      }, "invalid argument exception")

      throws(() => {
        converter.convertToObject(undefined)
      }, "invalid argument exception")
    })

    it("it should return Schema#Object", () => {
      const converter = new ParametersArrayToSchemaConverter()

      const expected: Schema = {
        type: "object",
        required: [],
        properties: {}
      }

      assert.deepEqual(
        converter.convertToObject([]),
        expected,
        "should return Schema with type object"
      )
    })

    it("it should have properties", () => {
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

      assert.deepEqual(
        converter.convertToObject(parameters),
        expected,
        "should return Schema with properties"
      )
    })

    it("it should have properties", () => {
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

      assert.deepEqual(
        converter.convertToObject(parameters),
        expected,
        "should return Schema with required property"
      )
    })
  })

  describe("convertToUnion", () => {
    it("it should throw exception on falsy values", () => {
      const converter = new ParametersArrayToSchemaConverter()

      throws(() => {
        converter.convertToUnion(null)
      }, "invalid argument exception")

      throws(() => {
        converter.convertToUnion(undefined)
      }, "invalid argument exception")
    })

    it("it should return Schema#Object", () => {
      const converter = new ParametersArrayToSchemaConverter()

      const expected: Schema = {
        allOf: []
      }

      assert.deepEqual(
        converter.convertToUnion([]),
        expected,
        "should return Schema with type object"
      )
    })

    it("it should have properties", () => {
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

      assert.deepEqual(
        converter.convertToUnion(parameters),
        expected,
        "should return Schema with properties"
      )
    })
  })
})
