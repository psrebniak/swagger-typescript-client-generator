import { RequestFactoryType } from './index'

export abstract class AbstractApiClient<T extends {} = {}> {
  protected configuration: T
  protected requestFactory: RequestFactoryType

  constructor(configuration: T, requestFactory: RequestFactoryType) {
    this.configuration = configuration
    this.requestFactory = requestFactory
  }
}
