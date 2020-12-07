import { WriterOptions } from "./options";
import { Writer } from "./writer";
export declare const prettierWriterComposite: (writer: Writer) => (content: string, options: WriterOptions) => void;
