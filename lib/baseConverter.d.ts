import { Operation, Schema } from 'swagger-schema-official';
import { Normalizer } from './normalizer';
export interface BaseConverter {
    generateOperation(path: string, method: string, operation: Operation): string;
    generateType(name: string, definition: Schema): string;
    generateTypeValue(definition: Schema): string;
    generateParameterTypesForOperation(path: string, method: string, operation: Operation): string;
    generateClient(name: string): string;
    getNormalizer(): Normalizer;
}
