export type CommandArgMeta = {
  name: string;
  description: string;
  index: number;
  typeName: 'boolean' | 'number' | 'string';
};
