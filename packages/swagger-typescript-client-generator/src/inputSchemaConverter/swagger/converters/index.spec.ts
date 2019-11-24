import { convertSwaggerSchemaToNormalizedSchema } from "./index"
import * as mocks from "./__mocks__"

describe.each(Object.entries(mocks))(
  `swagger definition converter for type "%s"`,
  (type, list) => {
    test.each(list.map(item => [item.description, item]))(
      `converter converts scenario "%s"`,
      (description, definition) => {
        const spec = convertSwaggerSchemaToNormalizedSchema(definition as any)
        expect(spec.type).toEqual(type)
        expect(spec).toMatchSnapshot()
      }
    )
  }
)
