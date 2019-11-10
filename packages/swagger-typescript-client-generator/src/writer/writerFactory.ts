import { prettierWriterComposite } from './prettierWriterComposite'
import { stdoutWriter } from './stdoutWriter'
import { WriterOptions } from './options'
import { Writer } from './writer'

export const writerFactory = (options: WriterOptions): Writer => {
  return prettierWriterComposite(stdoutWriter)
}
