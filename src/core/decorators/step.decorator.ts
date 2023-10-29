import 'reflect-metadata';
import { StepMetaData } from '../types';
import { STEP_META_KEY } from '../meta-data-keys.constant';

export function Step(dependsOn: string[] = []): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function <T>(
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ) {
    if (!descriptor.value) {
      throw new Error('Invalid usage of @Step');
    }

    const meta: StepMetaData<T>[] =
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
