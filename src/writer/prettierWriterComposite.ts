import * as prettier from 'prettier'
import {WriterOptions} from './options'
import {Writer} from './writer'

export const prettierWriterComposite = (writer: Writer) =>
  (content: string, options: WriterOptions) => {
    return writer(prettier.format(content, {
      parser: 'typescript'
    }), options)
  }
