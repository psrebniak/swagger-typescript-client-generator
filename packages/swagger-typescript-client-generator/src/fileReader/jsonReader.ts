import { FileReaderOptions } from "./options"
import { FileReader } from "./fileReader"
import * as fs from "fs"
import { Spec } from "swagger-schema-official"

export const jsonReader: FileReader = (options: FileReaderOptions): Spec => {
  const content = fs.readFileSync(options.file, {
    encoding: "UTF-8",
    flag: "r",
  })
  return (JSON.parse(content) as unknown) as Spec
}
