import { TypescriptNameNormalizer } from "./typescriptNameNormalizer"

describe("TypescriptNameNormalizer", () => {
  test("it should return correct values when use dashes", () => {
    const normalizer = new TypescriptNameNormalizer()

    expect(normalizer.normalize("get-testing-dashes")).toBe("GetTestingDashes")
  })

  test("it should split words by slash", () => {
    const normalizer = new TypescriptNameNormalizer()

    expect(normalizer.normalize("get-project/tasks")).toBe("GetProjectTasks")
  })

  test("it should replace path params", () => {
    const normalizer = new TypescriptNameNormalizer()

    expect(normalizer.normalize("get-/project/{id}")).toBe("GetProjectById")

    expect(normalizer.normalize("get-/project/{id}/tasks")).toBe(
      "GetProjectByIdTasks"
    )
  })

  test("it ignores last slash", () => {
    const normalizer = new TypescriptNameNormalizer()

    expect(normalizer.normalize("get/project/")).toBe("GetProject")

    expect(normalizer.normalize("get-/project/{id}/tasks/")).toBe(
      "GetProjectByIdTasks"
    )
  })
})
