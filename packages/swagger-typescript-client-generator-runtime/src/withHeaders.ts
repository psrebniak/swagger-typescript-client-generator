import { RequestFactoryType } from "./index"

export const withHeaders = (
  requestFactory: RequestFactoryType,
  overrideHeaders: Headers
): RequestFactoryType => {
  return (path, query, body, formData, headers, method, configuration) => {
    const headersObject = new Headers(headers || {})
    new Headers(overrideHeaders).forEach((value, key) => {
      headersObject.set(key, String(value))
    })
    return requestFactory(
      path,
      query,
      body,
      formData,
      headersObject,
      method,
      configuration
    )
  }
}
