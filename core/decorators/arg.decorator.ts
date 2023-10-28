import 'reflect-metadata';
import { CommandArgMeta } from '../types';

export function Arg(name: string, description: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (typeof propertyKey !== 'string' && typeof propertyKey !== 'symbol') {
      return;
    }

    if (!target.constructor.prototype._args) {
      target.constructor.prototype._args = {};
    }

    if (!target.constructor.prototype._args[propertyKey]) {
      target.constructor.prototype._args[propertyKey] = [];
    }

    const argType =
      Reflect.getOwnMetadata('design:paramtypes', target, propertyKey)
        ?.[parameterIndex]?.name?.toString()
        ?.toLowerCase() ?? '';

    const meta: CommandArgMeta = {
      name,
      description,
      index: parameterIndex,
      typeName: ['boolean', 'number', 'string'].includes(argType)
        ? argType
        : undefined,
    };

    target.constructor.prototype._args[propertyKey].push(meta);
  };
}
