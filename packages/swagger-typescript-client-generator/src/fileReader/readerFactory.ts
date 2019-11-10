import { FileReaderOptions } from 'fileReader/options'
import { jsonReader } from './jsonReader'

export const readerFactory = (options: FileReaderOptions) => {
  if (typeof options.file !== 'string') {
    throw new Error('invalid type for file option, string expected')
  }

  if (options.file.endsWith('.json')) {
    return jsonReader
  }

  throw new Error(
    `cannot create reader for ${options.file}. Supported formats: json`
  )
}
