import { FunctionDefinition } from './function-definition.type';

export type ClassMethodsNames<T> = {
  [K in keyof T]: T[K] extends FunctionDefinition ? K : never;
}[keyof T];
