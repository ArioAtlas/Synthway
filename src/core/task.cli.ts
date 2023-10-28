export abstract class Task<TInput = unknown, TOutput = unknown> {
  abstract execute(input?: TInput): Promise<TOutput>;
}
