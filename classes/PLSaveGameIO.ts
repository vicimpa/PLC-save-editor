import { openSync } from "fs"
import { File, BinaryReader } from "csbinary"
import { SaveGameData } from "./SaveGameData"
import { Vector3 } from "./Vector3"
import { PLPlayerDroppedItem } from "./PLPlayerDroppedItem"
import { PawnItemDataBlock } from "./PawnItemDataBlock"
import { FactionDataBlock } from "./FactionDataBlock"
import { ClassDataBlock } from "./ClassDataBlock"
import { PDADataBlock } from "./PDADataBlock"
import { ShipDataBlock } from "./ShipDataBlock"
import { ComponentOverrideData } from "./ComponentOverrideData"
import { MissionDataBlock } from "./MissionDataBlock"

export class PLSaveGameIO {
  private CurrentVersionSaveID = 58
  private CurrentVersionGalaxySaveID = 12

  CheckVersionOfSaveData(sgd: SaveGameData) {
    return sgd.SaveVerID >= 28
  }

  CheckVersionOfGalaxySaveData(sgd: SaveGameData) {
    return sgd.GalaxySaveVerID >= this.CurrentVersionGalaxySaveID
  }

  LoadVector(reader: BinaryReader) {
    return new Vector3(
      reader.readSingle(),
      reader.readSingle(),
      reader.readSingle()
    )
  }

