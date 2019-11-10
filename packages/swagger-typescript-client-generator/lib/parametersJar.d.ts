import { Parameter } from "swagger-schema-official"
export interface ParametersJar {
  pathParams: Parameter[]
  queryParams: Parameter[]
  bodyParams: Parameter[]
  formDataParams: Parameter[]
  headerParams: Parameter[]
}
