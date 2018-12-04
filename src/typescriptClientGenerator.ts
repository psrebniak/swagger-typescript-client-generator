import {Spec} from 'swagger-schema-official'
import {BaseConverter} from './baseConverter'

export class TypescriptClientGenerator {

  constructor (protected swagger: Spec, protected converter: BaseConverter) {
  }

  public generateSingleFile (clientName: string): string {
    return [
      this.generateModels(),
      this.generateParameterTypesForOperations(),
      this.generateClient(clientName),
    ].join('\n')
  }

  public generateModels (): string {
    return []
      .concat(Object.entries(this.swagger.definitions || {}))
      .concat(Object.entries(this.swagger.responses || {}))
      .map(([name, def]) => {
        return this.converter.generateType(name, def)
      })
      .join('\n')
  }

  public generateParameterTypesForOperations () {
    return Object.entries(this.swagger.paths)
      .map(([path, methods]) => {
        return Object.entries(methods)
          .map(([method, operation]) => {
            return this.converter.generateParameterTypesForOperation(path, method, operation)
          }).join('\n')
      }).join('\n')
  }

  public generateImportsFromFile (importPath: string): string {
    const names = []
      .concat(Object.keys(this.swagger.definitions || {}))
      .concat(Object.keys(this.swagger.responses || {}))
      .map((name) => this.converter.getNormalizer().normalize(name))
      .join(',\n  ')

    return `import {\n  ${names} \n} from '${importPath}'`
  }

  public generateClient (clientName: string): string {
    return this.converter.generateClient(clientName)
  }

}
