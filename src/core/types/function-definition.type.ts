// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionDefinition<I extends Array<unknown> = any[], O = any> = (
  ...args: I
) => O;
