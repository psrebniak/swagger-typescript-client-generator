import {Command} from './command'
import {CommandOptions} from './options'
import {Spec} from 'swagger-schema-official'
import {TypescriptClientGenerator} from '../typescriptClientGenerator'
import {TypescriptConverter} from '../typescriptConverter'

interface BundleCommandOptions extends CommandOptions {
  name: string
}

export const bundleCommand: Command<BundleCommandOptions> = (swagger: Spec, options: BundleCommandOptions) => {
  const generator = new TypescriptClientGenerator(swagger, new TypescriptConverter(swagger, {
    allowVoidParameters: options.allowVoidParameterTypes
  }))

  return generator.generateSingleFile(options.name)
}
