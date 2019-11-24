import { Spec } from "swagger-schema-official"
import { BaseConverter } from "./baseConverter"
export declare class TypescriptClientGenerator {
  protected swagger: Spec
  protected converter: BaseConverter
  constructor(swagger: Spec, converter: BaseConverter)
  generateSingleFile(clientName: string): string
  generateModels(): string
  generateParameterTypesForOperations(): string
  generateImportsFromFile(importPath: string): string
  generateClient(clientName: string): string
}
