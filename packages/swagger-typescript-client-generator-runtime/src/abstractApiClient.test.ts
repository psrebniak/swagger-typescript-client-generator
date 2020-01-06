import * as assert from "assert"
import { AbstractApiClient } from "./abstractApiClient"

interface ApiClientConfig {
  baseUrl: string
}

describe("Runtime", () => {
  test("abstract api client does not cause typescript error", () => {
    class ApiClient extends AbstractApiClient<ApiClientConfig> {}
    expect(
      new ApiClient({ baseUrl: "http://example.com" }, undefined)
    ).toBeInstanceOf(ApiClient)
  })
})
