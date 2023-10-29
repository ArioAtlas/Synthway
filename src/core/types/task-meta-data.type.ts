// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StepMetaData<T = any> = {
  name: string;
  dependsOn: string[];
  method: T;
};
