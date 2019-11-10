import { AbstractApiClient } from "./abstractApiClient"

interface ApiClientConfig {
  baseUrl: string
}

describe("Runtime: abstract api client does not cause typescript error", () => {
  class ApiClient extends AbstractApiClient<ApiClientConfig> {}

  new ApiClient({ baseUrl: "http://example.com" }, undefined)
})
