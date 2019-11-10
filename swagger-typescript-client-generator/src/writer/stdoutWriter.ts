import {Writer} from './writer'
import {WriterOptions} from './options'

export const stdoutWriter: Writer = (content: string, options: WriterOptions) => {
  process.stdout.write(content)
}
