export class PDADataBlock {
  public Type: number
  public ActorID = ""
  public NPCName = ""
  public ShipName = ""

  public SpecialActionCompleted: boolean
  public Hostile: boolean

  public LinesAlreadyDisplayed: number[] = []
  public LinesToShowPercent: number[] = []
}