import { CliApplication, Task, Command, Arg } from '../core';
import { MyTaskPipeline } from './pipeline';
import { delay } from './utils';

class MyTask extends Task<void, string> {
  async execute(): Promise<string> {
    await delay(1000);
    return 'Hello from MyTask!';
  }
}

class AnotherTask extends Task<string, void> {
  async execute(input: string): Promise<void> {
    await delay(3000);
    throw new Error('bo bo bo');
    console.log(input);
  }
}

class MyCliApp extends CliApplication {
  constructor() {
    super({ version: '1.0.0' });
  }

  @Command({ description: 'Runs MyTask and then AnotherTask' })
  async runTasks(): Promise<void> {
    const myTask = new MyTask(this.spinner);
    const anotherTask = new AnotherTask(this.spinner);
    const result = await myTask.run();
    await anotherTask.run(result);
  }

  @Command({ description: 'Just says hello' })
  async sayHello(
    @Arg('name', 'the name of person') name: string,
    @Arg('tag', 'whether it has a tag or not') hasTag: boolean,
  ): Promise<void> {
    console.log(
      `Hello from ${name ?? 'App'} and it ${hasTag ? 'has' : 'has not'} tag!`,
    );

    const pipeline = new MyTaskPipeline(this.spinner);
    await pipeline.execute();
  }

  @Command({ description: 'Will call work' })
  nicklas(): void {
    console.log('Hello from Nicklas!');
  }
}

const app = new MyCliApp();
app.run();
