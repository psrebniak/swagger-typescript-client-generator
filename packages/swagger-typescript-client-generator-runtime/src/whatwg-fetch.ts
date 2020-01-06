import { RequestFactoryType } from "./index"
import { serialize } from "./serialize"

export type WhatWgFetchFunctionType = (
  input: RequestInfo,
  init?: RequestInit
) => Promise<Response>

export interface WhatWgFetchRequestFactoryOptions {
  requestInit: Omit<RequestInit, "body" | "method">
  fetch?: WhatWgFetchFunctionType
}

export const WhatWgFetchRequestFactory = (
  baseUrl: string,
  options: WhatWgFetchRequestFactoryOptions
): RequestFactoryType => (
  path,
  query,
  body,
  formData,
  headers,
  method,
  configuration: never
) => {
  const headersObject = new Headers(options.requestInit.headers || {})

  new Headers(headers).forEach((value, key) => {
    headersObject.set(key, String(value))
  })

  const fetchOptions: RequestInit = Object.assign({}, options.requestInit, {
    method: method,
    headers: headersObject
  })

  if (body && typeof body === "string") {
    fetchOptions.body = body
  } else if (body && typeof body === "object" && Object.keys(body).length > 0) {
    fetchOptions.body = JSON.stringify(body)
  } else if (formData && Object.keys(formData).length > 0) {
    fetchOptions.body = Object.keys(formData).reduce((data, key) => {
      data.append(key, formData[key])
      return data
    }, new FormData())
  }

  const hasQuery = query && Object.keys(query).length > 0
  const fullUrl = [
    baseUrl,
    path,
    hasQuery ? (path.includes("?") ? "&" : "?") : "",
    hasQuery ? serialize(query) : ""
  ].join("")

  const callback: WhatWgFetchFunctionType =
    typeof options.fetch === "function" ? options.fetch : fetch

  return callback(fullUrl, fetchOptions)
}
