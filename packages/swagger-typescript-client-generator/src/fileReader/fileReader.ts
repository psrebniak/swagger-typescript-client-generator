import { FileReaderOptions } from "./options"
import { Spec } from "swagger-schema-official"

export type FileReader = (options: FileReaderOptions) => Spec
