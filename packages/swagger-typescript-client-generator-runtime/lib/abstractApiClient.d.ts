import { RequestFactoryType } from './index'
export declare abstract class AbstractApiClient<T extends {} = {}> {
  protected configuration: T
  protected requestFactory: RequestFactoryType
  constructor(configuration: T, requestFactory: RequestFactoryType)
}
