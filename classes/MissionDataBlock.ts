export class MissionDataBlock {
  public MissionID: number
  public Abandoned: boolean
  public Ended: boolean
  public ObjectivesCompleted: boolean[]
  public ObjectivesAmountCompleted: number[]
  public ObjectivesAmountNeeded: number[]
  public ObjectivesShownCompletedMessage: boolean[]
  public IsPickupMission: boolean
  public RanStartRewards: boolean
}