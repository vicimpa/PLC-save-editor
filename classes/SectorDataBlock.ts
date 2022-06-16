import { PLPlayerDroppedItem_WithTLIData } from "./PLPlayerDroppedItem"
import { Vector3 } from "./Vector3"

export class SectorDataBlock {
  public ID: number
  public Type: boolean
  public FactionStrength: number
  public Faction: number
  public SectorPosition: Vector3
  public SectorName: string
  public MissionSpecificID: number
  public LockedToFaction: boolean
  public LastCalculatedSectorStrength: number
  public IsPartOfLongRangeWarpNetwork: boolean
  // public PLPersistantEncounterData PED;
  public HasPED: boolean
  public Visited: boolean
  public BiscuitsSoldCounter: number
  public DroppedItems: PLPlayerDroppedItem_WithTLIData[];
  public AdditionalSaveData: Buffer
}