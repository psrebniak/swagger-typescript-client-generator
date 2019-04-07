import {Command} from './command'
import {CommandOptions} from './options'
import {Spec} from 'swagger-schema-official'
import {TypescriptClientGenerator} from '../typescriptClientGenerator'
import {TypescriptConverter} from '../typescriptConverter'

interface ClientCommandOptions extends CommandOptions {
  importModelsFrom: string,
  name: string
}

export const clientCommand: Command<ClientCommandOptions> = (swagger: Spec, options: ClientCommandOptions) => {
  const generator = new TypescriptClientGenerator(swagger, new TypescriptConverter(swagger, {
    allowVoidParameters: options.allowVoidParameterTypes
  }))

  return [
    generator.generateImportsFromFile(options.importModelsFrom),
    generator.generateParameterTypesForOperations(),
    generator.generateClient(options.name),
  ].join('')
}
