import { Operation, Parameter, Spec } from 'swagger-schema-official'
import { ParametersJar } from './parametersJar'
import {
  PARAMETER_TYPE_BODY,
  PARAMETER_TYPE_FORM_DATA,
  PARAMETER_TYPE_HEADER,
  PARAMETER_TYPE_PATH,
  PARAMETER_TYPE_QUERY,
  ParameterType
} from './swaggerTypes'

export class ParametersJarFactory {
  constructor(protected swagger: Spec) {}

  public createFromOperation(operation: Operation): ParametersJar {
    return {
      pathParams: this.getOperationParametersByType(
        operation,
        PARAMETER_TYPE_PATH
      ),
      queryParams: this.getOperationParametersByType(
        operation,
        PARAMETER_TYPE_QUERY
      ),
      bodyParams: this.getOperationParametersByType(
        operation,
        PARAMETER_TYPE_BODY
      ),
      formDataParams: this.getOperationParametersByType(
        operation,
        PARAMETER_TYPE_FORM_DATA
      ),
      headerParams: this.getOperationParametersByType(
        operation,
        PARAMETER_TYPE_HEADER
      )
    }
  }

  protected getOperationParametersByType(
    operation: Operation,
    type: ParameterType
  ): Parameter[] {
    const parameters = this.mapParameters(operation)
    const authorization = this.mapAuthorization(operation)

    return []
      .concat(parameters)
      .concat(authorization)
      .filter((parameter: Parameter) => parameter && parameter.in === type)
  }

  protected mapParameters(operation: Operation) {
    return (operation.parameters || []).map(
      (parameter: Parameter & { $ref: string }) => {
        if (parameter.$ref) {
          const segments = parameter.$ref.split('/')
          const referred = this.swagger.parameters[
            segments.length === 1 ? segments[0] : segments[2]
          ]
          if (!referred) {
            throw new Error(`cannot find reference ${parameter.$ref}`)
          }
          return referred
        }
        return parameter
      }
    )
  }

  protected mapAuthorization(operation: Operation) {
    return (operation.security || [])
      .reduce((prev: string[], current): string[] => {
        return prev.concat(Object.keys(current))
      }, [])
      .map((name: string) => {
        return this.swagger.securityDefinitions[name]
      })
  }
}
