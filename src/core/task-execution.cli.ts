import { SpinnerInterface } from './interfaces';
import { Task } from './task.cli';

export class TaskExecution<TInput = unknown, TOutput = unknown> {
  constructor(
    private task: Task<TInput, TOutput>,
    private spinner: SpinnerInterface,
  ) {}

  async run(input?: TInput): Promise<TOutput> {
    this.spinner.start(`Executing task: ${this.task.constructor.name}`);
    try {
      const result = await this.task.execute(input);
      this.spinner.succeed(`Task ${this.task.constructor.name} completed.`);
      return result;
    } catch (error) {
      let errorMessage = 'unknown error';
      if (error instanceof Error) errorMessage = error.message;
      if (typeof error === 'string') errorMessage = error;

      this.spinner.error(errorMessage);
      this.spinner.stop();
      throw error;
    }
  }
}
