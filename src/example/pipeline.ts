import { Step, TaskPipeline } from '../core';
import { delay } from './utils';

export class MyTaskPipeline extends TaskPipeline {
  @Step()
  async firstTask() {
    await delay(1000);
    return 'data from first task';
  }

  @Step(['firstTask', 'thirdTask'])
  async secondTask(first: string, third: string) {
    await delay(1000);
    console.log(first, third);
    return 'data from second task';
  }

  @Step(['firstTask'])
  async thirdTask(first: string) {
    await delay(1000);
    console.log(first);
    return 'data from third task';
  }

  @Step(['secondTask'])
  async forthTask(second: string) {
    await delay(1000);
    console.log(second);
    return 'data from forth task';
  }

  @Step(['firstTask'])
  async fifthTask(first: string) {
    await delay(1000);
    console.log(first);
    return 'data from fifth task';
  }

  @Step()
  async sixthTask() {
    await delay(1000);
    return 'data from sixth task';
  }

  @Step(['secondTask'])
  async seventhTask(second: string) {
    await delay(1000);
    console.log(second);
    console.warn('here is a warning');
    return 'data from seventh task';
  }

  @Step(['sixthTask', 'seventhTask'])
  async eighthTask(sixth: string, seventh: string) {
    await delay(1000);
    console.log(sixth, seventh);
    console.error('Here is a error');
    return 'data from eighth task';
  }
}
