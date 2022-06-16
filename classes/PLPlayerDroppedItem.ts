import { Vector3 } from "./Vector3"

export class PLPlayerDroppedItem {
  public ItemHash: number
  public Position: Vector3
  public DroppedItemID: number

  constructor(hash: number, pos: Vector3, itemID: number) {
    this.ItemHash = hash
    this.Position = pos
    this.DroppedItemID = itemID
  }
}

export class PLPlayerDroppedItem_WithTLIData extends PLPlayerDroppedItem {
  public SubHubID: number
  public InteriorID: number
}