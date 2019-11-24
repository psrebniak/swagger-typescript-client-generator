import { Operation, Parameter, Spec } from "swagger-schema-official";
import { ParametersJar } from "./parametersJar";
import { ParameterType } from "./swaggerTypes";
export declare class ParametersJarFactory {
    protected swagger: Spec;
    constructor(swagger: Spec);
    createFromOperation(operation: Operation): ParametersJar;
    protected getOperationParametersByType(operation: Operation, type: ParameterType): Parameter[];
    protected mapParameters(operation: Operation): (import("swagger-schema-official").BodyParameter | import("swagger-schema-official").QueryParameter | (import("swagger-schema-official").PathParameter & {
        $ref: string;
    }) | (import("swagger-schema-official").HeaderParameter & {
        $ref: string;
    }) | (import("swagger-schema-official").FormDataParameter & {
        $ref: string;
    }))[];
    protected mapAuthorization(operation: Operation): import("swagger-schema-official").Security[];
}
