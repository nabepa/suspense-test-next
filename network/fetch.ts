import { sleep } from '../util/sleep';

export async function fetchData1(id: string): Promise<string> {
  console.log(`fetch id: ${id}`);
  await sleep(Math.floor(Math.random() * 1000));
  return `Loaded`;
}
