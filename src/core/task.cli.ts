import { SpinnerInterface } from './interfaces';
import { TaskExecution } from './task-execution.cli';

export abstract class Task<TInput = unknown, TOutput = unknown> {
  protected spinner: SpinnerInterface;

  constructor(spinner: SpinnerInterface) {
    this.spinner = spinner;
  }

  abstract execute(input?: TInput): Promise<TOutput>;

  async run(input?: TInput): Promise<TOutput> {
    const execution = new TaskExecution(this, this.spinner);
    return execution.run(input);
  }
}
