import { Command } from './command'
import { CommandOptions } from './options'
import { Spec } from 'swagger-schema-official'
import { TypescriptClientGenerator } from '../typescriptClientGenerator'
import { TypescriptConverter } from '../typescriptConverter'

export const modelsCommand: Command = (
  swagger: Spec,
  options: CommandOptions
) => {
  const generator = new TypescriptClientGenerator(
    swagger,
    new TypescriptConverter(swagger, {
      allowVoidParameters: options.allowVoidParameterTypes
    })
  )

  return generator.generateModels()
}
