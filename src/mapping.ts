import {
  BondCreated,
  BondRedeemed
} from "../generated/OlympusCVXBondDepository/OlympusCVXBondDepository"
import { Bond } from "../generated/schema"

export function handleBondCreated(event: BondCreated): void {
  // Not sure how to create a unique ID for each bond. I don't think there is
  // enough information in the event or transaction...
  let owner = event.transaction.from
  let bond = new Bond(owner.toHex())

  bond.owner = owner
  bond.deposit = event.params.deposit
  bond.payout = event.params.payout
  bond.remaining = event.params.payout

  bond.save()
}

export function handleBondRedeemed(event: BondRedeemed): void {
  let owner = event.params.recipient
  let bond = Bond.load(owner.toHex())

  if (!bond) {
    bond = new Bond(owner.toHex())
    bond.owner = owner
  }

  bond.remaining = event.params.remaining

  bond.save()
}
