export const serialize = function(obj: any, prefix = "") {
  const str: string[] = []
  let p: string
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + "[" + p + "]" : p
      const v = obj[p]
      str.push(
        v !== null && typeof v === "object"
          ? serialize(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v)
      )
    }
  }
  return str.join("&")
}
