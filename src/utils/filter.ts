import { Address } from "@hyperoracle/zkgraph-lib"
import { Transfer } from "../events/transfer"
import { ownerAddress, backupAddress } from "../static/owner"

export function fromOwner(transfer: Transfer): boolean {
  const owner = Address.fromHexString(ownerAddress)
  return transfer.from == owner
}

export function toBackup(transfer: Transfer): boolean {
  const backup = Address.fromHexString(backupAddress)
  return transfer.to == backup
}
