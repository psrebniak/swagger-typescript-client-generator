interface Operation {
  /**
   * unique ID
   */
  id: string
  method: string
  pathname: string
  name: string
  description: string
  required: boolean
  schema: any
  deprecated?: boolean
}
