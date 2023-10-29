import { ClassMethodsNames } from './class-methods-names.type';
import { FunctionDefinition } from './function-definition.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StepMetaData<T, M = FunctionDefinition> = {
  name: string;
  dependsOn: ClassMethodsNames<T>[];
  method: NonNullable<M>;
};
