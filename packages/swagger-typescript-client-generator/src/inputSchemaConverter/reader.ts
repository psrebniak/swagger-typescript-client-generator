import { Spec } from "../models/Spec"

export abstract class ReaderType {
  protected constructor(protected spec: any) {}

  abstract read(): Spec

  protected convertBooleanValue(val: any): boolean {
    if (typeof val === "boolean") {
      return val
    }
    return ["1", "on", "true"].includes(String(val))
  }
}
