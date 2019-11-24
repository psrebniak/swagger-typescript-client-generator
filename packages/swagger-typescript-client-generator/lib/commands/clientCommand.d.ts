import { Command } from "./command"
import { CommandOptions } from "./options"
interface ClientCommandOptions extends CommandOptions {
  importModelsFrom: string
  name: string
}
export declare const clientCommand: Command<ClientCommandOptions>
export {}
