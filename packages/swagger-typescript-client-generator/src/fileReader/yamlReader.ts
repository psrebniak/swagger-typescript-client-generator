import { FileReaderOptions } from "./options"
import { FileReader } from "./fileReader"
import * as fs from "fs"
import { Spec } from "swagger-schema-official"
import * as yaml from "js-yaml"

export const yamlReader: FileReader = (options: FileReaderOptions): Spec => {
  const content = fs.readFileSync(options.file, {
    encoding: "utf-8",
    flag: "r",
  })
  return (yaml.load(content) as unknown) as Spec
}
