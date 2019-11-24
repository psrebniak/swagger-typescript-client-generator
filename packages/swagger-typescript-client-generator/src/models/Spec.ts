import { Schema } from "./schema"

export interface Spec {
  definitions: Record<string, Schema>
}
