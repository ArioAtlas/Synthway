import { CommandDecoratorOptions } from '../types';

export function Command(options: CommandDecoratorOptions): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (!target.constructor.prototype._commands) {
      target.constructor.prototype._commands = [];
    }
    target.constructor.prototype._commands.push({
      name: propertyKey as string,
      options,
      method: descriptor.value,
    });
  };
}
