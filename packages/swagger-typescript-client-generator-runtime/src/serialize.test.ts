import { serialize } from "./serialize"

describe("Runtime: serializer should be able to serialize objects", () => {
  test("should serialize falsy values", () => {
    expect(serialize({})).toBe("")
    expect(serialize(null)).toBe("")
    expect(serialize(undefined)).toBe("")
  })

  test("should serialize primitives", () => {
    expect(
      serialize({
        key1: "string",
        key2: 1,
        key3: true
      })
    ).toBe("key1=string&key2=1&key3=true")
  })

  test("should serialize arrays", () => {
    expect(
      serialize({
        array: [true, "2", 3, 0]
      })
    ).toBe("array%5B0%5D=true&array%5B1%5D=2&array%5B2%5D=3&array%5B3%5D=0")
  })

  test("should serialize objects", () => {
    expect(
      serialize({
        object: {
          key1: "string",
          key2: 1,
          key3: true
        }
      })
    ).toBe("object%5Bkey1%5D=string&object%5Bkey2%5D=1&object%5Bkey3%5D=true")
  })
})
