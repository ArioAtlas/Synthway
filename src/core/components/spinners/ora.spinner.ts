import ora, { Ora } from 'ora';
import { SpinnerInterface } from '../../interfaces';

export class OraSpinner implements SpinnerInterface {
  private _spinner: Ora | undefined;

  private get spinner(): Ora {
    if (this._spinner !== undefined) return this._spinner;

    throw new Error('Spinner is not initialized!');
  }

  private set spinner(value: Ora) {
    this._spinner = value;
  }

  async initial(): Promise<void> {
    this.spinner = ora();
  }

  start(message?: string): void {
    this.spinner.start(message);
  }

  stop(): void {
    this.spinner.stop();
  }

  succeed(message?: string): void {
    this.spinner.succeed(message);
  }

  error(message?: string): void {
    this.spinner.fail(message);
  }
}
