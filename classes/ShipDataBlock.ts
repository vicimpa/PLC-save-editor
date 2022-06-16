import { ComponentOverrideData } from "./ComponentOverrideData"

export class ShipDataBlock {
  public ShipType: number
  public FactionID: number
  public SectorID: Number
  public IsDestroyed: boolean
  public ShipName: String
  public CompOverrides: ComponentOverrideData[]
  public HullPercent: number
  public ShldPercent: number
  public Modifiers: number
  public IsFlagged: boolean
  public ForceHostile: boolean
  public ForceHostileAll: boolean
  public ForceHostileName: string
  public SelectedActorID: string
  public BiscuitsSold: number
  public WonFBContest: boolean
  public EnsureNoCrew: boolean
  public IsRelicHunter: boolean
  public RH_Data: string
  public RH_Crew: string
}