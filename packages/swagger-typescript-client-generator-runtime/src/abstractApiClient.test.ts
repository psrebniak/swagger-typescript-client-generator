import * as assert from "assert"
import { AbstractApiClient } from "./abstractApiClient"

interface ApiClientConfig {
  baseUrl: string
}

describe("Runtime: abstract api client does not cause typescript error", () => {
  class ApiClient extends AbstractApiClient<ApiClientConfig> {}
  assert.doesNotThrow(() => {
    new ApiClient({ baseUrl: "http://example.com" }, undefined)
  }, "new instance can be created")
})
