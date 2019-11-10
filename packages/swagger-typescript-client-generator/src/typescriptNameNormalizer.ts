import { Normalizer } from './normalizer'

export class TypescriptNameNormalizer implements Normalizer {
  public normalize(name: string): string {
    return name
      .split(/[\/.-]/g)
      .filter(Boolean)
      .map(segment => {
        if (segment[0] === '{' && segment[segment.length - 1] === '}') {
          segment =
            'By' +
            segment[1].toUpperCase() +
            segment.substring(2, segment.length - 1)
        }
        return segment
      })
      .map(str => {
        return str.replace(/[^a-zA-Z0-9_]/g, '')
      })
      .map(str => {
        return str[0].toUpperCase() + str.substr(1)
      })
      .join('')
  }
}
