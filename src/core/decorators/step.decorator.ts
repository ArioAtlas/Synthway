import 'reflect-metadata';
import {
  ClassMethodsNames,
  StepMetaData,
  TypedMethodDecorator,
} from '../types';
import { STEP_META_KEY } from '../meta-data-keys.constant';

export function Step<M, T extends object>(
  dependsOn: ClassMethodsNames<T>[] = [],
): TypedMethodDecorator<M, T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (
    target: T,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<M>,
  ) {
    if (!descriptor.value) {
      throw new Error('Invalid usage of @Step');
    }

    const meta: StepMetaData<T, M>[] =
      Reflect.getMetadata(STEP_META_KEY, target) || [];
    meta.push({
      name: propertyKey.toString(),
      dependsOn: dependsOn,
      method: descriptor.value,
    });
    Reflect.defineMetadata(STEP_META_KEY, meta, target);
  };
}

export function getSteps(target: object) {
  return Reflect.getMetadata(STEP_META_KEY, target) || [];
}
