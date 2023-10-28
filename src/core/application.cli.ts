import yargs from 'yargs';
import { CommandArgMeta, CommandMeta } from './types';

export abstract class CliApplication {
  constructor(protected version: string) {
    this.initialize();
  }

  private initialize(): void {
    this.registerCommands();
    yargs.version(this.version).help();
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

  public run(): void {
    yargs.parse();
  }
}
