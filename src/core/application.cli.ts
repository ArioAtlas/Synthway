import yargs from 'yargs';
import { ApplicationConfiguration, CommandArgMeta, CommandMeta } from './types';
import { SpinnerInterface } from './interfaces';
import { OraSpinner } from './components/spinners';

export abstract class CliApplication {
  protected version: string;

  protected spinner: SpinnerInterface;

  constructor({ version, spinner }: ApplicationConfiguration) {
    this.version = version ?? '1.0.0';
    this.spinner = spinner ?? new OraSpinner();
  }

  private async initialize(): Promise<void> {
    await this.spinner.initial();
    this.registerCommands();
    yargs.version(this.version).help().option('silent', {
      alias: 's',
      type: 'boolean',
      description: 'Run without showing the loader',
    });
  }

  protected startLoading(message?: string): void {
    if (!this.isSilentMode()) {
      this.spinner.start(message);
    }
  }

  protected stopLoading(successMessage?: string): void {
    if (!this.isSilentMode()) {
      if (successMessage) {
        this.spinner.succeed(successMessage);
      } else {
        this.spinner.stop();
      }
    }
  }

  private isSilentMode(): boolean {
    return 'silent' in yargs.argv ? !!yargs.argv.silent : false;
  }

  private registerCommands() {
    for (const cmd of this.retrieveCommandsMeta()) {
      const args = this.retrieveCommandArgs(cmd.name);
      yargs.command({
        command: cmd.name,
        describe: cmd.options.description,
        builder: (argParser) => {
          for (const { name, description, typeName } of args) {
            argParser.option(name, { describe: description, type: typeName });
          }
          return argParser;
        },
        handler: (argv) => {
          const parameters = [];
          for (const arg of args) {
            parameters[arg.index] = argv[arg.name];
          }
          cmd.method.apply(this, parameters);
        },
      });
    }
  }

  private retrieveCommandArgs(commandName: string): CommandArgMeta[] {
    const args =
      '_args' in this
        ? (this._args as { [key: string]: CommandArgMeta[] })
        : {};

    return args && args[commandName] ? args[commandName] : [];
  }

  private retrieveCommandsMeta(): Array<CommandMeta> {
    if (!('_commands' in this)) {
      return [];
    }

    if (!Array.isArray(this._commands)) {
      return [];
    }

    return this._commands;
  }

  public async run(): Promise<void> {
    await this.initialize();
    yargs.parse();
  }
}
