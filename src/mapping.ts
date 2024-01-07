//@ts-ignore
import { Bytes, Block } from "@hyperoracle/zkgraph-lib"
import { Watcher } from "./modules/watcher"

/**
 * Executes the block handling logic for the given array of events.
 *
 * @param {Block[]} blocks - The array of events to be handled.
 * @return {Bytes} - The result of running the event handling logic.
 */
export function handleBlocks(blocks: Block[]): Bytes {
  return new Watcher(blocks).toBytes()
}
