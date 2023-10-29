/* eslint-disable @typescript-eslint/no-explicit-any */
import { StepMetaData } from './types';
import { getSteps } from './decorators';
import { SpinnerInterface } from './interfaces';

export class TaskPipeline {
  protected spinner: SpinnerInterface;

  private steps: StepMetaData<this>[] = [];

  private results: Map<string, unknown> = new Map();

  constructor(spinner: SpinnerInterface) {
    this.spinner = spinner;
    this.steps = getSteps(this);
  }

  async execute(): Promise<void> {
    const executionStart = new Date();
    const graph = this.buildExecuteGraph(this.steps);
    const executionOrder = this.calculateExecutionOrder(graph);
    this.results = new Map();

    console.log = (text) => this.spinner.info(text);
    console.warn = (text) => this.spinner.warning(text);

    for (const stepName of executionOrder) {
      this.spinner.start(`${stepName} is running ...`);
      const start = new Date();
      this.results.set(stepName, await this.call(stepName));
      this.spinner.succeed(
        `${stepName} (${new Date().getTime() - start.getTime()}ms)`,
      );
    }

    this.spinner.succeed(
      `Pipeline is done (${new Date().getTime() - executionStart.getTime()}ms)`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async call(name: string): Promise<any> {
    const current = this.steps.find((step) => step.name === name);

    if (current) {
      return current.method(
        ...current.dependsOn.map((dependency) =>
          this.results.get(dependency.toString()),
        ),
      );
    }
  }

  private buildExecuteGraph(
    tasks: StepMetaData<this>[],
  ): Map<string, string[]> {
    const graph = new Map<string, string[]>();

    for (const task of tasks) {
      if (!graph.has(task.name)) {
        graph.set(task.name, []);
      }

      for (const dependency of task.dependsOn) {
        if (graph.has(dependency.toString())) {
          graph.get(dependency.toString())!.push(task.name);
        } else {
          graph.set(dependency.toString(), [task.name]);
        }
      }
    }

    return graph;
  }

  private calculateExecutionOrder(
    executeGraph: Map<string, string[]>,
  ): string[] {
    const result: string[] = [];
    const visited: { [key: string]: boolean } = {};

    const visit = (node: string) => {
      if (!visited[node]) {
        visited[node] = true;
        const neighbors = executeGraph.get(node) || [];
        for (const neighbor of neighbors) {
          visit(neighbor);
        }
        result.push(node);
      }
    };

    for (const node of executeGraph.keys()) {
      if (!visited[node]) {
        visit(node);
      }
    }

    return result.reverse();
  }
}
