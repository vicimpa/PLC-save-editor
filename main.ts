import { openSync } from "fs"
import { BinaryWriter, File } from "csbinary"
import { PLSaveGameIO } from "./classes/PLSaveGameIO"
import { PLShipComponentData } from "./classes/PLShipComponentData"
import { ESlotType } from "./classes/ESlotType"

const file = '/Users/vic/Library/Application Support/Steam/steamapps/common/PULSARLostColony/Saves/Dest.plsave'
const loader = new PLSaveGameIO()
const sgd = loader.LoadFromFile(file)
const f = openSync('./f', 'w')
const fd = File(f)
const writer = new BinaryWriter(fd)


const data = sgd.PS_ComponentHash.map(e => {
  return PLShipComponentData.fromHash(e)
})

// for (let d of sgd.LockerInventories[1].filter(e => e.Level != 255)) {
//   console.log(d)
//   console.log(d.binary)
//   d.Level = 255
//   console.log(d.binary)
// }


const scrap = data.filter(e => e.Type == ESlotType.E_COMP_CPU && e.Level == 2)

console.log(scrap)
// console.log(scrap.hashBinary)

// scrap.Type = ESlotType.E_COMP_CLOAKING_SYS
// scrap.SubType = 1
// scrap.Level = 15

// console.log(scrap.hashBinary)

// console.log(sgd.PS_CurrentUpgradeMats, sgd.PS_CurrentItemUpgradeHash)

// const newData = data.filter(e => e.Type == 7)

// newData.map(newData => {

//   console.log(newData)
//   console.log(newData.hashBinary)

//   // newData.SubType = 5
//   newData.Level = 15
//   console.log(newData.hashBinary)
// })
