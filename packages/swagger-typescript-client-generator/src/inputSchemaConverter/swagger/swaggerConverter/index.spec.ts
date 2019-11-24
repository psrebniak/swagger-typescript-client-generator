test.each([
  ["null", null, /falsy value/],
  ["empty object", {}, /not supported/],
  ["invalid version", { swagger: "1.0" }, /not supported/]
])(
  `Swagger reader throws error when %s is given`,
  (name, value: any, expected: any) => {
    expect(() => {
      new SwaggerReader(value)
    }).toThrowError(expected)
  }
)
