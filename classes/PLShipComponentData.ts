import { ESlotType } from "./ESlotType"

export class PLShipComponentData {
  Stock: number
  StockBinary: string
  Type: number
  TypeName: string
  SubType: number
  Level: number
  Data: number
  VisualSlotType: number

  get hash() {
    let num = this.Type & 63
    let num2 = (this.SubType & 0x3F) << 6
    let num3 = (this.Level & 0x1F) << 12
    let num4 = (this.Data & 0x3F) << 17
    let num5 = (this.VisualSlotType & 63) << 23
    return num | num2 | num3 | num4 | num5
  }

  get hashBinary() {
    return PLShipComponentData.binary(this.hash)
  }

  static binary(v = 0) {
    let str = `00000000${v.toString(16)}`.substr(-8)
    let strs = [''].splice(1)

    while (str.length) {
      strs.push(str.substr(0, 2))
      str = str.substr(2)
    }

    return strs.reverse().join(' ')
  }

  static fromHash(inHash: number) {
    const o = new this
    o.Stock = inHash
    o.StockBinary = this.binary(inHash)
    o.Type = inHash & 0x3F
    o.TypeName = ESlotType[o.Type]
    o.SubType = (inHash >> 6) & 0x3F
    o.Level = (inHash >> 12) & 0x1F
    o.Data = (inHash >> 17) & 0x3F
    o.VisualSlotType = (inHash >> 23) & 0x3F

    return o
  }
}