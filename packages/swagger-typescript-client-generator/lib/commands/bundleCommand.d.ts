import { Command } from "./command";
import { CommandOptions } from "./options";
interface BundleCommandOptions extends CommandOptions {
    name: string;
}
export declare const bundleCommand: Command<BundleCommandOptions>;
export {};
