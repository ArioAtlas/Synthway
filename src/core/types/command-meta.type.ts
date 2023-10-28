import { CommandDecoratorOptions } from './command-decorator-options.type';

// eslint-disable-next-line @typescript-eslint/ban-types
export type CommandMeta<T = Function> = {
  name: string;
  options: CommandDecoratorOptions;
  method: T;
};
