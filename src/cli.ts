import * as fs from 'fs'
import * as yargs from 'yargs'
import * as prettier from 'prettier'
import {TypescriptClientGenerator} from './typescriptClientGenerator'
import {TypescriptConverter} from './typescriptConverter'

const pkg = require('../package.json') // tslint:disable-line no-var-requires

const swaggerReader = (file: string) => {
  return JSON.parse(fs.readFileSync(file, {encoding: 'UTF-8'}))
}

const formatCode = (code: string) => {
  return prettier.format(code, {
    parser: 'typescript'
  })
}

const args = yargs
  .option('file', {
    type: 'string',
    alias: 'f',
    description: 'swagger file',
    required: true,
  })
  .option('allowVoidParameterTypes', {
    boolean: true,
    default: false,
    alias: 'a',
  })
  .command(
    'models',
    'generate models files',
    (yargsModels) => yargsModels,
    (args) => {
      const swagger = swaggerReader(args.file)
      const generator = new TypescriptClientGenerator(swagger, new TypescriptConverter(swagger, {
        allowVoidParameters: args.allowVoidParameterTypes,
      }))

      process.stdout.write(formatCode(generator.generateModels()))
    })
  .command(
    'client <name> [importModelsFrom]',
    'generate client code',
    (yargsClient) =>
      yargsClient
        .positional('name', {
          type: 'string',
        })
        .positional('importModelsFrom', {
          default: './model',
          type: 'string',
        }),
    (args) => {
      const swagger = swaggerReader(args.file)
      const generator = new TypescriptClientGenerator(swagger, new TypescriptConverter(swagger, {
        allowVoidParameters: args.allowVoidParameterTypes,
      }))

      process.stdout.write(formatCode(generator.generateImportsFromFile(args.importModelsFrom)))
      process.stdout.write(formatCode(generator.generateParameterTypesForOperations()))
      process.stdout.write(formatCode(generator.generateClient(args.name)))
    },
  )
  .command(
    'bundle <name>',
    'generate models and client',
    (yarngsBundle) => yarngsBundle,
    (args) => {
      const swagger = swaggerReader(args.file)
      const generator = new TypescriptClientGenerator(swagger, new TypescriptConverter(swagger, {
        allowVoidParameters: args.allowVoidParameterTypes,
      }))

      process.stdout.write(formatCode(generator.generateSingleFile(String(args.name))))
    })
  .version(pkg.version)
  .demandCommand(1)
  .argv

if (process.env.DEBUG) {
  // tslint:disable-next-line no-console
  console.log(args)
}
