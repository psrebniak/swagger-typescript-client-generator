import { CommandOptions } from "./options";
import { Spec } from "swagger-schema-official";
export declare type Command<Options extends CommandOptions = CommandOptions> = (swagger: Spec, options: Options) => string;
