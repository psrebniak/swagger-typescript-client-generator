import * as assert from "assert"
import { TypescriptNameNormalizer } from "./typescriptNameNormalizer"

describe("TypescriptNameNormalizer", () => {
  it("it should return correct values when use dashes", () => {
    const normalizer = new TypescriptNameNormalizer()

    assert.deepEqual(
      normalizer.normalize("get-testing-dashes"),
      "GetTestingDashes"
    )
  })

  it("it should split words by slash", () => {
    const normalizer = new TypescriptNameNormalizer()

    assert.deepEqual(
      normalizer.normalize("get-project/tasks"),
      "GetProjectTasks"
    )
  })

  it("it should replace path params", () => {
    const normalizer = new TypescriptNameNormalizer()

    assert.deepEqual(
      normalizer.normalize("get-/project/{id}"),
      "GetProjectById"
    )

    assert.deepEqual(
      normalizer.normalize("get-/project/{id}/tasks"),
      "GetProjectByIdTasks"
    )
  })

  it("it ignores last slash", () => {
    const normalizer = new TypescriptNameNormalizer()

    assert.deepEqual(normalizer.normalize("get/project/"), "GetProject")

    assert.deepEqual(
      normalizer.normalize("get-/project/{id}/tasks/"),
      "GetProjectByIdTasks"
    )
  })
})
