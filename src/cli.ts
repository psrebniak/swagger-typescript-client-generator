import * as fs from 'fs'
import * as yargs from 'yargs'
import {TypescriptClientGenerator} from './typescriptClientGenerator'
import {TypescriptConverter} from './typescriptConverter'
const pkg = require('../package.json') // tslint:disable-line no-var-requires

const swaggerReader = (file: string) => {
  return JSON.parse(fs.readFileSync(file, {encoding: 'UTF-8'}))
}

yargs
  .alias('f', 'file')
  .demandOption(['f'])
  .option('allowVoidParameterTypes', {
    boolean: true,
    default: false,
  })
  .alias('a', 'allowVoidParameterTypes')
  .command(
    'models',
    'generate models files',
    (yargsModels) => yargsModels,
    (args) => {
      const swagger = swaggerReader(args.file)
      const generator = new TypescriptClientGenerator(swagger, new TypescriptConverter(swagger, {
        allowVoidParameters: args.allowVoidParameterTypes,
      }))

      process.stdout.write(generator.generateModels())
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

      process.stdout.write(generator.generateImportsFromFile(args.importModelsFrom))
      process.stdout.write(generator.generateClient(args.name))
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

      process.stdout.write(generator.generateSingleFile(args.name))
    })
  .version(pkg.version)
