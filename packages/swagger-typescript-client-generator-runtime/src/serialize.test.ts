import * as assert from "assert"
import { serialize } from "./serialize"

describe("Runtime: serializer should be able to serialize objects", () => {
  it("should serialize falsy values", () => {
    assert.deepEqual(
      serialize({}),
      "",
      "empty object serialized to empty string"
    )
    assert.deepEqual(serialize(null), "", "null serialized to empty string")
    assert.deepEqual(
      serialize(undefined),
      "",
      "undefined serialized to empty string"
    )
  })

  it("should serialize primitives", () => {
    assert.deepEqual(
      serialize({
        key1: "string",
        key2: 1,
        key3: true
      }),
      "key1=string&key2=1&key3=true"
    )
  })

  it("should serialize arrays", () => {
    assert.deepEqual(
      serialize({
        array: [true, "2", 3, 0]
      }),
      "array%5B0%5D=true&array%5B1%5D=2&array%5B2%5D=3&array%5B3%5D=0",
      "array with primitives is properly serialized"
    )
  })

  it("should serialize objects", () => {
    assert.deepEqual(
      serialize({
        object: {
          key1: "string",
          key2: 1,
          key3: true
        }
      }),
      "object%5Bkey1%5D=string&object%5Bkey2%5D=1&object%5Bkey3%5D=true"
    )
  })
})
