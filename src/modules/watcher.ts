// @ts-ignore
import { require } from "@hyperoracle/zkgraph-lib"
import { Event, BigInt, Bytes, Address, Block } from "@hyperoracle/zkgraph-lib"
import { Transfer } from "../events/transfer"
import { fromOwner, toBackup } from "../utils/filter"

export class Watcher {
  counter: BigInt
  compromised: boolean

  constructor(blocks: Block[]) {
    this.counter = BigInt.zero()
    this.compromised = false
    const events: Event[] = blocks[0].events
    for (let i = 0; i < events.length; i++) {
      const event = events[i]
      const transfer = Transfer.fromEvent(event)
      let draining = fromOwner(transfer)
      let backing = toBackup(transfer)
      if (draining && !backing) {
        this.counter.plus(1)
      }
    }
  }

  checkCompromised(): boolean {
    require(this.counter > BigInt.fromI32(1))
    if (this.counter > BigInt.fromI32(1)) {
      this.compromised = true
    }
    return this.compromised
  }

  toBytes(): Bytes {
    return this.checkCompromised() ? Bytes.fromI32(1) : Bytes.fromI32(0)
  }
}
