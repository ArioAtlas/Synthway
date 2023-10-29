export type TypedMethodDecorator<Method, TargetClass> = (
  target: TargetClass,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<Method>,
) => TypedPropertyDescriptor<Method> | void;
