import { EPawnItemType } from "./EPawnItemType"

function _(v = 0) {
  let str = `00000000${v.toString(16)}`.substr(-8)
  let strs = [''].splice(1)

  while (str.length) {
    strs.push(str.substr(0, 2))
    str = str.substr(2)
  }

  return strs.reverse().join(' ')
}

export class PawnItemDataBlock {
  public ItemType: EPawnItemType
  public SubType: number
  public Level: number
  public OptionalEquipID: number

  get binary() {
    const { ItemType, SubType, Level } = this
    return `${_(ItemType)} ${_(SubType)} ${_(Level)}`
  }
}