  LoadFromFile(fileName: string) {
    const sgd = new SaveGameData()
    const file = File(openSync(fileName, 'r'))
    const reader = new BinaryReader(file)

    sgd.SaveVerID = reader.readInt32()
    sgd.FileName = fileName

    if (this.CheckVersionOfSaveData(sgd)) {
      sgd.GalaxySaveVerID = reader.readInt32()
      sgd.HasGalaxyInfo = this.CheckVersionOfGalaxySaveData(sgd)
      sgd.SavedDateTime = reader.readInt64()
      sgd.GalaxySeed = reader.readInt32()
      sgd.GameTime = reader.readSingle()
      sgd.CrewCredits = reader.readInt32()
      sgd.CrewLevel = reader.readInt32()
      sgd.CrewXP = reader.readInt32()
      sgd.CurrentSectorID = reader.readInt32()
      sgd.IronmanMode = reader.readBoolean()

      if (sgd.SaveVerID >= 53) {
        sgd.Playtime = reader.readSingle()
        sgd.FlaggedNonExpertAtAnyTime = reader.readBoolean()
        sgd.EnemyKills = reader.readInt32()
        sgd.NumJumps = reader.readInt32()
      } else {
        sgd.Playtime = 0
        sgd.FlaggedNonExpertAtAnyTime = true
        sgd.EnemyKills = 0
        sgd.NumJumps = 0
      }

      if (sgd.SaveVerID >= 30) {
        sgd.PS_BiscuitsSold = reader.readInt32()
      } else {
        sgd.PS_BiscuitsSold = 0
      }

      if (sgd.SaveVerID >= 33) {
        sgd.PS_BiscuitsSold_WonFBContest = reader.readBoolean()
      } else {
        sgd.PS_BiscuitsSold_WonFBContest = false
      }

      if (sgd.SaveVerID >= 33) {
        sgd.PS_BiscuitsSold_WhenContestEnded = reader.readInt32()
      } else {
        sgd.PS_BiscuitsSold_WhenContestEnded = 0
      }

      if (sgd.SaveVerID >= 31) {
        sgd.PS_BBAvailable = reader.readBoolean()
      } else {
        sgd.PS_BBAvailable = false
      }

      if (sgd.SaveVerID >= 38) {
        sgd.PS_CurrentUpgradeMats = reader.readInt32()
      } else {
        sgd.PS_CurrentUpgradeMats = 0
      }

      if (sgd.SaveVerID >= 39) {
        sgd.PS_CurrentItemUpgradeHash = reader.readInt32()
      } else {
        sgd.PS_CurrentItemUpgradeHash = 0
      }

      sgd.FactionRepInfo = new Array(6);
      sgd.FactionRepInfo[0] = reader.readInt32()
      sgd.FactionRepInfo[1] = reader.readInt32()
      sgd.FactionRepInfo[2] = reader.readInt32()
      sgd.FactionRepInfo[3] = reader.readInt32()
      sgd.FactionRepInfo[4] = reader.readInt32()

      if (sgd.SaveVerID >= 32) {
        sgd.BiscuitContestIsOver = reader.readBoolean()
      } else {
        sgd.BiscuitContestIsOver = false
      }

      if (sgd.SaveVerID >= 46) {
        sgd.ActiveBountyHunter_SectorID = reader.readInt32()
        sgd.ActiveBountyHunter_SecondsSinceWarp = reader.readSingle()
        sgd.ActiveBountyHunter_TypeID = reader.readInt32()
        sgd.ActiveBountyHunter_ProcessedChaosLevel = reader.readSingle()
      } else {
        sgd.ActiveBountyHunter_SectorID = -1
        sgd.ActiveBountyHunter_SecondsSinceWarp = 0
        sgd.ActiveBountyHunter_TypeID = -1
        sgd.ActiveBountyHunter_ProcessedChaosLevel = 0
      }

      if (sgd.SaveVerID >= 44) {
        sgd.PacifistRun = reader.readBoolean();
        sgd.CreditsSpent_InRun = reader.readInt32();
        sgd.PerfectBiscuitStreak = reader.readInt32();
        sgd.BlindJumpCount = reader.readInt32();
      } else {
        sgd.PacifistRun = false
        sgd.CreditsSpent_InRun = 0
        sgd.PerfectBiscuitStreak = 0
        sgd.BlindJumpCount = 0
      }

      if (sgd.SaveVerID >= 45) {
        sgd.PurchaseLimitsEnabled = reader.readBoolean()
      } else {
        sgd.PurchaseLimitsEnabled = true
      }

      if (sgd.SaveVerID >= 47) {
        sgd.DataFragmentsCollected = reader.readInt32()
      } else {
        sgd.DataFragmentsCollected = 0
      }

      if (sgd.SaveVerID >= 50) {
        sgd.BountyHuntersSpawned = reader.readInt32()
      } else {
        sgd.BountyHuntersSpawned = 0
      }

      if (sgd.SaveVerID >= 57) {
        sgd.PTCountdownArmed = reader.readBoolean()
        sgd.PTCountdown = reader.readSingle()
        sgd.FactionRepInfo[5] = reader.readInt32()
      } else {
        sgd.PTCountdownArmed = false
        sgd.PTCountdown = 7200
        sgd.FactionRepInfo[5] = 0
      }

      if (sgd.SaveVerID >= 58) {
        sgd.PTCountdownDisabledTimer = reader.readBoolean()
      } else {
        sgd.PTCountdownDisabledTimer = false
      }

      if (sgd.SaveVerID >= 51) {
        let flag = reader.readBoolean();
        sgd.BHI_Exists = flag;

        if (flag) {
          sgd.BHI_HullPercent = reader.readSingle()
          sgd.BHI_ShipName = reader.readString()
          sgd.BHI_ShipType = reader.readInt32()
        }

        let flag2 = reader.readBoolean()
        sgd.BHL_Exists = flag2;

        if (flag2) {
          sgd.BHL_Data = reader.readString()
          sgd.BHL_Crew = reader.readString()
        }
      }

      let zero = new Vector3()
      if (sgd.SaveVerID >= 42) {
        zero.x = reader.readSingle()
        zero.y = reader.readSingle()
        zero.z = reader.readSingle()
      }

      sgd.StormPosition = zero

      if (sgd.SaveVerID >= 37) {
        sgd.RacesWonBitfield = reader.readInt32()
        sgd.RacesLostBitfield = reader.readInt32()
        sgd.RacesStartedBitfield = reader.readInt32()
      } else {
        sgd.RacesWonBitfield = 0
        sgd.RacesLostBitfield = 0
        sgd.RacesStartedBitfield = 0
      }

      sgd.GameName = reader.readString()
      sgd.PS_ShipName = reader.readString()
      sgd.PS_ShipType = reader.readInt32()
      sgd.PS_Fuel = reader.readInt32()
      sgd.PS_Hull = reader.readSingle()

      if (sgd.SaveVerID >= 30) {
        sgd.PS_FBCrateSupply = reader.readInt32()
      } else {
        sgd.PS_FBCrateSupply = 0
      }

      sgd.PS_CoolantLevel = reader.readSingle()

      if (sgd.SaveVerID >= 55) {
        sgd.PS_EndGameSequenceActive = reader.readBoolean()
        sgd.PS_IsReflection = reader.readBoolean()
      } else {
        sgd.PS_EndGameSequenceActive = false
        sgd.PS_IsReflection = false
      }

      if (sgd.SaveVerID >= 32) {
        let count = reader.readInt32()
        sgd.PS_AdditionalShipData = reader.readBytes(count)
      } else {
        sgd.PS_AdditionalShipData = Buffer.from([0])
      }

      sgd.PS_NumComponents = reader.readInt32()
      sgd.PS_ComponentHash = new Array(sgd.PS_NumComponents);
      sgd.PS_ComponentSortID = new Array(sgd.PS_NumComponents);
      sgd.PS_SubTypeData = new Array(sgd.PS_NumComponents);
      sgd.LockerInventories = new Array(5);

      for (let i = 0; i < sgd.PS_NumComponents; i++) {
        let num = reader.readUInt32()
        let num2 = reader.readInt32()
        let num3 = reader.readInt16()

        if (num != 0 || num2 != -1) {
          sgd.PS_ComponentHash[i] = num
          sgd.PS_ComponentSortID[i] = num2
          sgd.PS_SubTypeData[i] = num3
        }
      }

      sgd.PS_DroppedItems = []

      if (sgd.SaveVerID > 29) {
        let num4 = reader.readInt32()
        for (let j = 0; j < num4; j++) {
          let hash = reader.readUInt32()
          let vec = new Vector3()
          vec.x = reader.readSingle()
          vec.y = reader.readSingle()
          vec.z = reader.readSingle()
          sgd.PS_DroppedItems.push(new PLPlayerDroppedItem(hash, vec, -1))
        }
      }

      for (let k = 0; k < 5; k++) {
        sgd.LockerInventories[k] = []

        let num5 = reader.readInt32()

        for (let l = 0; l < num5; l++) {
          let pawnItemDataBlock = new PawnItemDataBlock()
          pawnItemDataBlock.ItemType = reader.readInt32()
          pawnItemDataBlock.SubType = reader.readInt32()
          pawnItemDataBlock.Level = reader.readInt32()

          if (pawnItemDataBlock.ItemType != 0) {
            sgd.LockerInventories[k].push(pawnItemDataBlock)
          }
        }
      }

      {
        let num6 = reader.readInt32();
        sgd.FactionData = [...new Array(num6)].map(e => ({}) as FactionDataBlock);
        for (let m = 0; m < num6; m++) {
          sgd.FactionData[m].ID = reader.readInt32()
          sgd.FactionData[m].Continuous_GalaxySpreadLimit = reader.readSingle()
          sgd.FactionData[m].Continuous_GalaxySpreadFactor = reader.readSingle()
        }
      }

      if (sgd.SaveVerID >= 48) {
        sgd.GalaxyGenerationSettingsData = reader.readString()
      } else {
        sgd.GalaxyGenerationSettingsData = ""
      }

      sgd.ChaosLevel = reader.readSingle()
      sgd.ActiveChaosEvents = reader.readInt64()
      sgd.TalentLockedStatus = reader.readInt64()
      sgd.TalentToResearch = reader.readInt32()
      sgd.JumpsNeededToResearchTalent = reader.readInt32()

      sgd.ResearchMaterials = new Array(6)
      sgd.ResearchMaterials[0] = reader.readInt32()
      sgd.ResearchMaterials[1] = reader.readInt32()
      sgd.ResearchMaterials[2] = reader.readInt32()
      sgd.ResearchMaterials[3] = reader.readInt32()
      sgd.ResearchMaterials[4] = reader.readInt32()
      sgd.ResearchMaterials[5] = reader.readInt32()

      sgd.AtomizerItems = [];

      let num7 = reader.readInt32()
      for (let n = 0; n < num7; n++) {
        let pawnItemDataBlock2 = new PawnItemDataBlock()
        pawnItemDataBlock2.ItemType = reader.readInt32()
        pawnItemDataBlock2.SubType = reader.readInt32()
        pawnItemDataBlock2.Level = reader.readInt32()
        sgd.AtomizerItems.push(pawnItemDataBlock2)
      }

      sgd.ClassData = [...new Array(5)];
      if (sgd.SaveVerID > 30) {
        for (let num8 = 0; num8 < 5; num8++) {
          if (reader.readBoolean()) {
            sgd.ClassData[num8] = new ClassDataBlock()
            sgd.ClassData[num8].TalentPointsAvailable = reader.readInt32()

            if (sgd.SaveVerID >= 43) {
              sgd.ClassData[num8].SurvivalBonusCounter = reader.readInt32()
            } else {
              sgd.ClassData[num8].SurvivalBonusCounter = 0
            }

            let num9 = reader.readInt32()
            sgd.ClassData[num8].Talents = new Array(num9)
            for (let num10 = 0; num10 < num9; num10++) {
              sgd.ClassData[num8].Talents[num10] = reader.readInt32()
            }

            let num11 = reader.readInt32();
            sgd.ClassData[num8].PawnInventory = new Array(num11)
            for (let num12 = 0; num12 < num11; num12++) {
              let item = new PawnItemDataBlock()
              item.ItemType = reader.readInt32()
              item.SubType = reader.readInt32()
              item.Level = reader.readInt32()
              item.OptionalEquipID = reader.readInt32()
              sgd.ClassData[num8].PawnInventory[num12] = item
            }
          }
        }
      }

      sgd.CrewFactionID = reader.readInt32()
      sgd.PlayerShipIsFlagged = reader.readBoolean()
      sgd.PlayerShipIsRevealed = reader.readBoolean()
      sgd.LongRangeCommsDisabled = reader.readBoolean()

      let num13 = reader.readInt32()
      sgd.AlreadyAttemptedToStartPickupMissionID = new Array(num13)
      for (let num14 = 0; num14 < num13; num14++) {
        sgd.AlreadyAttemptedToStartPickupMissionID[num14] = reader.readInt32()
      }

      sgd.SelectedShipTypeID = reader.readInt32()
      sgd.ServerShipIDCounter = reader.readInt32()

      sgd.PDAs = []
      let num15 = reader.readInt32()
      for (let num16 = 0; num16 < num15; num16++) {

        let pDADataBlock = new PDADataBlock()
        pDADataBlock.Type = reader.readInt32()
        switch (pDADataBlock.Type) {
          case 0: {
            pDADataBlock.Hostile = reader.readBoolean()
            pDADataBlock.ActorID = reader.readString()
            pDADataBlock.NPCName = reader.readString()
          } break
          case 1: {
            pDADataBlock.Hostile = reader.readBoolean()
            pDADataBlock.ActorID = reader.readString()
            pDADataBlock.ShipName = reader.readString()
            pDADataBlock.SpecialActionCompleted = reader.readBoolean()

            let num17 = reader.readInt32();
            for (let num18 = 0; num18 < num17; num18++) {
              pDADataBlock.LinesToShowPercent.push(reader.readInt32())
            }
          } break
        }

        let num19 = reader.readInt32()
        for (let num20 = 0; num20 < num19; num20++) {
          pDADataBlock.LinesAlreadyDisplayed.push(reader.readInt32())
        }

        sgd.PDAs.push(pDADataBlock)
      }


      sgd.ShipDataBlocks = []
      let num21 = reader.readInt32()
      console.log(num21)
      for (let num22 = 0; num22 < num21; num22++) {
        let item2 = new ShipDataBlock
        item2.ShipType = reader.readInt32()
        item2.FactionID = reader.readInt32()
        item2.IsDestroyed = reader.readBoolean()
        item2.SectorID = reader.readInt32()
        item2.CompOverrides = []
        item2.ShipName = reader.readString()

        let num23 = reader.readInt32()
        for (let num24 = 0; num24 < num23; num24++) {
          let componentOverrideData = new ComponentOverrideData()
          componentOverrideData.CompLevel = reader.readInt32()
          componentOverrideData.CompTypeToReplace = reader.readInt32()
          componentOverrideData.CompSubType = reader.readInt32()
          componentOverrideData.CompType = reader.readInt32()
          componentOverrideData.ReplaceExistingComp = reader.readBoolean()
          componentOverrideData.CompSubTypeToReplace = reader.readInt32()
          componentOverrideData.SlotNumberToReplace = reader.readInt32()
          componentOverrideData.IsCargo = reader.readBoolean()
          item2.CompOverrides.push(componentOverrideData)
        }

        item2.HullPercent = reader.readSingle()
        item2.ShldPercent = reader.readSingle()

        if (sgd.SaveVerID > 27) {
          item2.Modifiers = reader.readInt32()
        } else {
          item2.Modifiers = 0;
        }

        item2.IsFlagged = reader.readBoolean()
        item2.ForceHostile = reader.readBoolean()
        item2.ForceHostileAll = reader.readBoolean()
        item2.ForceHostileName = reader.readString()
        item2.SelectedActorID = reader.readString()

        if (sgd.SaveVerID >= 29) {
          item2.BiscuitsSold = reader.readInt32()
        } else {
          item2.BiscuitsSold = 0;
        }
        if (sgd.SaveVerID >= 34) {
          item2.WonFBContest = reader.readBoolean()
        } else {
          item2.WonFBContest = false
        }

        if (sgd.SaveVerID >= 36) {
          item2.EnsureNoCrew = reader.readBoolean()
        } else {
          item2.EnsureNoCrew = false
        }

        if (sgd.SaveVerID >= 52) {
          item2.IsRelicHunter = reader.readBoolean()
          if (item2.IsRelicHunter) {
            item2.RH_Data = reader.readString()
            item2.RH_Crew = reader.readString()
          }
        }

        sgd.ShipDataBlocks.push(item2)
      }

      sgd.MissionDataBlocks = []
      let num25 = reader.readInt32();
      for (let num26 = 0; num26 < num25; num26++) {
        let missionDataBlock = new MissionDataBlock()
        missionDataBlock.MissionID = reader.readInt32()
        missionDataBlock.Abandoned = reader.readBoolean()
        missionDataBlock.Ended = reader.readBoolean()

        let num27 = reader.readInt32()
        missionDataBlock.ObjectivesCompleted = new Array(num27)
        missionDataBlock.ObjectivesAmountCompleted = new Array(num27)
        missionDataBlock.ObjectivesAmountNeeded = new Array(num27)
        missionDataBlock.ObjectivesShownCompletedMessage = new Array(num27)

        for (let num28 = 0; num28 < num27; num28++) {
          missionDataBlock.ObjectivesCompleted[num28] = reader.readBoolean()
          missionDataBlock.ObjectivesAmountCompleted[num28] = reader.readInt32()
          missionDataBlock.ObjectivesAmountNeeded[num28] = reader.readInt32()

          if (sgd.SaveVerID > 25) {
            missionDataBlock.ObjectivesShownCompletedMessage[num28] = reader.readBoolean()
          } else {
            missionDataBlock.ObjectivesShownCompletedMessage[num28] = missionDataBlock.ObjectivesCompleted[num28]
          }
        }

        missionDataBlock.IsPickupMission = reader.readBoolean()
        missionDataBlock.RanStartRewards = reader.readBoolean()
        sgd.MissionDataBlocks.push(missionDataBlock)
      }

      sgd.SectorDataBlocks = []
    }

    return sgd
  }
}