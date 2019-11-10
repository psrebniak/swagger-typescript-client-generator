import { Parameter, Schema } from 'swagger-schema-official'
export declare class ParametersArrayToSchemaConverter {
  convertToObject(parameters: Parameter[]): Schema
  convertToUnion(parameters: Parameter[]): Schema
}
