import { WriterOptions } from './options'

export type Writer = (content: string, options: WriterOptions) => void
