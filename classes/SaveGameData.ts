import { ClassDataBlock } from "./ClassDataBlock"
import { ETalents } from "./ETalents"
import { FactionDataBlock } from "./FactionDataBlock"
import { MissionDataBlock } from "./MissionDataBlock"
import { PawnItemDataBlock } from "./PawnItemDataBlock"
import { PDADataBlock } from "./PDADataBlock"
import { PLPlayerDroppedItem } from "./PLPlayerDroppedItem"
import { SaveGameDataBasic } from "./SaveGameDataBasic"
import { SectorDataBlock } from "./SectorDataBlock"
import { ShipDataBlock } from "./ShipDataBlock"
import { Vector3 } from "./Vector3"

export class SaveGameData extends SaveGameDataBasic {
  public FactionRepInfo: number[]
  public BiscuitContestIsOver: boolean
  public StormPosition: Vector3
  public RacesWonBitfield: number
  public RacesLostBitfield: number
  public RacesStartedBitfield: number
  public GameName: string
  public PS_ShipName: string
  public PS_ShipType: number
  public PS_Fuel: number
  public PS_Hull: number
  public PS_FBCrateSupply: number
  public PS_BiscuitsSold: number
  public PS_BiscuitsSold_WhenContestEnded: number
  public PS_BiscuitsSold_WonFBContest: boolean
  public PS_BBAvailable: boolean
  public ActiveBountyHunter_SectorID: number
  public ActiveBountyHunter_SecondsSinceWarp: number
  public ActiveBountyHunter_TypeID: number
  public ActiveBountyHunter_ProcessedChaosLevel: number
  public PacifistRun: boolean
  public CreditsSpent_InRun: number
  public BlindJumpCount: number
  public PerfectBiscuitStreak: number
  public PurchaseLimitsEnabled: boolean
  public DataFragmentsCollected: number
  public BountyHuntersSpawned: number
  public PTCountdownArmed: boolean
  public PTCountdown: number
  public PTCountdownDisabledTimer: boolean
  public BHI_Exists: boolean
  public BHI_HullPercent: number
  public BHI_ShipName: string
  public BHI_ShipType: number
  public BHL_Exists: boolean
  public BHL_Data: string
  public BHL_Crew: string
  public PS_CurrentUpgradeMats: number
  public PS_CurrentItemUpgradeHash: number
  public PS_CoolantLevel: number
  public PS_EndGameSequenceActive: boolean
  public PS_IsReflection: boolean
  public PS_AdditionalShipData: Buffer
  public PS_NumComponents: number
  public PS_ComponentHash: number[]
  public PS_ComponentSortID: number[]
  public PS_SubTypeData: number[]
  public PS_DroppedItems: PLPlayerDroppedItem[]
  public CrewFactionID: number
  public PlayerShipIsFlagged: boolean
  public PlayerShipIsRevealed: boolean
  public LongRangeCommsDisabled: boolean
  public AlreadyAttemptedToStartPickupMissionID: number[]
  public LockerInventories: PawnItemDataBlock[][]
  public ClassData: ClassDataBlock[]
  public FactionData: FactionDataBlock[]
  public ChaosLevel: number
  public ActiveChaosEvents: bigint
  public TalentLockedStatus: bigint
  public TalentToResearch: ETalents
  public JumpsNeededToResearchTalent: number
  public ResearchMaterials: number[]
  public AtomizerItems: PawnItemDataBlock[]
  public MissionDataBlocks: MissionDataBlock[]
  public ShipDataBlocks: ShipDataBlock[]
  public SectorDataBlocks: SectorDataBlock[]
  public SelectedShipTypeID: number
  public ServerShipIDCounter: number
  public PDAs: PDADataBlock[]
  public AIData: Buffer
  public GalaxyGenerationSettingsData: string
}