import ActivityModel from '../../view/act/model/ActivityModel';
import ActivityUtils from './ActivityUtils';
import ActUtil from '../../view/act/util/ActUtil';
import AdventureModel from '../../view/adventure/model/AdventureModel';
import AdventureUtils from '../../view/adventure/utils/AdventureUtils';
import ArenaHonorModel from '../models/ArenaHonorModel';
import ArenaHonorUtils from '../../view/arenahonor/utils/ArenaHonorUtils';
import ArenaTeamViewModel from '../../view/arenaTeam/model/ArenaTeamViewModel';
import BagModel, { BagItem, BagType } from '../models/BagModel';
import BagUtils from './BagUtils';
import BYModel from '../../view/bingying/model/BYModel';
import CarnivalUtil from '../../view/act/util/CarnivalUtil';
import ChampionModel from '../../view/champion/model/ChampionModel';
import CombineModel from '../../view/combine/model/CombineModel';
import CombineUtils from '../../view/combine/util/CombineUtils';
import ConfigManager from '../managers/ConfigManager';
import CopyModel, { CopyType } from '../models/CopyModel';
import CopyUtil from '../../common/utils/CopyUtil';
import CostumeUtils from './CostumeUtils';
import DoomsDayModel from '../../view/instance/model/DoomsDayModel';
import EnergyModel from '../../view/energy/model/EnergyModel';
import EquipModel from '../models/EquipModel';
import EquipUtils from './EquipUtils';
import ExpeditionModel from '../../view/guild/ctrl/expedition/ExpeditionModel';
import ExpeditionUtils from '../../view/guild/ctrl/expedition/ExpeditionUtils';
import FootHoldModel from '../../view/guild/ctrl/footHold/FootHoldModel';
import FootHoldUtils from '../../view/guild/ctrl/footHold/FootHoldUtils';
import FriendModel from '../../view/friend/model/FriendModel';
import GeneralModel from '../models/GeneralModel';
import GlobalUtil from './GlobalUtil';
import GuardianModel from '../../view/role/model/GuardianModel';
import GuardianTowerModel from '../../view/act/model/GuardianTowerModel';
import GuardianUtils from '../../view/role/ctrl2/guardian/GuardianUtils';
import GuildModel, { GuildAccess } from '../../view/guild/model/GuildModel';
import GuildUtils from '../../view/guild/utils/GuildUtils';
import HeroModel from '../models/HeroModel';
import HeroUtils from './HeroUtils';
import InstanceModel, { InstanceData } from '../../view/instance/model/InstanceModel';
import JumpUtils from './JumpUtils';
import LotteryModel from '../../view/lottery/model/LotteryModel';
import MailModel from '../../view/mail/model/MailModel';
import MainLineModel from '../../view/instance/model/MainLineModel';
import MercenaryModel from '../../view/mercenary/model/MercenaryModel';
import MercenaryUtils from '../../view/mercenary/utils/MercenaryUtils';
import MilitaryRankUtils from '../../view/guild/ctrl/militaryRank/MilitaryRankUtils';
import MineUtil from '../../view/act/util/MineUtil';
import ModelManager from '../managers/ModelManager';
import NewAdventureModel from '../../view/adventure2/model/NewAdventureModel';
import NewAdventureUtils from '../../view/adventure2/utils/NewAdventureUtils';
import PeakModel from '../../view/act/model/PeakModel';
import PiecesModel from '../models/PiecesModel';
import RedpointModel, { StoreValue } from '../models/RedpointModel';
import RelicModel from '../../view/relic/model/RelicModel';
import RelicUtils from '../../view/relic/utils/RelicUtils';
import ResonatingModel from '../../view/resonating/model/ResonatingModel';
import ResonatingUtils from '../../view/resonating/utils/ResonatingUtils';
import RoleModel from '../models/RoleModel';
import RoyalModel from '../models/RoyalModel';
import RuneModel from '../models/RuneModel';
import RuneUtils from './RuneUtils';
import SailingModel from '../../view/act/model/SailingModel';
import ServerModel from '../models/ServerModel';
import SiegeModel from '../../view/guild/ctrl/siege/SiegeModel';
import SignModel from '../../view/sign/model/SignModel';
import SoldierModel from '../models/SoldierModel';
import StoreModel from '../../view/store/model/StoreModel';
import StoreUtils from './StoreUtils';
import TaskModel from '../../view/task/model/TaskModel';
import TaskUtil from '../../view/task/util/TaskUtil';
import TimerUtils from './TimerUtils';
import TrialInfo from '../../view/instance/trial/model/TrialInfo';
import VaultModel from '../../view/vault/model/VaultModel';
import WorldHonorModel from '../models/WorldHonorModel';
import WorldHonorUtils from '../../view/worldhonor/utils/WorldHonorUtils';
import {
    Activity_alchemyCfg,
    Activity_collect_heroCfg,
    Activity_continuousCfg,
    Activity_cumloginCfg,
    Activity_discountCfg,
    Activity_guardianCfg,
    Activity_mysteriousCfg,
    Activity_newtopupCfg,
    Activity_ranking3Cfg,
    Activity_ranking7Cfg,
    Activity_rechargeCfg,
    Activity_star_giftsCfg,
    Activity_super_valueCfg,
    Activity_top_upCfg,
    Activity_upgradeCfg,
    ActivityCfg,
    Adventure_passCfg,
    Adventure2_passCfg,
    Arenahonor_progressCfg,
    Arenahonor_worldwideCfg,
    Arenahonor_worshipCfg,
    BarracksCfg,
    Cave_adventureCfg,
    Cave_taskCfg,
    Champion_divisionCfg,
    Champion_exchangeCfg,
    Champion_mainCfg,
    Combine_dailyCfg,
    Combine_rewardsCfg,
    Combo_lineCfg,
    ComboCfg,
    Common_red_pointCfg,
    Copy_ruin_rewardCfg,
    Copy_stageCfg,
    CopyCfg,
    Copycup_prizeCfg,
    Copyultimate_stageCfg,
    Costume_costCfg,
    Costume_globalCfg,
    Costume_progressCfg,
    CostumeCfg,
    Diary_globalCfg,
    Diary_reward1Cfg,
    Diary_rewardCfg,
    DiaryCfg,
    Energystation_advancedCfg,
    Energystation_typeCfg,
    Energystation_upgradeCfg,
    Eternal_stageCfg,
    Expedition_missionCfg,
    Expedition_strengthenCfg,
    Foothold_dailytaskCfg,
    Foothold_teachingCfg,
    GeneCfg,
    General_weapon_levelCfg,
    General_weapon_missionCfg,
    General_weapon_progressCfg,
    General_weaponCfg,
    Gift_daily_firstCfg,
    Gift_powerCfg,
    GlobalCfg,
    Growthfund_towerfundCfg,
    GrowthfundCfg,
    Guardian_cumulativeCfg,
    Guardian_equip_lvCfg,
    Guardian_equip_starCfg,
    Guardian_equipCfg,
    Guardian_globalCfg,
    Guardian_lvCfg,
    Guardian_starCfg,
    GuardianCfg,
    Guild_signCfg,
    GuildbossCfg,
    Guildpower_globalCfg,
    Hero_awakeCfg,
    Hero_careerCfg,
    Hero_legionCfg,
    Hero_lvCfg,
    Hero_starCfg,
    Hero_trammelCfg,
    HeroCfg,
    Hotel_mapCfg,
    Item_composeCfg,
    Item_equipCfg,
    ItemCfg,
    Justice_bossCfg,
    Justice_generalCfg,
    Justice_mercenaryCfg,
    Luckydraw_turntableCfg,
    LuckydrawCfg,
    Mission_7activityCfg,
    Mission_daily_activeCfg,
    Mission_grow_chapterCfg,
    Mission_growCfg,
    Mission_guildCfg,
    Mission_weekly_activeCfg,
    Mission_welfare2Cfg,
    Mission_welfareCfg,
    Operation_eggCfg,
    Operation_globalCfg,
    Operation_storeCfg,
    Pass_weeklyCfg,
    PassCfg,
    Peak_challengeCfg,
    Peak_gradeCfg,
    Pieces_divisionCfg,
    Relic_mapCfg,
    Relic_passCfg,
    Relic_taskCfg,
    Royal_divisionCfg,
    Rune_clearCfg,
    Rune_unlockCfg,
    RuneCfg,
    Sailing_globalCfg,
    Sailing_mapCfg,
    Sailing_topupCfg,
    Score_missionCfg,
    ScoreCfg,
    Soldier_army_skinCfg,
    Soldier_army_trammelCfg,
    Soldier_skin_resolveCfg,
    SoldierCfg,
    Store_7dayCfg,
    Store_giftCfg,
    Store_pushCfg,
    Store_sevenday_war_giftCfg,
    Store_star_giftCfg,
    StoreCfg,
    SystemCfg,
    Talent_alchemyCfg,
    Talent_arenaCfg,
    Talent_extra_chanceCfg,
    Talent_quick_combatCfg,
    Talent_treasureCfg,
    Tavern_taskCfg,
    TavernCfg,
    Teamarena_prizeCfg,
    Tech_consumptionCfg,
    Tech_globalCfg,
    TechCfg,
    Twist_eggCfg,
    Unique_globalCfg,
    Unique_lotteryCfg,
    UniqueCfg,
    VipCfg
    } from '../../a/config';
import { GetInstanceDataByInstanceId, ParseMainLineId } from '../../view/instance/utils/InstanceUtil';
import { InstanceID } from '../../view/instance/enum/InstanceEnumDef';
import { MoneyType } from '../../view/store/ctrl/StoreViewCtrl';
import { MRPrivilegeType } from '../../view/guild/ctrl/militaryRank/MilitaryRankViewCtrl';
import { StoreType } from '../../view/store/enum/StoreType';
import { subActType } from '../../view/act/ctrl/wonderfulActivity/SubActivityViewCtrl';

// ????????????????????????????????????????????????????????????????????????????????????
// interface StoreValue {
//     [key: string]: boolean,
// }

// let _temp: StoreValue = {};

// ???????????????????????????
class RedPointEvent {
    static RED_POINT_STATUS_UPDATE: string = "RED_POINT_STATUS_UPDATE";
};

/**
 * ???????????????
 * @Author: sthoo.huang
 * @Date: 2019-06-26 20:08:14
 * @Last Modified by: jiangping
 * @Last Modified time: 2021-10-14 16:33:11
 */
class RedPointUtilsClass {
    get roleModel(): RoleModel {
        return ModelManager.get(RoleModel);
    }

    get bagModel(): BagModel {
        return ModelManager.get(BagModel);
    }

    get equipModel(): EquipModel {
        return ModelManager.get(EquipModel);
    }

    get heroModel(): HeroModel {
        return ModelManager.get(HeroModel);
    }

    get mainLineModel(): MainLineModel {
        return ModelManager.get(MainLineModel);
    }

    get instanceModel(): InstanceModel {
        return ModelManager.get(InstanceModel);
    }

    get storeModel(): StoreModel {
        return ModelManager.get(StoreModel);
    }

    get taskModel(): TaskModel {
        return ModelManager.get(TaskModel);
    }

    get activityModel(): ActivityModel {
        return ModelManager.get(ActivityModel);
    }

    get lotteryModel(): LotteryModel {
        return ModelManager.get(LotteryModel);
    }

    get mercenaryModel(): MercenaryModel {
        return ModelManager.get(MercenaryModel);
    }

    get relicModel(): RelicModel {
        return ModelManager.get(RelicModel);
    }

    get guarianTowerModel(): GuardianTowerModel {
        return ModelManager.get(GuardianTowerModel);
    }
    get guarianModel(): GuardianModel {
        return ModelManager.get(GuardianModel);
    }

    get rewardList(): icmsg.GoodsInfo[] {
        return this.mainLineModel.rewardList;
    }

    get hero(): icmsg.HeroInfo {
        return this.heroModel.curHeroInfo;
    }

    get equip(): BagItem {
        return this.heroModel.curEquip;
    }

    get heros(): icmsg.HeroInfo[] {
        let a: icmsg.HeroInfo[] = [];
        let h: BagItem[] = this.heroModel.heroInfos;
        for (let i = 0, n = h.length; i < n; i++) {
            a.push(h[i].extInfo as icmsg.HeroInfo);
        }
        return a;
    }

    get byModel(): BYModel {
        return ModelManager.get(BYModel);
    }

    get copyModel(): CopyModel {
        return ModelManager.get(CopyModel);
    }

    get redPointModel(): RedpointModel {
        return ModelManager.get(RedpointModel);
    }

    get guildModel(): GuildModel {
        return ModelManager.get(GuildModel);
    }

    get runeModel(): RuneModel {
        return ModelManager.get(RuneModel);
    }

    get soldierModel(): SoldierModel {
        return ModelManager.get(SoldierModel)
    }

    get championModel(): ChampionModel {
        return ModelManager.get(ChampionModel);
    }

    get footHoldModel(): FootHoldModel {
        return ModelManager.get(FootHoldModel);
    }

    get energyModel(): EnergyModel {
        return ModelManager.get(EnergyModel);
    }

    get siegeModel(): SiegeModel {
        return ModelManager.get(SiegeModel);
    }

    get resonatingModel(): ResonatingModel {
        return ModelManager.get(ResonatingModel);
    }

    get combineModel(): CombineModel {
        return ModelManager.get(CombineModel);
    }

    get piecesModel(): PiecesModel {
        return ModelManager.get(PiecesModel);
    }

    get expeditionModel(): ExpeditionModel {
        return ModelManager.get(ExpeditionModel);
    }

    /**
     * ??????id????????????
     * @param id
     */
    get_item_by(id: number): BagItem {
        return BagUtils.getItemById(id);
    }

    /**
     * ????????????????????????
     * @param type
     * @param condition
     */
    get_items(type: BagType, condition?: any): BagItem[] {
        return BagUtils.getItemsByType(type, condition);
    }

    /**
     * ??????id????????????
     * @param id
     */
    get_equip_by(id: number): BagItem {
        return EquipUtils.getEquipData(id);
    }

    /**
     * ????????????????????????
     */
    get_equips(): BagItem[] {
        return EquipUtils.getEquipItems();
    }

    /**
     * ???????????????????????????????????????
     * @param hero
     * @param part
     */
    get_hero_equip(hero: icmsg.HeroInfo, part: number) {
        if (hero) {
            if (!this.is_hero_show_redPoint(hero)) {
                return null
            }
            if (hero.slots && hero.slots[part - 1]) {
                let id = hero.slots[part - 1].equipId
                let bagItem = this.get_equip_by(id)
                if (!bagItem) {
                    if (id > 0) {
                        bagItem = {
                            series: id,
                            itemId: id,
                            itemNum: 1,
                            type: BagType.EQUIP,
                            extInfo: null
                        }
                    }
                }
                return bagItem
            }
            return null
        }
    }

    /**
     * ??????????????????????????????????????????
     * @param hero
     */
    get_hero_equips(hero?: icmsg.HeroInfo): BagItem[] {
        let r: BagItem[] = [];
        if (hero) {
            if (!this.is_hero_show_redPoint(hero)) {
                return r
            }
        }
        else {
            return r
        }
        let slots = hero.slots
        for (let i = 0; i < slots.length; i++) {
            let id = slots[i].equipId
            if (id > 0) {
                let item = {
                    series: id,
                    itemId: id,
                    itemNum: 1,
                    type: BagType.EQUIP,
                    extInfo: null
                }
                r.push(item);
            }
        }
        // let a = this.get_equips();
        // for (let i = 0, n = a.length; i < n; i++) {
        //     let item = a[i] as BagItem;
        //     // if (hero &&
        //     //     hero.heroId != (item.extInfo as EquipInfo).heroId) {
        //     //     // ??????????????????????????????
        //     //     continue;
        //     // }
        //     if (!this.is_free_equip(item)) {
        //         r.push(item);
        //     }
        // }
        return r;
    }

    /**
     * ???????????????????????????????????????  ????????????????????????
     * @param condition
     */
    get_free_equipsByCareer(heroInfo: icmsg.HeroInfo, condition?: any, filter?: Function): BagItem[] {
        (filter === void 0) && (filter = this.is_free_equip);
        let equips = BagUtils.getItemsByType(BagType.EQUIP, condition, filter);
        let results = []
        let cfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", heroInfo.careerId)
        for (let i = 0; i < equips.length; i++) {
            results.push(equips[i])
        }
        return results;
    }

    /** ???????????????????????????????????????
     * @param condition
     */
    get_free_equips(condition?: any, filter?: Function): BagItem[] {
        (filter === void 0) && (filter = this.is_free_equip);
        return BagUtils.getItemsByType(BagType.EQUIP, condition, filter);
    }

    /**
     * ??????????????????
     * @param item
     * @param cfg
     */
    is_free_equip(item: BagItem, cfg?: any) {
        return true//(item.extInfo as EquipInfo).heroId == 0;
    }

    /**
     * ????????????????????????????????????.???????????????????????????????????? ???????????????
     * @param item
     */
    is_white_equip(item: BagItem) {
        let extInfo = item.extInfo as icmsg.EquipInfo;
        return true//extInfo.heroId == 0 && extInfo.isLock == false;
    }

    is_rune_clear() {
        if (!JumpUtils.ifSysOpen(2882)) return false;
        let items = RuneUtils.getMixRunes();
        for (let i = 0; i < items.length; i++) {
            let b = this.single_rune_clear(items[i]);
            if (b) {
                return true;
            }
        }
        //????????????
        let herosRunes = this.runeModel.runeInHeros;
        for (let i = 0; i < herosRunes.length; i++) {
            if (herosRunes[i].itemId.toString().length == 8) {
                let b = this.single_rune_clear(herosRunes[i]);
                if (b) {
                    return true;
                }
            }
        }
        return false;
    }

    single_rune_clear(item: BagItem, types: number[] = [1, 2]) {
        if (!JumpUtils.ifSysOpen(2882)) return false;
        //??????
        //??????
        let lv = parseInt(item.itemId.toString().slice(6));
        if (lv >= 20) return false;
        for (let i = 0; i < types.length; i++) {
            let cfg = ConfigManager.getItemByField(Rune_clearCfg, 'clear_lv', lv, { type: types[i] });
            let b = true;;
            for (let j = 0; j < cfg.item_cost.length; j++) {
                let cost = cfg.item_cost[j];
                if (BagUtils.getItemNumById(cost[0]) < cost[1]) {
                    b = false;
                    break;
                }
            }
            if (b) {
                return true;
            }
        }
        // //???????????????
        // let blessCfg = ConfigManager.getItem(Rune_blessCfg, (cfg: Rune_blessCfg) => {
        //     if (cfg.clear_lv[0] <= lv && lv <= cfg.clear_lv[1]) {
        //         return true;
        //     }
        // });
        // let runeInfo = <icmsg.RuneInfo>item.extInfo;
        // if (runeInfo.heroId > 0) {
        //     let blessId = parseInt(`${runeInfo.id}${HeroUtils.getHeroInfoByHeroId(runeInfo.heroId).typeId}${runeInfo.heroId}`);
        //     let bless = this.runeModel.blessMap[blessId] ? this.runeModel.blessMap[blessId].bless : 0;
        //     return bless >= blessCfg.bless_total;
        // }
        // else {
        //     for (let i = 0; i < item.itemNum; i++) {
        //         let blessId = parseInt(`${item.itemId}${i + 1}`);
        //         let bless = this.runeModel.blessMap[blessId] ? this.runeModel.blessMap[blessId].bless : 0;
        //         return bless >= blessCfg.bless_total;
        //     }
        // }
    }

    single_rune_strengthen(id: number) {
        if (!JumpUtils.ifSysOpen(2855)) return false;
        let cfg = ConfigManager.getItemById(RuneCfg, parseInt(id.toString().slice(0, 6)));
        if (!cfg) return false;
        let nextCfg = ConfigManager.getItemByField(RuneCfg, 'color', cfg.color, { level: cfg.level + 1 });
        if (nextCfg && cfg.strengthening && cfg.strengthening[0]) {
            let cost = cfg.strengthening[0];
            if (BagUtils.getItemNumById(cost[0]) >= cost[1]) {
                return true;
            }
        }
        return false;
    }

    /**??????????????????????????? */
    is_rune_strengthen() {
        if (!JumpUtils.ifSysOpen(2855)) return false;
        let items = this.runeModel.runeInHeros;
        if (!items || items.length <= 0) return false;
        for (let i = 0; i < items.length; i++) {
            if (this.single_rune_strengthen(items[i].itemId)) return true;
        }
        return false;
    }

    /**????????????????????? */
    is_can_rune_up(hero: icmsg.HeroInfo, pos: number): boolean {
        if (!hero) return false;
        let runeItems = this.runeModel.runeItems;
        if (runeItems.length <= 0) return false;
        let limitCfg = ConfigManager.getItemById(Rune_unlockCfg, pos + 1);
        if (limitCfg.level && hero.level < limitCfg.level) return false;
        if (limitCfg.star && hero.star < limitCfg.star) return false;
        let oldCfg = hero.runes[pos] ? ConfigManager.getItemById(RuneCfg, parseInt(hero.runes[pos].toString().slice(0, 6))) : null;
        let oldType = [];
        if (oldCfg) {
            oldType.push(oldCfg.type);
            if (oldCfg.mix_type) oldType.push(oldCfg.mix_type);
        }
        for (let i = 0; i < runeItems.length; i++) {
            let cfg = ConfigManager.getItemById(RuneCfg, parseInt(runeItems[i].itemId.toString().slice(0, 6)));
            if (cfg
                && (!oldCfg || (oldCfg.type == cfg.type && oldCfg.mix_type == cfg.mix_type && (cfg.color > oldCfg.color || cfg.level > oldCfg.level)))) {
                return true;
            }
        }
        return false;
    }

    is_can_rune_merage(color: number[]) {
        if (!JumpUtils.ifSysOpen(2855)) return false;
        for (let i = 0; i < color.length; i++) {
            let cfgs = ConfigManager.getItemsByField(RuneCfg, 'color', color[i]);
            if (cfgs) {
                for (let j = 0; j < cfgs.length; j++) {
                    if (cfgs[j].consumption && cfgs[j].consumption.length > 0 && this.is_single_rune_can_merage(cfgs[j])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    is_single_rune_can_merage(cfg: RuneCfg) {
        if (!JumpUtils.ifSysOpen(2855)) return false;
        if (!CopyUtil.isFbPassedById(cfg.unlock)) {
            return false;
        }
        let heroItemsIds = [];
        this.runeModel.runeInHeros.forEach(item => {
            if (item.itemId == cfg.consumption_main[0][0]) {
                let heroId = (<icmsg.RuneInfo>item.extInfo).heroId;
                let customId = parseInt(`${item.itemId}${HeroUtils.getHeroInfoByHeroId(heroId).typeId}${heroId}`);
                heroItemsIds.push(customId);
            }
        });

        let mainItems = [RuneUtils.getRuneData(cfg.consumption_main[0][0])];
        let mainItemIds: number[] = [...heroItemsIds];
        mainItems.forEach(item => {
            if (item) {
                let num = item.itemNum;
                let id = item.itemId;
                for (let i = 0; i < num; i++) {
                    let customId = parseInt(`${id}${i}`); // id+idx ??????????????????id????????????  ?????????6??????id
                    if (mainItemIds.indexOf(customId) == -1) {
                        mainItemIds.push(customId);
                    }
                }
            }
        });

        let matiralsItem = RuneUtils.getMaterialsRune(cfg.consumption_material[0]);
        let matiralsItemIds: number[] = [];
        let repeatIds: number[] = [];
        matiralsItem.forEach(item => {
            if (item) {
                let num = item.itemNum;
                let id = item.itemId;
                for (let i = 0; i < num; i++) {
                    let customId = parseInt(`${id}${i}`); // id+idx ??????????????????id????????????  ?????????6??????id
                    if (matiralsItemIds.indexOf(customId) == -1) {
                        matiralsItemIds.push(customId);
                    }
                    if (mainItemIds.indexOf(customId) !== -1) {
                        repeatIds.push(customId);
                    }
                }
            }
        });

        let leftM = mainItemIds.length - cfg.consumption_main[0][1]
        if (leftM < 0) {
            return false;
        }
        else {
            let n = Math.max(0, repeatIds.length - leftM); //???????????????/??????????????????????????? ????????????????????????
            if (matiralsItemIds.length - n >= cfg.consumption_material[0][2]) {
                let otherCost = cfg.consumption;
                for (let i = 0; i < otherCost.length; i++) {
                    if (BagUtils.getItemNumById(otherCost[i][0]) < otherCost[i][1]) {
                        break;
                    }
                    if (i == otherCost.length - 1) {
                        return true
                    }
                }
            }
        }
        return false;
    }

    /**
     * ?????????????????????????????????????????????????????????
     * @param hero
     * @param item
     */
    is_can_equip_up(hero: icmsg.HeroInfo, item: BagItem): boolean {
        if (!hero) return false;
        if (!item) return false;
        if (!this.is_hero_show_redPoint(hero)) {
            return false
        }
        let cfg = ConfigManager.getItemById(Item_equipCfg, item.itemId);
        let equip = this.get_hero_equip(hero, cfg.part);
        //??????????????????????????????
        // if (!equip) {
        //     return true;
        // }
        if (this.compare_equip(equip, item, hero)) {
            return true;
        }
        return false;
    }

    /**
     * ?????????????????????????????????
     * @param hero
     * @param item
     */
    is_can_equip_change(item: BagItem): boolean {
        if (!item) return false;
        // let hero = HeroUtils.getHeroInfoByHeroId((item.extInfo as EquipInfo).heroId)
        // if (!this.is_hero_show_redPoint(hero)) {
        //     return false
        // }
        // let cfg = ConfigManager.getItemById(Item_equipCfg, item.itemId);
        // let equips = this.get_free_equipsByCareer(hero, { part: cfg.part });
        // for (let i = 0; i < equips.length; i++) {
        //     const equip = equips[i];
        //     if (this.compare_equip(item, equip, hero)) {
        //         return true;
        //     }
        // }
        return false;
    }

    /**
     * ??????????????????????????????
     * @param item
     */
    is_can_strength(item: BagItem): boolean {
        if (!item) return false;

        // let curHeroInfo = HeroUtils.getHeroInfoByHeroId((item.extInfo as EquipInfo).heroId)
        // if (!this.is_hero_show_redPoint(curHeroInfo)) {
        //     return false
        // }

        // //????????????????????? ?????????6??? ???????????????????????????????????????
        //?????????????????????????????????
        // if (this.heroModel.maxPowerHeroList.indexOf((item.extInfo as EquipInfo).heroId) != -1) {
        //     // 
        //     let ids = this.heroModel.maxPowerHeroList
        //     let count = 0
        //     for (let j = 0; j < ids.length; j++) {
        //         let heroInfo = HeroUtils.getHeroInfoBySeries(ids[j]).extInfo as HeroInfo
        //         for (let i = 1; i <= 4; i++) {
        //             let id = heroInfo.equips[i - 1] ? heroInfo.equips[i - 1] : 0;
        //             let equips = this.get_free_equipsByCareer(heroInfo, { part: i });
        //             if (equips.length) {
        //                 if (this.has_higher(this.get_equip_by(id), equips, 'equip', heroInfo)) {
        //                     count++
        //                     break
        //                 }
        //             }
        //         }
        //     }

        //     //??????????????????????????????
        //     if (count > 0) {
        //         return false
        //     }
        // }

        // ???????????????????????????
        // let equipCfg = ConfigManager.getItemById(Item_equipCfg, item.itemId);
        // let colorCfg = ConfigManager.getItemById(Item_equip_colorCfg, equipCfg.color);
        // let equipInfo = <EquipInfo>item.extInfo
        // let curStar = equipInfo.breakStar + colorCfg.star;
        // if (curStar == 0) return false; //0?????????
        // let starCfg = ConfigManager.getItemByField(Item_equip_starCfg, "color", equipCfg.color, { star: curStar });
        // if (equipInfo.level >= starCfg.limit) {
        //     return false;
        // }
        // // ??????????????????????????????
        // if (BagUtils.getItemsByType(BagType.ITEM, { func_id: 'add_equip_exp' }).length > 0) {
        //     return true;
        // }
        // // ????????????????????????.???????????????????????????????????? ????????????
        // if (this.get_free_equips(null, this.is_white_equip).length > 0) {
        //     return true;
        // }
        // let items = BagUtils.getItemsByType(BagType.ITEM, { func_id: 'add_equip_exp' })
        // //????????????
        // let itemExp = 0
        // if (items.length > 0) {
        //     for (let i = 0; i < items.length; i++) {
        //         let itemCfg = ConfigManager.getItemById(ItemCfg, items[i].itemId)
        //         itemExp += itemCfg.func_args[0] * items[i].itemNum
        //     }
        // }
        // let equips = this.get_free_equips(null, this.is_white_equip)
        // //????????????
        // let equipExp = 0
        // if (equips.length > 0) {
        //     for (let i = 0; i < equips.length; i++) {
        //         let bagEquipCfg = ConfigManager.getItemById(Item_equipCfg, equips[i].itemId)
        //         //?????????????????????????????????????????????(????????????)
        //         if (bagEquipCfg && bagEquipCfg.color < 3 && bagEquipCfg.color < equipCfg.color) {
        //             let equipColorCfg = ConfigManager.getItemById(Item_equip_colorCfg, bagEquipCfg.color)
        //             equipExp += equipColorCfg.exp
        //         }
        //     }
        // }
        // let equipAttrCfg = EquipUtils.getExpByLevel(equipInfo.typeId, equipInfo.level)
        // if (equipAttrCfg) {
        //     if (equipInfo.exp + equipExp + itemExp >= equipAttrCfg.lv_exp) {
        //         let global = ConfigManager.getItemById(GlobalCfg, "equip_strength_exp_gold");
        //         let moneyPerExp = Math.ceil(global.value[1] / global.value[0]);
        //         //?????????
        //         if ((equipAttrCfg.lv_exp - equipInfo.exp) * moneyPerExp <= this.roleModel.gold) {
        //             return true
        //         }
        //     }
        // }
        return false;
    }


    /**
     * ???????????????????????????
     * @param item
     */
    is_can_break_through(item: BagItem, isNeedAddItem: boolean = true): boolean {
        if (!item) return false;
        // let curHeroInfo = HeroUtils.getHeroInfoByHeroId((item.extInfo as EquipInfo).heroId)
        // if (!this.is_hero_show_redPoint(curHeroInfo)) {
        //     return false
        // }
        // let equipCfg = ConfigManager.getItemById(Item_equipCfg, item.itemId);
        // let colorCfg = ConfigManager.getItemById(Item_equip_colorCfg, equipCfg.color);
        // let curStar = (item.extInfo as EquipInfo).breakStar + colorCfg.star;
        // let starCfg = ConfigManager.getItemByField(Item_equip_starCfg, "color", equipCfg.color, {
        //     star: curStar,
        //     part: equipCfg.part
        // });
        // if (!starCfg) {
        //     return false
        // }

        // //????????????????????????
        // if (equipCfg.color == 1) {
        //     return false
        // }
        // let nStarCfg = ConfigManager.getItemByField(Item_equip_starCfg, "color", equipCfg.color, { star: curStar + 1, part: equipCfg.part });
        // // ??????????????????
        // if (!nStarCfg || starCfg.item_add && starCfg.item_add.length == 0 && starCfg.item && starCfg.item.length == 0) {
        //     return false;
        // }
        // // ????????????????????????
        // if ((item.extInfo as EquipInfo).level < starCfg.limit) {
        //     return false;
        // }
        // // ??????????????????
        // if (BagUtils.getItemNumById(starCfg.item[0]) < starCfg.item[1]) {
        //     // ???????????????????????? ????????????id??????,???????????????????????????????????????????????????????????????
        //     let bagEquips = BagUtils.getItemsByType(BagType.EQUIP, { id: item.itemId }, (equip: BagItem) => {
        //         let extInfo = <EquipInfo>equip.extInfo
        //         let tpLv = extInfo.breakStar
        //         let state = tpLv == 0 && extInfo.heroId == 0 && extInfo.isLock == false
        //         return state
        //     });
        //     if (bagEquips.length > 0 && !isNeedAddItem) {
        //         return true;
        //     }
        //     return false;
        // }

        // // ????????????????????????????????????????????? ????????????id??????,???????????????????????????????????????????????????????????????
        // if (!starCfg.item) {
        //     let bagEquips = BagUtils.getItemsByType(BagType.EQUIP, { id: item.itemId }, (equip: BagItem) => {
        //         let extInfo = <EquipInfo>equip.extInfo
        //         let tpLv = extInfo.breakStar
        //         let state = tpLv == 0 && extInfo.heroId == 0 && extInfo.isLock == false
        //         return state
        //     });
        //     if (bagEquips.length == 0) {
        //         return false;
        //     }
        // }

        // /**??????????????????  ?????????false*/
        // if (!isNeedAddItem) {
        //     return true
        // }

        // // ????????????????????????
        // for (let i = 0; i < starCfg.item_add.length; i++) {
        //     let id: number = starCfg.item_add[i][0];
        //     let num: number = starCfg.item_add[i][1];
        //     if (BagUtils.getItemNumById(id) < num) {
        //         return false;
        //     }
        // }

        // return true;
        return false
    }

    /**
     * ??????????????????????????????
     * @param item
     */
    is_can_mount_jewel(item: BagItem): boolean {
        if (!item) return false;
        // let curHeroInfo = HeroUtils.getHeroInfoByHeroId((item.extInfo as EquipInfo).heroId)
        // if (!this.is_hero_show_redPoint(curHeroInfo)) {
        //     return false
        // }
        // //??????????????????
        // let extInfo = item.extInfo as EquipInfo;
        // let equipRubys = extInfo.rubies
        // if (!equipRubys) {
        //     return false
        // }
        // let equipCfg = ConfigManager.getItemById(Item_equipCfg, item.itemId);
        // let curStar = equipCfg.star

        // // let ownHole = equipStarCfg.hole //?????????????????????
        // let info = item.extInfo as EquipInfo
        // //????????????????????? ????????????0 ????????????id
        // let mountRubys = info.rubies
        // //?????????????????????????????????
        // let jewels: BagItem[] = BagUtils.getItemsByType(BagType.JEWEL, { equip_part: equipCfg.part });
        // for (let j = 0; j < mountRubys.length; j++) {
        //     let rubyId = mountRubys[j]
        //     let holePos = j + 1;
        //     if (rubyId > 0) {
        //         let rubyCfg = ConfigManager.getItemById(Item_rubyCfg, rubyId);
        //         if (rubyCfg.level < equipStarCfg.diamond_lv) {
        //             //?????????
        //             let nextRubyCfg;
        //             nextRubyCfg = ConfigManager.getItemByField(Item_rubyCfg, "level", rubyCfg.level + 1, { type: rubyCfg.type, sub_type: rubyCfg.sub_type });
        //             if (nextRubyCfg) {
        //                 let bagJewelExps = BagUtils.getJewelExpByType(nextRubyCfg.sub_type, nextRubyCfg.type, nextRubyCfg.level - 1);
        //                 let totalExps = bagJewelExps + rubyCfg.exp;
        //                 if (Math.floor(totalExps / nextRubyCfg.exp) >= 1) return true;
        //             }
        //             //?????????
        //             for (let k = 0; k < jewels.length; k++) {
        //                 const jewel = jewels[k];
        //                 let bagRubyCfg = ConfigManager.getItemById(Item_rubyCfg, jewel.itemId);
        //                 if (bagRubyCfg.part.indexOf(holePos) != -1 && bagRubyCfg.level <= equipStarCfg.diamond_lv && bagRubyCfg.level > rubyCfg.level) {
        //                     //???????????? ??????????????????????????????
        //                     // if (equipCfg.part == 1) {
        //                     //     let list = heroCareerCfg.ruby
        //                     //     if (list && list.length > 0) {
        //                     //         for (let n = 0; n < list.length; n++) {
        //                     //             if (bagRubyCfg.sub_type == list[n][0] && bagRubyCfg.type == list[n][1]) {
        //                     //                 return true
        //                     //             }
        //                     //         }
        //                     //     }
        //                     // } else {
        //                     //     return true
        //                     // }
        //                     return true
        //                 }
        //             }
        //         }
        //     } else {
        //         //???????????????
        //         for (let i = 0; i < jewels.length; i++) {
        //             let bagRubyCfg = ConfigManager.getItemById(Item_rubyCfg, jewels[i].itemId)
        //             if (equipStarCfg.diamond_lv >= bagRubyCfg.level && bagRubyCfg.part.indexOf(holePos) != -1) {
        //                 // //???????????? ??????????????????????????????
        //                 // if (equipCfg.part == 1) {
        //                 //     let list = heroCareerCfg.ruby
        //                 //     if (list && list.length > 0) {
        //                 //         for (let n = 0; n < list.length; n++) {
        //                 //             if (bagRubyCfg.sub_type == list[n][0] && bagRubyCfg.type == list[n][1]) {
        //                 //                 return true
        //                 //             }
        //                 //         }
        //                 //     }
        //                 // } else {
        //                 //     return true
        //                 // }
        //                 return true
        //             }
        //         }
        //     }
        // }
        return false
    }

    /**
     * ???????????????????????????
     * @param item
     */
    is_can_enchant(item: BagItem): boolean {
        if (!item) return false;
        // ????????????????????????
        let equipCfg = ConfigManager.getItemById(Item_equipCfg, item.itemId);
        let magics: BagItem[] = BagUtils.getItemsByType(
            BagType.ITEM,
            { func_id: "equip_magic_id" },
            (item: BagItem, cfg: ItemCfg) => {
                return cfg.color <= 2 ? true : (cfg.color <= equipCfg.color)
            }
        );
        return magics.length > 0;
    }

    /**
     * ???????????????index??????????????????
     * @param heroInfo
     * @param index
     */
    is_can_change_job_to(heroInfo: icmsg.HeroInfo, index: number): boolean {
        // if (!heroInfo) return false;

        // if (!this.is_hero_show_redPoint(heroInfo)) {
        //     return false
        // }

        // let cfg = ConfigManager.getItemById(HeroCfg, heroInfo.typeId);
        // let ids: number[] = HeroUtils.getJobBackId(cfg.career_id);
        // if (!ids || !ids.length) {
        //     return false;
        // }

        // let jobs = [cfg.career_id];

        // // ???????????????????????????id??????
        // let startIndex = [1, 3]
        // if (ids) {
        //     for (let i = 0; i < ids.length; i++) {
        //         let index = startIndex[i]
        //         let id = ids[i]
        //         jobs[index] = id
        //         //??????
        //         let backIds = HeroUtils.getJobBackId(id)
        //         let bId = backIds ? backIds[0] : 0
        //         jobs[index + 1] = bId
        //     }
        // }

        // // for (let i = 1; i < 2; i++) {
        // //     let id = jobs[i] = ids[i - 1];
        // //     let backIds = HeroUtils.getJobBackId(id);
        // //     jobs[i + 1] = backIds ? backIds[0] : 0;
        // // }

        // let id = jobs[index];//??????????????????id
        // if (HeroUtils.getHeroJobLv(heroInfo.heroId, id) < 0) {
        //     // ?????????????????????????????????
        //     let preId = HeroUtils.getJobPreId(id);
        //     if (preId) {
        //         // ??????????????????????????????
        //         let maxLv = HeroUtils.getJobMaxLv(preId);
        //         let preLv = HeroUtils.getHeroJobLv(heroInfo.heroId, preId);
        //         if (preLv >= maxLv) {
        //             let careerCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", id, { career_lv: 0 });
        //             if (ModelManager.get(RoleModel).gold < careerCfg.trans_cost[1]) {
        //                 // ????????????
        //                 return false;
        //             }
        //             return true;
        //         }
        //     }
        // }
        return false;
    }

    /**
     * ???????????????????????????
     * @param heroInfo
     */
    is_can_job_up(heroInfo: icmsg.HeroInfo): boolean {
        if (!heroInfo) return false;
        if (!this.is_hero_show_redPoint(heroInfo)) {
            return false
        }
        let level = HeroUtils.getHeroJobLv(heroInfo.heroId, heroInfo.careerId);
        let nextCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", heroInfo.careerId, { career_lv: level + 1 });
        // ??????????????????
        if (!nextCfg) {
            return false;
        }
        // ??????????????????
        if (heroInfo.level < nextCfg.hero_lv) {
            return false;
        }
        // ??????????????????
        for (let i = 1; i <= 4; i++) {
            let key = 'career_item' + i;
            if (nextCfg[key]) {
                let itemId = nextCfg[key][0];
                let itemNum = nextCfg[key][1];
                if (BagUtils.getItemNumById(itemId) < itemNum) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
    * ???????????????????????????  ????????????
    * @param heroInfo
    */
    is_can_job_up_ignore_material(heroInfo: icmsg.HeroInfo): boolean {
        if (!heroInfo) return false;
        if (!this.is_hero_show_redPoint(heroInfo)) {
            return false
        }
        let level = HeroUtils.getHeroJobLv(heroInfo.heroId, heroInfo.careerId);
        let nextCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", heroInfo.careerId, { career_lv: level + 1 });
        // ??????????????????
        if (!nextCfg) {
            return false;
        }
        // ??????????????????
        if (heroInfo.level < nextCfg.hero_lv) {
            return false;
        }
        return true;
    }

    is_show_job_up_tips(heroInfo: icmsg.HeroInfo): boolean {
        if (!heroInfo) return false;
        let copyModel = ModelManager.get(CopyModel);
        let roleModel = ModelManager.get(RoleModel);
        let lastChapter = copyModel.lastCompleteStageId;
        let lv = roleModel.level;
        let cfg = ConfigManager.getItemByField(GlobalCfg, 'key', 'Advanced_tips');
        let b = lastChapter >= cfg.value[0] || lv >= cfg.value[1];
        return b && this.is_can_job_up_ignore_material(heroInfo);
    }

    /**
    * ???????????????????????????  ???????????????????????????????????????
    * @param heroInfo
    */
    is_can_job_up_and_can_get_item(heroInfo: icmsg.HeroInfo): boolean {
        if (!heroInfo) return false;
        if (!this.is_hero_show_redPoint(heroInfo)) {
            return false
        }
        let level = HeroUtils.getHeroJobLv(heroInfo.heroId, heroInfo.careerId);
        let nextCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", heroInfo.careerId, { career_lv: level + 1 });
        // ??????????????????
        if (!nextCfg) {
            return false;
        }
        // ??????????????????
        if (heroInfo.level < nextCfg.hero_lv) {
            return false;
        }

        for (let i = 0; i < 4; i++) {
            let key = 'career_item' + (i + 1)
            if (nextCfg[key]) {
                let itemId = nextCfg[key][0]
                let itemCfg = ConfigManager.getItemById(ItemCfg, itemId)
                if (itemCfg && itemCfg.stage_id && itemCfg.stage_id.length > 0) {
                    if (itemCfg.stage_id[0] > this.copyModel.latelyStageId) {
                        return false
                    }
                }
            }
        }
        return true;
    }

    /**
     * ????????????????????????
     * @param heroInfo
     */
    is_can_mystic_awake_skill(heroInfo: icmsg.HeroInfo): boolean {
        if (!heroInfo) return false;
        let cfg = ConfigManager.getItemById(HeroCfg, heroInfo.typeId);
        if (cfg.group[0] !== 6) return false;
        if (!heroInfo.mysticLink) return false;
        let totalLv = heroInfo.mysticSkills[0] + heroInfo.mysticSkills[1] + heroInfo.mysticSkills[2] + heroInfo.mysticSkills[3];
        if (totalLv == 20) return false;
        let ids = [130130, 130131];
        for (let i = 0; i < ids.length; i++) {
            if (BagUtils.getItemNumById(ids[i]) >= 1) {
                return true;
            }
        }
        for (let i = 0; i < this.heroModel.heroInfos.length; i++) {
            let info = this.heroModel.heroInfos[i];
            if (info.itemId == heroInfo.typeId && (<icmsg.HeroInfo>info.extInfo).mysticLink <= 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * ??????????????????????????????
     * @param heroInfo
     */
    is_can_star_up(heroInfo: icmsg.HeroInfo): boolean {
        if (!heroInfo) return false;
        let cfg = ConfigManager.getItemById(HeroCfg, heroInfo.typeId);
        if (cfg.group[0] == 6) return false;
        if (heroInfo.star == cfg.star_max) {
            return false;
        }
        else {
            if (HeroUtils.upStarLimit(heroInfo.star + 1, false)) {
                return false;
            }
            let [hasNum, needNum] = HeroUtils.getProgressOfUpStar(heroInfo.typeId, heroInfo.star);
            if (hasNum == needNum && hasNum !== 0) {
                return true;
            }
        }
        return false
    }


    /**
    * ??????????????????????????????
    * @param heroInfo
    */
    is_can_awake(heroInfo: icmsg.HeroInfo): boolean {
        if (!heroInfo) return false;
        let cfg = ConfigManager.getItemById(HeroCfg, heroInfo.typeId);
        if (heroInfo.star == cfg.star_max) {
            return false;
        } else {
            // if (HeroUtils.upStarLimit(heroInfo.star + 1, false)) {
            //     return false;
            // }
            let awakeState = this.heroModel.heroAwakeStates[heroInfo.heroId]
            let lv = awakeState ? awakeState.awakeLv + 1 : 1
            let taskNum = awakeState ? awakeState.number : 0
            let copyResult = awakeState ? awakeState.clear : false
            let awakeCfg = ConfigManager.getItemByField(Hero_awakeCfg, "hero_id", heroInfo.typeId, { awake_lv: lv })
            if (!awakeCfg) return false;
            if (awakeCfg.target) {
                if (taskNum >= awakeCfg.number) {
                    return true
                }
            } else if (awakeCfg.awake_item1 && awakeCfg.awake_item1.length > 0) {
                let [hasNum, needNum] = HeroUtils.getProgressOfAwake(heroInfo.typeId, heroInfo.star, lv);
                if (hasNum == needNum && hasNum !== 0) {
                    return true;
                }
            } else {
                if (copyResult) {
                    return true
                }
            }
        }
        return false
    }

    /**?????????????????????????????????????????? */
    is_can_soldier_change(heroInfo: icmsg.HeroInfo): boolean {
        if (!heroInfo) return false;

        let curSoldier = ConfigManager.getItemById(SoldierCfg, heroInfo.soldierId)
        //????????????????????????????????????id
        let ids = []
        let b_lv = this.byModel.byLevelsData[curSoldier.type - 1]
        let cfgs = ConfigManager.getItemsByField(BarracksCfg, "type", curSoldier.type)
        for (let i = 0; i < cfgs.length; i++) {
            if (b_lv >= cfgs[i].barracks_lv && cfgs[i].soldier_id && cfgs[i].soldier_id > 0) {
                ids.push(cfgs[i].soldier_id)
            }
        }
        ids.sort((a, b) => {
            return b - a
        })

        if (heroInfo.soldierId < ids[0]) {
            return true
        }

        // ?????????????????????????????????????????????????????????????????????
        // let ids = this.heroModel.activeHeroSoldierIds[heroInfo.heroId]
        // if (ids && ids.length > 0) {
        //     let careerCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", heroInfo.careerId)
        //     for (let i = 0; i < ids.length; i++) {
        //         let sCfg = ConfigManager.getItemById(SoldierCfg, ids[i])
        //         if (sCfg && sCfg.type == careerCfg.career_type) {
        //             return true
        //         }
        //     }
        // }
        return false
    }

    /** ?????????????????????*/
    is_can_hero_skill_unlock(heroInfo: icmsg.HeroInfo) {
        // if (!heroInfo) return false;
        // if (!this.is_hero_show_redPoint(heroInfo)) {
        //     return false
        // }
        // let model = ModelManager.get(HeroModel);
        // let ids = model.activeHeroSkillIds[heroInfo.heroId] as number[];
        // if (!ids || ids.length == 0) {
        //     return false;
        // }
        // return ids.length > 0;
        return false;
    }

    /** ???????????????*/
    is_can_hero_upgrade(heroInfo: icmsg.HeroInfo) {
        if (!heroInfo) return false;
        if (!this.is_hero_show_redPoint(heroInfo)) {
            return false
        }

        //??????????????????????????????
        let resonatingModel = ModelManager.get(ResonatingModel)
        if (resonatingModel.getHeroInUpList(heroInfo.heroId)) {
            return false;
        }

        let curLv: number = heroInfo.level;
        let curLvCfg = ConfigManager.getItemById(Hero_lvCfg, curLv)
        if (!curLvCfg) {
            return false
        }
        let starCfg = ConfigManager.getItemByField(Hero_starCfg, "star", heroInfo.star)

        let maxCareerCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", heroInfo.careerId, { career_lv: starCfg.career_lv })
        if (heroInfo.level >= maxCareerCfg.hero_lv) {
            return false
        }
        let costItems = curLvCfg.cost
        let careerCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", heroInfo.careerId, { career_lv: heroInfo.careerLv })
        let heroLvCfg = ConfigManager.getItemById(Hero_lvCfg, heroInfo.level)
        if (heroLvCfg && heroLvCfg.clv <= heroInfo.careerLv) {
            if (careerCfg && heroInfo.level >= careerCfg.hero_lv) {
                costItems = careerCfg.career_item1
            }
        }
        let count = 0
        for (let i = 0; i < costItems.length; i++) {
            if (BagUtils.getItemNumById(costItems[i][0]) >= costItems[i][1]) {
                count++
            }
        }
        if (count == costItems.length) {
            return true
        }
        return false
    }

    /**???????????????????????????????????? */
    is_has_target_unique_equip(heroInfo: icmsg.HeroInfo) {
        if (!heroInfo) return false;
        if (!JumpUtils.ifSysOpen(2956)) {
            return false
        }
        let herostar_unlock = ConfigManager.getItemById(Unique_globalCfg, "herostar_unlock").value[0]
        if (heroInfo.star < herostar_unlock) {
            return false
        }
        if (!heroInfo.uniqueEquip || (heroInfo.uniqueEquip && heroInfo.uniqueEquip.id == 0)) {
            // let uniqueCfg = ConfigManager.getItemByField(UniqueCfg, "hero_id", heroInfo.typeId)
            // if (uniqueCfg && uniqueCfg.unique.length > 0) {
            //     let equips = this.equipModel.uniqueEquipItems
            //     for (let i = 0; i < equips.length; i++) {
            //         if (uniqueCfg.id == equips[i].itemId) {
            //             return true
            //         }
            //     }
            // }
            return this.equipModel.uniqueEquipItems.length > 0
        }
        return false
    }


    /**??????????????????????????? */
    is_unique_equip_can_star_up(heroInfo: icmsg.HeroInfo) {
        if (!heroInfo) return false;
        if (!JumpUtils.ifSysOpen(2956)) {
            return false
        }
        if (heroInfo.uniqueEquip && heroInfo.uniqueEquip.id > 0) {

            //?????????????????????
            let uniqueCfg = ConfigManager.getItemById(UniqueCfg, heroInfo.uniqueEquip.itemId)
            if (!uniqueCfg) return false
            if (heroInfo.uniqueEquip.star >= uniqueCfg.star_max) {
                return false
            }
            let color4_item = ConfigManager.getItemById(Unique_globalCfg, "color4_item").value[0]
            let costId = color4_item
            if (uniqueCfg.color == 5) {
                let color5_item = ConfigManager.getItemById(Unique_globalCfg, "color5_item").value[0]
                costId = color5_item
            }
            if (BagUtils.getItemNumById(costId) > 0) {
                return true
            }

            //???????????????
            let items = this.equipModel.uniqueEquipItems
            for (let i = 0; i < items.length; i++) {
                if (items[i].itemId == uniqueCfg.id && (items[i].extInfo as icmsg.UniqueEquip).star == 0 && items[i].series != heroInfo.uniqueEquip.id) {
                    return true
                }
            }
        }
        return false
    }


    /**
     * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????, ???????????????
     * @param heroInfo
     */
    is_can_hero_opration(heroInfo: icmsg.HeroInfo): boolean {
        if (!heroInfo) return false;

        /**????????????????????????????????? */
        let upHeros = this.heroModel.PveUpHeroList
        if (upHeros.indexOf(heroInfo.heroId) == -1) {
            return false
        }

        // ????????? bu??????????????????????????????
        if (this.is_can_star_up(heroInfo)) {
            return true;
        }

        if (!this.is_hero_show_redPoint(heroInfo)) {
            return false
        }

        if (this.is_can_mystic_awake_skill(heroInfo)) {
            return true;
        }

        let equips = this.get_hero_equips(heroInfo);
        // ??????????????????
        for (let i = 1; i <= 4; i++) {
            equips = this.get_free_equips({ part: i });
            if (equips.length > 0) {
                for (let index = 0; index < equips.length; index++) {
                    if (this.is_can_equip_up(heroInfo, equips[index])) {
                        return true
                    }
                }
            }
        }
        for (let i = 0; i < 2; i++) {
            if (this.is_can_rune_up(heroInfo, i)) {
                return true
            }
        }
        //???????????????
        if (this.is_can_hero_upgrade(heroInfo)) {
            return true;
        }

        //???????????????
        if (this.is_can_soldier_change(heroInfo)) {
            return true;
        }

        // ??????????????????
        for (let i = 0; i < 4; i++) {
            let equips = this.get_free_costume({ part: i });
            if (equips.length > 0) {
                for (let index = 0; index < equips.length; index++) {
                    if (this.is_can_costume_up(heroInfo, equips[index])) {
                        return true
                    }
                }
            }

            //?????????
            if (this.is_can_costume_strength(heroInfo, i)) {
                return true
            }
        }

        //????????????????????????
        if (this.is_hero_guardian_can_puton(heroInfo)) {
            return true
        }

        //??????????????????  ?????? ??????
        if (this.is_hero_guardian_can_operate(heroInfo)) {
            return true
        }

        //?????????
        if (this.is_can_awake(heroInfo)) {
            return true;
        }

        //?????????????????????
        if (this.is_has_target_unique_equip(heroInfo)) {
            return true
        }

        //?????????????????????
        if (this.is_unique_equip_can_star_up(heroInfo)) {
            return true
        }

        return false;
    }


    /**????????????????????????????????? */
    is_part_equip_merge(arg0) {
        let equips = BagUtils.getItemsByType(BagType.EQUIP, { part: arg0 })

        let moeny = GlobalUtil.getMoneyNum(MoneyType.Gold)
        let cost = EquipUtils.getOneKeyEquipMergeCost(arg0)
        if (cost == 0 || moeny < cost) {
            return false
        }
        for (let i = 0; i < equips.length; i++) {
            let bagNum = BagUtils.getItemNumById(equips[i].itemId)
            let cfg = ConfigManager.getItem(Item_equipCfg, equips[i].itemId)
            if (bagNum >= cfg.material_number) {
                return true
            }
        }
        return false
    }


    /**????????????????????? */
    is_equip_merge() {
        let parts = [1, 2, 3, 4]
        if (this.each_or(parts, this.is_part_equip_merge)) {
            return true
        }
        return false
    }

    /**
     heroInfo ??? switch_flag;//0?????????1?????????
     * ?????? true ?????? false ?????????
     */
    is_hero_show_redPoint(heroInfo: icmsg.HeroInfo) {
        return true
    }

    /**
     * ????????????id????????????????????????
     * @param id
     */
    is_can_barracks_practice_by(id: number): boolean {
        //???????????????
        // if (!JumpUtils.ifSysOpen(1100)) {
        //     return false
        // }

        // // ???????????????
        // if (!BYUtils.getLockState(id)) {
        //     return false;
        // }
        // let byTechInfos = ModelManager.get(BYModel).byTechInfos;
        // let info = byTechInfos[id];
        // let level = info ? info.level : 0;
        // let nextCfg = ConfigManager.getItemByField(Barracks_science_lvCfg, "science_id", id, { science_lv: level + 1 })
        // // ????????????????????????????????????????????????????????????
        // if (!nextCfg) {
        //     return false;
        // }
        // // ??????????????????
        // for (let i = 1; i <= 4; i++) {
        //     let id = nextCfg['item_' + i];
        //     if (id) {
        //         let hasNum = BagUtils.getItemNumById(id)
        //         let type = BagUtils.getItemTypeById(id)
        //         if (type == BagType.MONEY) {
        //             hasNum = this.roleModel[AttTypeName[id]]
        //         }
        //         if (hasNum < nextCfg['count_' + i]) {
        //             return false;
        //         }
        //     }
        // }
        // return true;
        return false
    }

    /**??????????????? */
    is_equip_can_merge(partType) {
        let cfgs = ConfigManager.getItemsByField(Item_equipCfg, "part", partType)
        for (let i = 0; i < cfgs.length; i++) {
            if (cfgs[i].target_equip && cfgs[i].target_equip > 0) {
                if (BagUtils.getItemNumById(cfgs[i].id) >= cfgs[i].material_number) {
                    return true
                }
            }
        }
        return false
    }

    /**
     * ????????????????????????????????????
     */
    has_lcdl_reward() {
        let cfg: ActivityCfg = ActUtil.getCfgByActId(11);
        if (!cfg) return false;
        let monthlyPaySum = this.activityModel.monthlyRecharge;
        let type = cfg.reward_type;
        let cfgs = ConfigManager.getItems(Activity_top_upCfg, (cfg: Activity_top_upCfg) => {
            if (cfg.type == type) return true;
        });
        for (let i = 0; i < cfgs.length; i++) {
            if (monthlyPaySum >= cfgs[i].money && !ActivityUtils.getLcdlRewardState(cfgs[i].index)) return true;
        }
        return false;
    }

    /**
     * ???????????????????????????
     */
    has_weekend_gift() {
        if (!JumpUtils.ifSysOpen(2875)) return false;
        let day = new Date(GlobalUtil.getServerTime()).getDay();
        let idx = { 6: 0, 0: 1, 1: 2 }[day];
        if ((this.activityModel.weekEndRecord & 1 << idx) <= 0) return true
        else return false;
    }

    /**
     * ???????????????
     */
    has_Discount_reward() {
        if (!JumpUtils.ifSysOpen(2941)) return false;
        if (this.activityModel.discountData.length > 0) {
            let temData = this.activityModel.discountData[0]
            if (temData.times == 0) {
                return true;
            } else if (temData.times == 1) {
                let temCfg = ConfigManager.getItemByField(Activity_discountCfg, 'id', temData.payId)
                let maxCost = temCfg.RMB_cost * 10;
                if (this.activityModel.dayRecharge * 10 >= maxCost) {
                    return true;
                }
            }

        }
        return false;
    }
    /**
     * ???????????????????????????????????????
     */
    has_new_lcdl_reward() {
        let cfg: ActivityCfg = ActUtil.getCfgByActId(72);
        if (!cfg) return false;
        let monthlyPaySum = this.activityModel.newTopUpRecharge;
        let type = cfg.reward_type;
        let cfgs = ConfigManager.getItems(Activity_newtopupCfg, (cfg: Activity_newtopupCfg) => {
            if (cfg.type == type) return true;
        });
        for (let i = 0; i < cfgs.length; i++) {
            if (monthlyPaySum >= cfgs[i].money && !ActivityUtils.getNewLcdlRewardState(cfgs[i].index)) return true;
        }
        return false;
    }

    /**????????????????????????????????? */
    has_total_login_reward() {
        let cfg: ActivityCfg = ActUtil.getCfgByActId(10);
        if (!cfg) return false;
        let type = cfg.reward_type;
        let cfgs = ConfigManager.getItems(Activity_cumloginCfg, (cfg: Activity_cumloginCfg) => {
            if (cfg.type == type) return true;
        });
        let loginDays = this.activityModel.totalLoginDays;
        for (let i = 0; i < cfgs.length; i++) {
            if (loginDays >= cfgs[i].days) {
                if (!ActivityUtils.getTotalLoginRewardState(cfgs[i].index)) return true;
            }
        }
        return false;
    }

    /**????????????????????????????????? */
    has_flip_card_reward() {
        let cfg: ActivityCfg = ActUtil.getCfgByActId(46);
        if (!cfg) return false;
        //????????????>=1
        let costCfg = ConfigManager.getItemById(Operation_globalCfg, 1);
        let item = costCfg.item[cfg.reward_type - 1];
        let num = BagUtils.getItemNumById(item[0]);
        if (num >= item[1]) return true;
        else return false;
    }

    /**???????????? */
    has_twist_egg_free_time() {
        let cfg: ActivityCfg = ActUtil.getCfgByActId(47);
        if (!cfg) return false;
        if (!this.activityModel.isFirstDraw) return true;
        let cost = ConfigManager.getItemById(Operation_eggCfg, 100).cost;
        if (BagUtils.getItemNumById(cost[0]) >= cost[1]) {
            return true;
        }
        else {
            return false;
        }
    }

    /**???????????????-???????????????????????? */
    has_Mine_redPoint() {

        let res = false;

        //????????????????????????
        if (!ActUtil.ifActOpen(14)) return false;
        //1.??????????????????????????????
        res = MineUtil.getHavePassReward();
        //2.???????????????????????????
        if (!res) {
            res = MineUtil.getHaveTansuoState();
        }
        //3.??????????????????????????????
        if (!res) {
            let num = MineUtil.getCurGiftNum();
            res = num > 0;
        }
        //4.??????????????????????????????
        if (!res) {
            res = MineUtil.getHaveExChangeItem();
        }
        return res;
    }
    /**
     * ?????? ?????????????????????????????????????????????
     */
    is_can_reward_clearance(): boolean {
        // let state = false;
        // let model = this.taskModel
        // let cfgs: Mission_mainCfg[] = ConfigManager.getItems(Mission_mainCfg);
        // for (let i = 0; i < cfgs.length; i++) {
        //     let cfg = cfgs[i];
        //     let curState = 0;
        //     if (CopyUtil.isStagePassed(cfg.stage_id)) {
        //         curState = 1;
        //         let geted = model.rewardIds[cfg.id] || 0
        //         if (geted == 1) {
        //             curState = 2;
        //         }
        //     }
        //     if (curState == 1) {
        //         state = true;
        //     }
        // }
        //return state;
        return false
    }

    /**
     * ?????????????????????????????????
     */
    is_can_reward_weapon(): boolean {
        let chapterCfgs = ConfigManager.getItems(General_weapon_missionCfg);
        let lastChaptercfg = chapterCfgs[chapterCfgs.length - 1];
        if (this.taskModel.weaponChapter > lastChaptercfg.chapter) {
            return false;
        }

        let weaponCfgs = ConfigManager.getItemsByField(General_weapon_missionCfg, 'chapter', this.taskModel.weaponChapter);
        for (let i = 0; i < weaponCfgs.length; i++) {
            if (TaskUtil.getWeaponTaskItemState(weaponCfgs[i], i) == 1) {
                return true;
            }
        }
        return false;
    }

    /**
     * ????????????
     */
    is_gWeapon_can_upgrade(): boolean {
        let chapterCfgs = ConfigManager.getItems(General_weapon_missionCfg);
        let lastChaptercfg = chapterCfgs[chapterCfgs.length - 1];
        if (this.taskModel.weaponChapter <= lastChaptercfg.chapter) {
            return false;
        }
        let nextCfg = ConfigManager.getItemById(General_weapon_levelCfg, ModelManager.get(GeneralModel).waponLvCfgId + 1);
        if (!nextCfg) return false;
        for (let i = 0; i < nextCfg.cost.length; i++) {
            let cost = nextCfg.cost[i];
            if (BagUtils.getItemNumById(cost[0]) < cost[1]) return false;
        }
        return true;
    }

    /**
     * ????????????
     */
    is_gWeapon_can_refine(): boolean {
        let chapterCfgs = ConfigManager.getItems(General_weapon_missionCfg);
        let lastChaptercfg = chapterCfgs[chapterCfgs.length - 1];
        if (this.taskModel.weaponChapter <= lastChaptercfg.chapter) {
            return false;
        }
        let nextCfg = ConfigManager.getItemByField(General_weapon_progressCfg, 'lv', ModelManager.get(GeneralModel).weaponRefineLv + 1);
        if (!nextCfg) return false;
        for (let i = 0; i < nextCfg.consumption.length; i++) {
            let cost = nextCfg.consumption[i];
            if (BagUtils.getItemNumById(cost[0]) < cost[1]) return false;
        }
        return true;
    }

    /**
     * ?????????????????????????????????????????????
     */
    is_can_reward_grow(): boolean {
        if (!JumpUtils.ifSysOpen(2818)) return false;
        let state = false;
        let model = this.taskModel
        //grow
        let chapterCfgs = ConfigManager.getItems(Mission_grow_chapterCfg)
        let lastChaptercfg = chapterCfgs[chapterCfgs.length - 1]
        if (model.GrowChapter > lastChaptercfg.id) {
            return state;
        }
        let chapterId = Math.min(model.GrowChapter, lastChaptercfg.id)
        let growCfgs: Mission_growCfg[] = ConfigManager.getItems(Mission_growCfg, { chapter: chapterId });
        let num = 0;
        for (let i = 0; i < growCfgs.length; i++) {
            let cfg = growCfgs[i];
            let curstate = TaskUtil.getGrowTaskItemState(cfg, i);
            if (curstate == 2) {
                num += 1;
            }
            if (curstate == 1) {
                state = true;
            }
            //???????????????????????????
            if (cfg.target == 207 && curstate == 0) {
                state = true;
            }
        }
        if (num == growCfgs.length && model.GrowChapter <= lastChaptercfg.id) {
            state = true;
        }
        return state;
    }

    /**????????????????????????????????? */
    is_show_tip_grow(): boolean {
        let state = false;
        let model = this.taskModel
        let stageId = this.copyModel.latelyStageId
        let curChapter = ParseMainLineId(stageId, 1)//????????????

        let chapterCfgs = ConfigManager.getItems(Mission_grow_chapterCfg)
        let lastChaptercfg = chapterCfgs[chapterCfgs.length - 1]
        let chapterId = Math.min(model.GrowChapter, lastChaptercfg.id)
        let growCfgs: Mission_growCfg[] = ConfigManager.getItems(Mission_growCfg, { chapter: chapterId });
        for (let i = 0; i < growCfgs.length; i++) {
            let cfg = growCfgs[i];
            let curstate = TaskUtil.getGrowTaskItemState(cfg, i);
            if (curstate == 0) {
                let growChapterCfg = ConfigManager.getItemById(Mission_grow_chapterCfg, cfg.chapter)
                if (growChapterCfg.big_chapter < curChapter) {
                    state = true
                    break
                }
            }
        }

        //?????????????????????????????????
        let num = 0;
        for (let i = 0; i < growCfgs.length; i++) {
            let cfg = growCfgs[i];
            let curstate = TaskUtil.getGrowTaskItemState(cfg, i);
            if (curstate == 2) {
                num += 1;
            }
            if (curstate == 1) {
                state = false;
            }
            //???????????????????????????
            if (cfg.target == 207 && curstate == 0) {
                state = false;
            }
        }
        if (num == growCfgs.length && model.GrowChapter <= lastChaptercfg.id) {
            state = false;
        }

        return state;
    }


    is_can_reward_online(): boolean {
        let state = false;
        let online = TaskUtil.getOnlineReward() == 1;
        if (online) {
            state = true;
        }
        return state;
    }

    /**
     * ?????? ?????????????????????????????????????????????????????????????????????????????????
     */
    is_can_reward_grow_clearance_online(): boolean {
        if (this.roleModel.level < 16) {
            return true
        }
        let state = false;
        //clearance
        let clearanceState = this.is_can_reward_clearance();
        //grow
        let growState = this.is_can_reward_grow()
        //online
        let onlineState = this.is_can_reward_online()
        if (clearanceState || growState || onlineState) {
            state = true;
        }
        return state;
    }

    /**
     * ???????????????????????????????????????????????????????????????????????????
     * @param type
     * @param index
     */
    is_can_barracks_practice(type: number): boolean {
        // let byInfos = this.byModel.byInfos
        // let practice_lv = type * 100 + index + 1
        // let cfg = ConfigManager.getItemByField(Barracks_practiceCfg, "practice_lv", practice_lv)
        // if (cfg && byInfos[type].level < cfg.needlv) {
        //     return false
        // }

        // let list = ConfigManager.getItemsByField(
        //     Barracks_scienceCfg,
        //     "practice_lv",
        //     practice_lv,
        // );
        // if (!list || !list.length) return false;
        // for (let i = 0, n = list.length; i < n; i++) {
        //     let item = list[i];
        //     if (this.is_can_barracks_practice_by(item.science_id)) {
        //         return true;
        //     }
        // }
        let curTypeLv = this.byModel.byLevelsData[type - 1]
        let cfgs = ConfigManager.getItemsByField(BarracksCfg, "type", type)
        let b_cfg = ConfigManager.getItemByField(BarracksCfg, "type", type, { barracks_lv: curTypeLv })
        if (b_cfg) {
            let count = 0
            let costs = b_cfg.consumption
            for (let i = 0; i < costs.length; i++) {
                let ownNum = BagUtils.getItemNumById(costs[i][0])
                if (ownNum >= costs[i][1]) {
                    count++
                }
            }
            if (count == costs.length && b_cfg.barracks_lv < cfgs.length - 1) {
                return true
            }
        }
        return false;
    }

    /**
     * ????????????????????????
     */
    is_bag_chip_compose() {
        let cfgs = ConfigManager.getItems(Item_composeCfg);
        for (let i = 0; i < cfgs.length; i++) {
            let chipNum = BagUtils.getItemNumById(cfgs[i].id) || 0;
            if (Math.floor(chipNum / cfgs[i].amount) >= 1) {
                return true;
            }
        }
    }

    /**
     * ????????????????????????????????????
     * @param type
     * @param color
     * @param func_id
     * @param free
     */
    has_bag_item(type: BagType, color?: number, func_id?: string, ids?: number[], free?: boolean): boolean {
        let func: Function;
        let con: any;
        // ????????????????????????
        if (func_id) {
            con = { func_id: func_id };
        }
        if (ids) {
            con = (cfg: ItemCfg) => {
                return ids.indexOf(cfg.id) != -1;
            };
        }
        // // ??????????????????
        // if (cc.js.isNumber(color)) {
        //     func = (item: BagItem, cfg: Item_equipCfg) => {
        //         let b: boolean = false;
        //         if (free && item.type == BagType.EQUIP) {
        //             // ???????????????????????????????????????????????????
        //             b = this.is_free_equip(item, cfg);
        //         }
        //         return b && cfg.color >= color;
        //     };
        // }
        let items: BagItem[] = BagUtils.getItemsByType(type, con, func, this);
        return items && items.length > 0;
    }

    /**
     * ??????????????????
     * @param type
     * @param id
     * @param isAdd
     */
    update_bag_item(type: BagType, id: number, isAdd: boolean) {
        if (type == BagType.ITEM) {
            let cfg = ConfigManager.getItemById(ItemCfg, id);
            if (ConfigManager.isEquivalent(cfg, { func_id: "add_drop_items" }) || ConfigManager.isEquivalent(cfg, { func_id: "choose_drop_item" })) {
                // ?????????????????????
                type += 100;
            }
        }
        // if (isAdd && !gdk.panel.isOpenOrOpening(PanelId.Bag)) {
        //     // ?????????????????????????????????????????????
        //     this.save_state('bag_item', false);
        // }
        this.save_state('bag_item_' + id, isAdd);

        let key = 'bag_item_type_' + type;
        // if (this.is_not_in_state(key)) {
        this.save_state(key, isAdd);
        // }

    }

    /**
     * ???????????????????????????
     */
    has_unread_mails(): boolean {
        let model = ModelManager.get(MailModel);
        if (model.extraRedpoint) return true;
        for (let i = 0, n = model.mailInfos.length; i < n; i++) {
            let element = model.mailInfos[i];
            if (!element.isRead) {
                return true;
            }
        }
        return false;
    }

    /**
     * ????????????????????????????????????????????????????????????
     * @param type
     * 0:?????? 1:?????? 2:?????? 3:?????? 4:7?????????
     */
    has_unget_task(type: number): boolean {
        if (type == 3) {
            //?????????????????????????????????
            if (!JumpUtils.ifSysOpen(1603)) return false
        }
        let list = TaskUtil.getTaskList(type);
        let model = ModelManager.get(TaskModel);
        for (let i = 0, n = list.length; i < n; i++) {
            let cfg = list[i];
            let isOpen = true;
            if (type == 0) {
                //????????????????????????
                isOpen = TaskUtil.getDailyTaskIsOpen(cfg.id);
            } else if (type == 1) {
                isOpen = TaskUtil.getWeeklyTaskIsOpen(cfg.id);
            } else if (type == 2) {
                isOpen = TaskUtil.getMainLineTaskIsOpen(cfg.id)
                if (cfg['show_target'] && cfg['show_target'] == 1) {
                    isOpen = false
                }
            } else if (type == 3) {
                isOpen = TaskUtil.getAchieveTaskIsOpen(cfg.id)
            }
            if (isOpen) {
                // ???????????????
                let finish = TaskUtil.getTaskState(cfg.id);
                if (finish) {
                    // ???????????????
                    let geted = model.rewardIds[cfg.id] || 0;
                    if (geted == 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * ???????????? ??????????????????????????????
     * type 0 ?????? 1??????
     */
    has_unget_daily_reward(type) {
        let cfgs = []
        let boxOpened = ""
        let totalActive = 0
        if (type == 0) {
            cfgs = ConfigManager.getItemsByField(Mission_daily_activeCfg, "order", this.taskModel.dailyRoundId)
            // let maxValue = cfgs[cfgs.length - 1].value
            totalActive = TaskUtil.getDailyTotalActive()
            boxOpened = this.taskModel.daily.boxOpened.toString(2)
        } else if (type == 1) {
            cfgs = ConfigManager.getItems(Mission_weekly_activeCfg)
            // let maxValue = cfgs[cfgs.length - 1].value
            totalActive = TaskUtil.getWeeklyTotalActive()
            boxOpened = (this.taskModel.weekly ? this.taskModel.weekly.boxOpened : 0).toString(2)
        }
        while (boxOpened.length < 5) {
            boxOpened = "0" + boxOpened
        }
        let ids = boxOpened.split("").reverse()
        for (let i = 0; i < cfgs.length; i++) {
            if (ids[i] == "0" && totalActive >= cfgs[i].value) {
                return true
            }
        }
        return false
    }

    has_upget_guild_task() {
        let model = ModelManager.get(TaskModel)
        let cfgs = ConfigManager.getItems(Mission_guildCfg)
        for (let i = 0; i < cfgs.length; i++) {
            let finish = TaskUtil.getGuildTaskState(cfgs[i].id);
            if (finish) {
                // ???????????????
                let geted = model.guildRewardIds[cfgs[i].id] || 0;
                if (geted == 0) {
                    return true;
                }
            }
        }
        return false
    }

    /**
     * ??????Boss??????   1.?????????????????? 2.???????????? 3.??????????????????
     */
    has_guild_boss_reward_or_challenge() {
        if (this.roleModel.guildId <= 0 || !JumpUtils.ifSysOpen(2835)) {
            return false;
        }
        if (this.guildModel.gbOpenTime <= 0) {
            //?????????
            if (!GuildUtils.isCanOperate(this.roleModel.id, GuildAccess.OpenBoss)) {
                return false;
            }
            else {
                let limit = ConfigManager.getItemByField(GlobalCfg, 'key', 'guild_boss_cost').value[0];
                return this.guildModel.gbPoint >= limit;
            }
        }
        else {
            let limit = ConfigManager.getItemByField(GlobalCfg, 'key', 'guild_boss_times').value[0];
            if (this.guildModel.gbEnterTime < limit) {
                return true;
            }
            else {
                let info = this.guildModel.gbRewardFlag[0] || 0;
                let ration = [0.3, 0.6, 1];
                let curGuildBossCfg = ConfigManager.getItem(GuildbossCfg, (cfg: GuildbossCfg) => {
                    if (cfg.type == this.guildModel.gbBossType && cfg.level == this.guildModel.gbBossLv) {
                        return true;
                    }
                });
                for (let i = 0; i < ration.length; i++) {
                    if ((info & 1 << i) < 1) {
                        let totalDamage = this.guildModel.gbDamage;
                        if (totalDamage / curGuildBossCfg.boss_hp >= ration[i]) {
                            return true;
                        }
                    }
                }
                return false;
            }
        }
    }

    /**????????????????????????  ??????????????? ??? ????????? */
    has_guild_power_reward_or_challenge() {
        if (this.roleModel.guildId <= 0 || !JumpUtils.ifSysOpen(2916)) {
            return false;
        }
        let timeCfg = ConfigManager.getItemById(Guildpower_globalCfg, "monster_open").value
        let openTime = timeCfg[0] * 3600
        let closeTime = timeCfg[1] * 3600
        let curTime = Math.floor(GlobalUtil.getServerTime() / 1000)
        let zeroTime = TimerUtils.getZerohour(curTime)
        if ((curTime > zeroTime + openTime) && (curTime < zeroTime + closeTime)) {
            if (!this.guildModel.confirm) {
                return true
            }
        }
        if (this.guildModel.hasReward && !this.guildModel.getRewarded) {
            return true
        }
        return false

    }

    /**
     * ??????7????????????????????????????????????????????????
     */
    has_unget_seven_days_score_reward(): boolean {
        let curDay = Math.floor((GlobalUtil.getServerTime() - GlobalUtil.getServerOpenTime() * 1000) / (86400 * 1000)) + 1;
        curDay = Math.min(7, curDay);
        for (let i = 0; i < curDay; i++) {
            let cfgs = ConfigManager.getItemsByField(Store_7dayCfg, 'day', i + 1);
            for (let j = 0; j < cfgs.length; j++) {
                let storeInfo = this.storeModel.sevenStoreInfo[cfgs[j].id];
                let boughtTime = storeInfo | 0;
                if (boughtTime < cfgs[j].times_limit) {
                    if (!this.storeModel.firstInSevenStoreDays[i + 1]) {
                        if (!cfgs[j].VIP_commit || this.roleModel.vipLv >= cfgs[j].VIP_commit) {
                            return true;
                        }
                    }
                }
            }
        }

        let list: Mission_7activityCfg[] = TaskUtil.getTaskList(4);
        let model = ModelManager.get(TaskModel);
        for (let i = 0; i < list.length; i++) {
            // ???????????????
            let finish = TaskUtil.getTaskState(list[i].id);
            if (finish) {
                // ???????????????
                let geted = model.rewardIds[list[i].id] || 0;
                if (geted == 0 && curDay >= list[i].day) {
                    return true;
                }
            }
        }
        return false
    }

    /**
     * ????????????????????????????????????
     * @param day ??????
     * @param type ????????????
     */
    has_unget_seven_days_reward(day: number, type: number = -1) {
        let list: Mission_7activityCfg[] = [];
        let model = ModelManager.get(TaskModel);
        let curDay = Math.floor((GlobalUtil.getServerTime() - GlobalUtil.getServerOpenTime() * 1000) / (86400 * 1000)) + 1;

        list = ConfigManager.getItems(Mission_7activityCfg, (cfg: Mission_7activityCfg) => {
            if (cfg.day == day) {
                if (type != -1) {
                    if (type == cfg.type) {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
        });

        for (let i = 0; i < list.length; i++) {
            let finish = TaskUtil.getTaskState(list[i].id);
            if (finish) {
                // ???????????????
                let geted = model.rewardIds[list[i].id] || 0;
                if (geted == 0 && curDay >= list[i].day) {
                    return true;
                }
            }
        }
    }

    /**
     *?????????????????????????????????
     */
    has_advStore_free_items() {
        if (!JumpUtils.ifSysOpen(2848)) return;
        let rewardType = ActUtil.getCfgByActId(55).reward_type;
        let cfgs = ConfigManager.getItems(Operation_storeCfg, (cfg: Operation_storeCfg) => {
            if (cfg.reward_type == rewardType && cfg.page == 3) return true;
        });
        for (let i = 0; i < cfgs.length; i++) {
            if (cfgs[i].RMB_cost == 0) {
                let buyInfo: icmsg.StoreBuyInfo = this.activityModel.subStoreBuyInfos[cfgs[i].id]
                let count = 0
                if (buyInfo) {
                    count = buyInfo.count
                }
                if (cfgs[i].buy - count > 0) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * ????????????????????? ??? ???????????????
     */
    has_catcher_draw_times() {
        if (!JumpUtils.ifSysOpen(2850)) return false;
        // let stCfg = ConfigManager.getItemByField(GlobalCfg, 'key', 'summon_times').value;
        let drawCostCfg = ConfigManager.getItemByField(GlobalCfg, 'key', 'summon_consumption').value;
        let freeTCfg = ConfigManager.getItemByField(GlobalCfg, 'key', 'summon_free').value;
        let drawItemNum = BagUtils.getItemNumById(drawCostCfg[0]);
        // let diamond = BagUtils.getItemNumById(stCfg[1]);
        if (this.activityModel.advLuckyDrawFreeTimes < freeTCfg[0]) {
            return true;
        }
        else if (drawItemNum >= drawCostCfg[1] * 10) {
            // || (diamond >= stCfg[2] * 10 && (stCfg[0] - this.activityModel.advLuckyDrawDiamondTimes >= 10))
            return true;
        }
    }

    is_midAutumn_show_redpoint() {
        if (!JumpUtils.ifSysOpen(2957)) return false;
        let t = GlobalUtil.getLocal('firstInMidAutumn') || 0;
        if (!t || t !== TimerUtils.getZerohour(GlobalUtil.getServerTime() / 1000)) {
            return true;
        }
        return false;
    }

    /**
     * ???????????? ??????????????????
     */
    has_cServer_rank_reward() {
        if (!JumpUtils.ifSysOpen(2868)) return false;
        let res = false;
        if (!res) {
            let activityModel = ModelManager.get(ActivityModel)
            if (!activityModel.enterCServerRank) {
                res = true;
            }
        }
        return res;
    }

    /**
    * ???????????? ??????????????????
    */
    has_cServer_task_reward(typeS: number[] = [1, 2]) {
        if (!JumpUtils.ifSysOpen(2869)) return false;
        let res = false;
        let activityModel = ModelManager.get(ActivityModel)
        for (let i = 0; i < typeS.length; i++) {
            let type = typeS[i];
            if (type == 1) {
                let temStart = ActUtil.getActStartTime(66)
                let curTime = GlobalUtil.getServerTime();
                let temDay = Math.floor(((curTime - temStart) / 1000) / 86400) + 1
                let curDay = temDay > 3 ? 3 : temDay;
                let cfgs = CarnivalUtil.getDailyConfigsByDay(curDay);
                cfgs.forEach(cfg => {
                    let proTab = TaskUtil.getTaskFinishNum(cfg.id)
                    if (proTab[0] >= proTab[1]) {
                        //????????????????????????
                        if (!this.taskModel.rewardIds[cfg.id]) {
                            res = true;
                        }
                    }
                })
                if (res) {
                    return res;
                }
            } else {
                let cfgs = CarnivalUtil.getUltimateConfigs();
                let typeNum = cfgs[cfgs.length - 1].theme
                for (let i = 1; i <= typeNum; i++) {
                    let temCfgs = CarnivalUtil.getUltimateConfigsByTheme(i);
                    let selectCfg = null;
                    let selectData = null;
                    //let state: boolean = true;
                    for (let j = 0; j < temCfgs.length; j++) {
                        let cfg = temCfgs[j];
                        let num = cc.js.isString(cfg.args) ? 0 : cfg.args;
                        let data = this.taskModel.carnivalUltimateData[cfg.target] ? this.taskModel.carnivalUltimateData[cfg.target][num] : null;
                        if (!data) {
                            let tem = new icmsg.MissionProgress()
                            tem.type = cfg.target;
                            tem.arg = num;
                            tem.num = 0;
                            data = tem;
                        }
                        //???????????????????????????????????????????????????overData???
                        if (data.num >= cfg.number && this.taskModel.rewardIds[cfg.id]) {
                            continue;
                        }
                        selectCfg = cfg;
                        selectData = data;
                        break;
                    }
                    if (selectCfg) {
                        let proTab = TaskUtil.getTaskFinishNum(selectCfg.id)
                        if (proTab[0] >= proTab[1]) {
                            //????????????????????????
                            if (!this.taskModel.rewardIds[selectCfg.id]) {
                                res = true;
                            }
                        }
                    }
                    if (res) {
                        return res;
                    }
                }
            }
        }

        //????????????????????????
        if (typeS.length == 2) {
            let scoreCfgs = CarnivalUtil.getRewardsConfigs();
            let msg = activityModel.cServerPersonData
            scoreCfgs.forEach((cfg, index) => {
                let state = cfg.value <= msg.carnivalScore;
                let state1 = (this.taskModel.carnivalScoreRewards & 1 << index) >= 1;
                if (state && !state1) {
                    res = true
                }
            })
            if (!res) {
                if (!activityModel.enterCServerTask) {
                    res = true;
                }
            }
        }

        return res;
    }

    /**
     * ??????????????????????????????????????????
     */
    has_adv_pass_port_reward() {
        if (!JumpUtils.ifSysOpen(2847)) {
            return false;
        }
        let rewardType = ActUtil.getCfgByActId(53).reward_type;
        let cfgs = ConfigManager.getItemsByField(Adventure_passCfg, 'cycle', rewardType);
        for (let i = 0; i < cfgs.length; i++) {
            if (ModelManager.get(RoleModel).adventureExp >= cfgs[i].score[1]) {
                if (!AdventureUtils.getPassPortRewardState(cfgs[i].taskid, 1)) return true;
                if (ModelManager.get(AdventureModel).isBuyPassPort && !AdventureUtils.getPassPortRewardState(cfgs[i].taskid, 2)) return true;
            }
        }
    }

    /**
    * ?????????????????????????????????????????????
    */
    has_newAdv_pass_port_reward() {
        if (!JumpUtils.ifSysOpen(2915)) {
            return false;
        }
        let rewardType = ActUtil.getActRewardType(107);
        let cfgs = ConfigManager.getItemsByField(Adventure2_passCfg, 'cycle', rewardType);
        for (let i = 0; i < cfgs.length; i++) {
            if (ModelManager.get(RoleModel).adventureExp >= cfgs[i].score[1]) {
                if (!NewAdventureUtils.getPassPortRewardState(cfgs[i].taskid, 1)) return true;
                if (ModelManager.get(NewAdventureModel).isBuyPassPort && !NewAdventureUtils.getPassPortRewardState(cfgs[i].taskid, 2)) return true;
            }
        }
    }

    /**
     * ????????????????????????????????????
     */
    has_pass_port_reward() {
        if (!JumpUtils.ifSysOpen(2806)) {
            return false;
        }
        // let createDay = TaskUtil.getCrateRoleDays();
        let period = ConfigManager.getItemByField(GlobalCfg, 'key', 'pass_cycle').value[0];
        let serverTime = GlobalUtil.getServerTime();
        let startTime = ActUtil.getActStartTime(31);
        // let curPeriod = Math.floor(createDay / period) + 1;
        let curPeriod = Math.floor((serverTime - startTime) / (period * 24 * 60 * 60 * 1000)) + 1;
        let cfgs = ConfigManager.getItemsByField(PassCfg, 'cycle', curPeriod);
        for (let i = 0; i < cfgs.length; i++) {
            if (ModelManager.get(RoleModel).pass >= cfgs[i].score) {
                if (!StoreUtils.getPassPortRewardState(cfgs[i].taskid, 1)) return true;
                if (this.storeModel.isBuyPassPort && !StoreUtils.getPassPortRewardState(cfgs[i].taskid, 2)) return true;
            }
        }
    }

    /**??????????????????????????? */
    has_weekly_pass_reward() {
        if (!JumpUtils.ifSysOpen(2896)) {
            return false;
        }
        let sT = ActUtil.getActStartTime(87);
        let now = GlobalUtil.getServerTime();
        let curCycle = Math.floor((now - sT) / 604800000) + 1;
        let curDay = (Math.floor((now - sT) / 86400000) + 1) % 7 || 7;
        let c = ConfigManager.getItems(Pass_weeklyCfg);
        let cycle = Math.min(c[c.length - 1].cycle, curCycle);
        let cfgs = ConfigManager.getItemsByField(Pass_weeklyCfg, 'cycle', cycle);
        for (let i = 0; i < cfgs.length; i++) {
            if (cfgs[i].day <= curDay) {
                if (!StoreUtils.getWeeklyRewardState(cfgs[i].id, 1)) return true;
                if (this.storeModel.isBuyWeeklyPassPort && !StoreUtils.getWeeklyRewardState(cfgs[i].id, 2)) return true;
            }
        }
    }


    /**???????????????????????????????????? */
    has_relic_pass_port_reward() {
        if (!JumpUtils.ifSysOpen(2861)) {
            return false;
        }
        if (!ActUtil.ifActOpen(85)) {
            return false
        }
        let period = ConfigManager.getItemByField(GlobalCfg, 'key', 'pass_cycle').value[0];
        let serverTime = GlobalUtil.getServerTime();
        let startTime = ActUtil.getActStartTime(85);
        let curPeriod = Math.floor((serverTime - startTime) / (period * 24 * 60 * 60 * 1000)) + 1;
        let cfgs = ConfigManager.getItemsByField(Relic_passCfg, 'cycle', curPeriod);
        for (let i = 0; i < cfgs.length; i++) {
            if (ModelManager.get(RoleModel).relic >= cfgs[i].point[1]) {
                if (!RelicUtils.getPassPortRewardState(cfgs[i].taskid, 1)) return true;
                if (ModelManager.get(RelicModel).isBuyPassPort && !RelicUtils.getPassPortRewardState(cfgs[i].taskid, 2)) return true;
            }
        }
    }

    /**??????????????? ??????????????????????????? */
    has_relic_task_reward(type) {
        if (!JumpUtils.ifSysOpen(2861)) {
            return false;
        }
        if (!ActUtil.ifActOpen(85)) {
            return false
        }
        let cfgs = ConfigManager.getItemsByField(Relic_taskCfg, "type", type)
        for (let i = 0; i < cfgs.length; i++) {
            let finish = TaskUtil.getTaskState(cfgs[i].id)
            let geted = this.taskModel.rewardIds[cfgs[i].id] || 0
            if (finish && geted == 0) {
                return true
            }
        }
        return false
    }


    /**?????????????????? */
    has_growthFunds_reward() {
        if (!JumpUtils.ifSysOpen(2808)) {
            return false;
        }
        if (!ModelManager.get(StoreModel).isBuyGrowFunds) {
            if (this.roleModel.level <= ConfigManager.getItemByField(GlobalCfg, 'key', 'growth_fund_red_dot').value[0] && this.storeModel.isShowGrowFundsTips) return true;
            else return false;
        }
        let cfgs = ConfigManager.getItems(GrowthfundCfg);
        for (let i = 0; i < cfgs.length; i++) {
            if (ModelManager.get(RoleModel).level >= cfgs[i].level && !StoreUtils.getGrowthFundsRewardState(cfgs[i].id)) {
                return true;
            }
        }
        return false;
    }

    /**?????????????????? */
    has_towerFunds_reward() {
        if (!JumpUtils.ifSysOpen(2958)) {
            return false;
        }
        if (!ModelManager.get(StoreModel).isBuyTowerFunds) {
            if (this.roleModel.level <= ConfigManager.getItemByField(GlobalCfg, 'key', 'growth_fund_red_dot').value[0] && this.storeModel.isShowTowerFundsTips) return true;
            else return false;
        }
        let cfgs = ConfigManager.getItems(Growthfund_towerfundCfg);
        for (let i = 0; i < cfgs.length; i++) {
            if (ModelManager.get(TrialInfo).lastStageId >= cfgs[i].layer && !StoreUtils.getTowerFundsRewardState(cfgs[i].id)) {
                return true;
            }
        }
        return false;
    }

    /**
     * ?????????????????????????????????
     */
    has_one_dollar_gift_reward() {
        let cfgs = ConfigManager.getItems(Gift_powerCfg);
        if (!ModelManager.get(StoreModel).isBuyOneDollarGift) return false;
        for (let i = 0; i < cfgs.length; i++) {
            if (ModelManager.get(RoleModel).power >= cfgs[i].power) {
                if (!StoreUtils.getOneDollarGiftRewardState(cfgs[i].index)) return true;
            }
        }
        return false;
    }

    /**
     * ????????????????????????????????????
     * @returns 
     */
    has_sailing_pay_reward(): boolean {
        if (!JumpUtils.ifSysOpen(2944)) return false;
        let rewardType = ActUtil.getActRewardType(123);
        let cfgs = ConfigManager.getItems(Sailing_topupCfg, (cfg: Sailing_topupCfg) => {
            if (cfg.type == rewardType) return true;
        });
        let model = ModelManager.get(SailingModel)
        if (model.sailingInfo) {
            let monthlyRecharge = model.sailingInfo.money;
            for (let i = 0; i < cfgs.length; i++) {
                if (monthlyRecharge >= cfgs[i].money) {
                    if (!ActivityUtils.getSailingRewardState(i)) {//cfgs[i].index
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**?????????????????? */
    has_sailing_treasure_tab_redPoint() {
        return this.has_sailing_daily_reward() || this.has_sailing_can_treasure()
    }


    /**?????????????????????????????? */
    has_sailing_daily_reward() {
        if (!JumpUtils.ifSysOpen(2945)) return false;
        let model = ModelManager.get(SailingModel)
        return model.sailingInfo && !model.sailingInfo.freeRewarded
    }

    /**????????????????????????????????? */
    has_sailing_can_treasure() {
        if (!JumpUtils.ifSysOpen(2945)) return false;
        let model = ModelManager.get(SailingModel)
        let itemId = ConfigManager.getItemById(Sailing_globalCfg, "sailing_item").value[0]
        let hasNum = BagUtils.getItemNumById(itemId)
        let cfgs = ConfigManager.getItems(Sailing_mapCfg, { map_id: 1001, type: model.activityType })
        let ret = false
        for (let i = 0; i < cfgs.length; i++) {
            let isGet = model.sailingInfo && Boolean(Math.pow(2, cfgs[i].plate - 1) & model.sailingInfo.mapRewarded)
            if (hasNum >= cfgs[i].consumption && !isGet) {
                ret = true
                break
            }
        }
        return ret
    }


    /**???????????????????????? */
    has_hotel_daily_reward() {
        if (!JumpUtils.ifSysOpen(2947)) return false;
        return !this.activityModel.hotelDailyReward
    }


    /**??????????????????????????????????????????*/
    has_hotel_layer_reward() {
        if (!JumpUtils.ifSysOpen(2947)) return false;
        let actType = ActUtil.getActRewardType(125)
        let cfgs = ConfigManager.getItems(Hotel_mapCfg, { type: actType })
        let ret = true
        let count = 0
        for (let i = 0; i < cfgs.length; i++) {
            let layerInfo = this.activityModel.hotelLayers[cfgs[i].layer]
            if (layerInfo && layerInfo.num >= cfgs[i].number) {
                count++
            }
        }
        if (cfgs.length == count) {
            ret = false
        }
        return this.activityModel.hotelCleanNum > 0 && ret
    }

    /**
     * ?????????????????????????????????
     */
    has_unget_pay_first_reward(): boolean {
        if (!JumpUtils.ifSysOpen(1801)) return false;
        if (this.storeModel._canGetFirstPayReward()) {
            return true
        }
        return false
    }

    /**
     * ???????????????????????????????????? ???  ??????????????????
     */
    has_reward_or_unStartTask() {
        if (!JumpUtils.ifSysOpen(2803)) return false;
        let taskList = this.taskModel.tavernDoingTaskList.concat(this.taskModel.tavernTodoTaskList);
        if (taskList.length <= 0) return false;
        else {
            for (let i = 0; i < taskList.length; i++) {
                if (taskList[i].startTime <= 0 && !this.taskModel.tavernIsOpened) {
                    let cfg = ConfigManager.getItemById(TavernCfg, 1);
                    let costItem = BagUtils.getItemNumById(cfg.cost[0]) || 0;
                    if (costItem >= cfg.cost[1]) {
                        return true;   //?????????
                    }
                }
                else if (taskList[i].startTime > 0) {
                    let cfg = ConfigManager.getItemById(Tavern_taskCfg, taskList[i].taskId);
                    if (GlobalUtil.getServerTime() - taskList[i].startTime * 1000 >= cfg.time * 1000) {
                        return true; //???????????????
                    }
                }
            }
            return false;
        }
    }

    /**???????????? ???????????? */
    has_cross_treasure_free_times() {
        if (!JumpUtils.ifSysOpen(2886)) return false;
        if (!this.activityModel.cTreasureHasFreeTime) return false;
        if (this.activityModel.cTreasureHasFreeTime > 0) return true;
    }

    /**????????????????????? */
    is_restriction_can_buy() {
        if (!JumpUtils.ifSysOpen(2907)) return false;
        let cfgs = ConfigManager.getItems(Activity_rechargeCfg);
        for (let i = 0; i < cfgs.length; i++) {
            let cfg = cfgs[i];
            if (this.combineModel.restrictionRecharge >= cfg.money) {
                let info = this.combineModel.restrictionStoreInfo[cfg.money];
                if (!info || (info.left > 0 && !info.bought)) {
                    return true;
                }
            }
        }
    }

    /**
     * ???????????????????????????
     */
    has_friend_apply(): boolean {
        if (!JumpUtils.ifSysOpen(2300, false)) return false; // ??????????????????
        let model = ModelManager.get(FriendModel);
        return model.applyList.length > 0;
    }

    /**
     * ????????????????????????????????????
     */
    has_friend_gift(): boolean {
        if (!JumpUtils.ifSysOpen(2300, false)) return false; // ??????????????????
        let model = ModelManager.get(FriendModel);
        return model.friendInfos.some(info => {
            let had = (info.friendship & 4) > 0;    // ?????????????????????
            let get = (info.friendship & 2) > 0;    // ??????????????????
            return had && !get;
        });
    }

    /**??????????????????????????????????????????????????? */
    has_quick_fight_free_times() {
        return !this.copyModel.isOpenedQuickFightView && this.copyModel.quickFightFreeTimes > 0;
    }

    /**??????????????? */
    has_hero_reset() {
        let heroInfos = this.heroModel.heroInfos;
        let upList = this.heroModel.curUpHeroList(0);
        let resonatingModel = ModelManager.get(ResonatingModel)
        for (let i = 0; i < heroInfos.length; i++) {
            let info = <icmsg.HeroInfo>heroInfos[i].extInfo;
            if (info.level >= 2 || info.careerLv >= 2) {
                let heroCfg = ConfigManager.getItemById(HeroCfg, info.typeId);
                if (upList.indexOf(info.heroId) == -1
                    && !resonatingModel.getHeroInUpList(info.heroId)
                    && heroCfg.group[0] !== 6
                    && !info.mysticLink) {
                    return true;
                }
            }
        }
        return false;
    }

    /**????????????--????????????????????? */
    has_relic_energy_point() {
        if (!JumpUtils.ifSysOpen(2861)) return false;
        if (!this.relicModel.isFirstInView) return false;
        let cfgs = ConfigManager.getItems(Relic_mapCfg)
        for (let i = 0; i < cfgs.length; i++) {
            if (cfgs[i].lv <= this.roleModel.level) {
                break;
            }
            if (i == cfgs.length - 1) {
                return false;
            }
        }
        if (this.relicModel.exploreTimes < this.relicModel.totalExploreTime + this.relicModel.extraExploreTimes) return true;
    }

    /**????????????--????????????????????? */
    has_relic_reward() {
        if (!JumpUtils.ifSysOpen(2861)) return false;
        if (this.relicModel.RedPointEventIdMap[51002]) return true;
        else return false;
    }

    /**????????????--?????????????????? */
    is_relic_point_update() {
        if (!JumpUtils.ifSysOpen(2861)) return false;
        if (this.relicModel.RedPointEventIdMap[51003]) return true;
        return false;
    }

    /**????????? */
    is_can_send_red_envelope() {
        if (this.roleModel.level < 13) return false;
        // if (!this.roleModel.guildId) return false;
        let list = this.guildModel.myEnvelopeList;
        for (let i = 0; i < list.length; i++) {
            if (list[i].sendTime <= 0) {
                return true;
            }
        }
        return false;
    }

    /**????????? */
    is_can_grab_red_envelope() {
        return this.is_can_grab_guild_red_envelope() || this.is_can_grab_world_red_envelope();
    }

    /**?????????????????? */
    is_can_grab_guild_red_envelope() {
        if (this.roleModel.level < 13) return false;
        if (!this.roleModel.guildId) return false;
        let list = this.guildModel.grabEnvelopeList;
        for (let i = 0; i < list.length; i++) {
            if (!list[i].got && list[i].left >= 1) {
                return true;
            }
        }
        return false;
    }

    /***?????????????????? */
    is_can_grab_world_red_envelope() {
        if (this.roleModel.level < 13) return false;
        if (!this.roleModel.guildId) return false;
        if (this.guildModel.worldEnvMaxId > 0 && this.guildModel.worldEnvMaxGotId < this.guildModel.worldEnvMaxId) {
            return true;
        }
        return false;
    }

    /**?????????????????????????????? */
    is_each_login_check_cross_recharge() {
        if (!JumpUtils.ifSysOpen(2867)) return false;
        return this.activityModel.firstInCrossRecharge;
    }

    /**????????????????????????????????? */
    has_expedition_task_rewards() {
        if (!JumpUtils.ifSysOpen(2922)) return false;
        let task: Expedition_missionCfg[] = ExpeditionUtils.getCurArmyTaskList();
        for (let i = 0; i < task.length; i++) {
            if (ExpeditionUtils.getTaskState(task[i].id) && !ExpeditionUtils.getTaskAwardState(task[i].id)) {
                return true;
            }
        }
        return false;
    }

    /**??????????????????????????? */
    has_expedition_army_strengthen() {
        if (!JumpUtils.ifSysOpen(2922)) return false;
        for (let i = 0; i < 3; i++) {
            let careerType = i + 1;
            for (let j = 0; j < 6; j++) {
                let buffType = j + 1;
                if (this.has_expedition_army_strengthen_by_type(careerType, buffType)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * ???????????????????????????
     * @param careerType 1-??? 2-??? 3-???
     * @param buffType 1-6
     * @returns 
     */
    has_expedition_army_strengthen_by_type(careerType, buffType) {
        let lvs = this.expeditionModel.armyStrengthenStateMap[careerType] || [0, 0, 0, 0, 0, 0];
        let curLv = lvs[buffType - 1];
        let nextLvCfg = ConfigManager.getItem(Expedition_strengthenCfg, (cfg: Expedition_strengthenCfg) => {
            if (cfg.professional_type == careerType && cfg.type == buffType && cfg.level == curLv + 1) {
                return true;
            }
        });
        if (nextLvCfg) {
            let curArmyLv = this.expeditionModel.armyLv;
            if (nextLvCfg.limit <= curArmyLv) {
                for (let i = 0; i < nextLvCfg.consumption.length; i++) {
                    let item = nextLvCfg.consumption[i];
                    if (BagUtils.getItemNumById(item[0]) < item[1]) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }

    /**
     * GM????????????
     */
    has_gm_feedback() {

    }

    /**
     * ???????????????????????????
     */
    has_nb_general_weapon() {
        if (!JumpUtils.ifSysOpen(2814)) return false;
        let model = ModelManager.get(GeneralModel);
        let weaponList = model.weaponList;
        for (let i = 0; i < weaponList.length; i++) {
            if (weaponList[i] != model.curUseWeapon) {
                if (ConfigManager.getItemById(General_weaponCfg, weaponList[i]).sorting > ConfigManager.getItemById(General_weaponCfg, model.curUseWeapon).sorting) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * ??????????????????????????????
     */
    is_can_general_weapon_level_up(): boolean {
        // let model = ModelManager.get(GeneralModel);
        // let general = model.generalInfo;
        // // ????????????????????????????????????
        // if (general.weaponLv >= this.roleModel.level) {
        //     return false;
        // }
        // //?????????
        // let cfgs = ConfigManager.getItems(General_weapon_lvCfg);
        // if (general.weaponLv >= cfgs.length) {
        //     return false;
        // }
        // // ????????????????????????
        // let items = ConfigManager.getItemsByField(ItemCfg, "func_id", "add_gweapon_exp");
        // for (let index = 0; index < items.length; index++) {
        //     let item = items[index];
        //     if (BagUtils.getItemNumById(item.id) > 0) {
        //         return true;
        //     }
        // }
        return false;
    }

    /**
     * ??????????????????????????????
     */
    is_can_general_weapon_star_up(): boolean {
        // let model = ModelManager.get(GeneralModel);
        // let weapon = model.wpList[0];
        // if (weapon) {
        //     let cfg = ConfigManager.getItemByField(General_weapon_starCfg, "star", weapon.star, null);
        //     // ????????????????????????
        //     let cost = cfg.cost;
        //     if (cost && cost[0] && cost[1]) {
        //         return BagUtils.getItemNumById(cost[0]) >= cost[1];
        //     }
        // }
        // // ?????????
        // let cfgs = ConfigManager.getItems(General_weapon_starCfg);
        // if (weapon && weapon.star >= cfgs.length) {
        //     return false;
        // }
        return false;
    }

    /**????????????????????????????????? */
    has_assist_gift_rewards() {
        if (!JumpUtils.ifSysOpen(2903)) return false;
        let cfgs = ConfigManager.getItems(Store_star_giftCfg);
        if (this.resonatingModel.allianceMaxStar < cfgs[0].star_total) return false;
        for (let i = 0; i < cfgs.length; i++) {
            if (this.resonatingModel.allianceMaxStar >= cfgs[i].star_total) {
                let info = this.resonatingModel.giftRecords[cfgs[i].id] || null;
                if (!info || info.record < 1) {
                    return true;
                }
                else if (info && info.record == 1 && !this.resonatingModel.giftViewOpened) {
                    return true;
                }
            }
        }
        return false;
    }

    /**????????????????????? */
    has_assist_alliance__todo() {
        if (!JumpUtils.ifSysOpen(2900)) return false;
        let heroIds = this.heroModel.curUpHeroList(0);
        for (let i = 0; i < heroIds.length; i++) {
            if (this.single_hero_alliance_can_do(heroIds[i])) {
                return true;
            }
            else if (!this.resonatingModel.assistViewOpened) {
                let heroInfo = HeroUtils.getHeroInfoByHeroId(heroIds[i]);
                if (heroInfo && heroInfo.star >= 11) {
                    return true;
                }
            }
        }
        return false;
    }

    single_hero_alliance_can_do(heroId: number): boolean {
        let heroInfo = HeroUtils.getHeroInfoByHeroId(heroId);
        if (heroInfo && heroInfo.star >= 11) {
            let allianceMap: { [allianceId: number]: Hero_trammelCfg } = {};
            let cfgs = ConfigManager.getItemsByField(Hero_trammelCfg, 'hero_id', heroInfo.typeId);
            cfgs.forEach(c => {
                if (!allianceMap[c.trammel_id] || c.star_lv < allianceMap[c.trammel_id].star_lv) {
                    allianceMap[c.trammel_id] = c;
                }
            });
            for (let key in allianceMap) {
                let allianceCfg = allianceMap[key];
                let info = this.resonatingModel.assistAllianceInfos[allianceCfg.trammel_id];
                if (!info || info.heroIds.indexOf(0) !== -1) {
                    //?????????????????????
                    let b = ResonatingUtils.getAllianceValid(allianceCfg.trammel_id);
                    if (b) {
                        return true;
                    }
                }
                else if (info && info.heroIds.indexOf(0) == -1) {
                    //?????????
                    let totalStar = 0;
                    info.heroIds.forEach(l => { totalStar += HeroUtils.getHeroInfoByHeroId(l).star; });
                    let cs = ConfigManager.getItemsByField(Hero_trammelCfg, 'trammel_id', allianceCfg.trammel_id);
                    for (let i = cs.length - 1; i >= 0; i--) {
                        if (totalStar >= cs[i].star_lv && cs[i].star_lv > info.activeStar) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    /**??????????????? */
    is_legion_can_upgrade() {
        if (!JumpUtils.ifSysOpen(2901)) return false;
        let heroIds = this.heroModel.curUpHeroList(0);
        let isOpen = false;
        for (let i = 0; i < heroIds.length; i++) {
            let info = HeroUtils.getHeroInfoByHeroId(heroIds[i]);
            if (info && info.star >= 11) {
                isOpen = true;
                break;
            }
        }
        if (isOpen) {
            if (!this.resonatingModel.assistViewOpened) return true;
            let nextLvCfg = ConfigManager.getItemByField(Hero_legionCfg, 'legion_lv', this.resonatingModel.legionLv + 1);
            if (nextLvCfg && BagUtils.getItemNumById(nextLvCfg.legion_consumption[0]) >= nextLvCfg.legion_consumption[1]) {
                return true;
            }
        }
        return false;
    }

    /**
     * ???????????????????????????
     * @param heroInfo
     * @param index
     */
    is_can_mastery_level_up(heroInfo: icmsg.HeroInfo, index: number): boolean {
        // if (!JumpUtils.ifSysOpen(300, false)) return false; // ??????????????????
        // if (!heroInfo) return false;

        // let cfgs = ConfigManager.getItemsByField(MasteryCfg, "hero_id", heroInfo.typeId);
        // let cfg = cfgs ? cfgs[index] : null;
        // if (cfg) {
        //     // ??????????????????
        //     let mylv = HeroUtils.getHeroMasteryLv(heroInfo.heroId);
        //     let mastery = heroInfo.mastery;
        //     let level = mastery[index] || 0;

        //     //????????????????????????????????????????????????????????????????????????
        //     if (!this.is_hero_show_redPoint(heroInfo)) {
        //         if (level == 0) {
        //             let list = []
        //             if (cfg.lv) {
        //                 list.push({ state: heroInfo.level >= cfg.lv })
        //             }
        //             if (cfg.ownid) {

        //                 list.push({ state: !!HeroUtils.getHeroItemById(cfg.ownid) })
        //             }
        //             if (cfg.masterylv) {

        //                 list.push({ state: mylv >= cfg.masterylv })
        //             }
        //             if (cfg.masterylv2 && cfg.masterylv2.length > 0 && index > 0) {
        //                 let lv = mastery[index - 1] || 0
        //                 if (lv == 254 || lv == 255) {
        //                     lv = 0
        //                 }
        //                 let state = lv >= cfg.masterylv2[1]
        //                 list.push({ state: state })
        //             }

        //             let count = 0
        //             list.forEach(element => {
        //                 if (element.state) {
        //                     count += 1
        //                 }
        //             });

        //             if (list.length == count) {
        //                 return true
        //             }
        //         }
        //         return false
        //     }

        //     //254???????????????????????????255??????????????????
        //     if (level == 254 || level == 255) {
        //         // ??????????????????????????????
        //         let nextLvCfg = ConfigManager.getItemByField(Mastery_lvCfg, "masteryid", cfg.masteryid, { lv: 1 });
        //         if (nextLvCfg) {
        //             // ????????????????????????
        //             for (let i = 1; i <= 4; i++) {
        //                 let key = `item_${i}`;
        //                 let cKey = `count_${i}`;
        //                 let id = nextLvCfg[key];
        //                 let needNum = nextLvCfg[cKey];
        //                 if (id && needNum && BagUtils.getItemNumById(id) < needNum) {
        //                     return false
        //                 }
        //             }
        //         }
        //     }
        //     if (cfg.lv && heroInfo.level < cfg.lv) {
        //         // ????????????1
        //         return false;
        //     } else if (cfg.ownid && !HeroUtils.getHeroItemById(cfg.ownid) && level == 0) {
        //         // ????????????2
        //         return false;
        //     } else if (cfg.masterylv && mylv < cfg.masterylv) {
        //         // ????????????3
        //         return false;
        //     } else if (cfg.masterylv2 && index > 0) {
        //         let lv = mastery[index - 1] || 0
        //         if (lv == 254 || lv == 255) {
        //             lv = 0
        //         }
        //         if (lv < cfg.masterylv2[1]) {
        //             // ????????????4
        //             return false;
        //         }
        //     }

        //     // //??????????????????????????????????????????
        //     // if (level == 255) {
        //     //     return true
        //     // }

        //     // ???????????????
        //     let trueLv = level
        //     if (level == 254 || level == 255) {
        //         trueLv = 0
        //     }
        //     let nextLvCfg = ConfigManager.getItemByField(Mastery_lvCfg, "masteryid", cfg.masteryid, { lv: trueLv + 1 });
        //     if (nextLvCfg) {
        //         if (level != 0) {
        //             // ????????????????????????
        //             for (let i = 1; i <= 4; i++) {
        //                 let key = `item_${i}`;
        //                 let cKey = `count_${i}`;
        //                 let id = nextLvCfg[key];
        //                 let needNum = nextLvCfg[cKey];
        //                 if (id && needNum && BagUtils.getItemNumById(id) < needNum) {
        //                     return false;
        //                 }
        //             }

        //             if (nextLvCfg.count_5 > this.roleModel.gold) {
        //                 return false
        //             }
        //         }
        //         return true;
        //     }
        // }
        return false;
    }

    /**
     * ??????????????????????????????
     */
    is_can_get_mastery_fb(): boolean {
        return false;
    }

    /**
     * ??????????????????????????????????????????????????????
     */
    is_can_research_mastery_fb(): boolean {
        return false;
    }

    /**
     * ???????????? ??????2 , 3  ????????????????????? ???????????????
     * ??????copy_id ??????????????????????????????
     * ??????copy_id ,stage_id ???????????????????????????????????????????????????
     */
    is_inst_2_3_can_fight(copy_id, stage_id?): boolean {
        if (!JumpUtils.ifSysOpen(this.get_copy_open_lv(copy_id), false)) return false; // ??????????????????
        let data: InstanceData = GetInstanceDataByInstanceId(copy_id);
        // let num = data && data.serverData ? data.serverData.num : 0; //?????????????????????
        // if (num != 0 && num >= data.data.times) {
        //     return false;
        // }
        let curStageId = data && data.serverData ? data.serverData.stageId : -1;//???????????????????????????
        let stageCfg: Copy_stageCfg = ConfigManager.getItem(Copy_stageCfg, { id: stage_id });
        if (!stageCfg) {
            // if (this.instanceModel.instanceFailStage[copy_id + ''] && this.instanceModel.instanceFailStage[copy_id + ''] > curStageId) {
            //     return false;
            // }
            if (this.instanceModel.instanceEnterState[copy_id + '']) {
                return false;
            }

            if (curStageId > 0) {
                let temCfg: Copy_stageCfg = ConfigManager.getItem(Copy_stageCfg, { pre_condition: curStageId });
                if (temCfg) {
                    return true;
                }
            } else {
                return true;
            }
            return false;
        }
        if (curStageId > 0) {
            if (stageCfg.pre_condition == curStageId) {
                if (this.instanceModel.instanceFailStage[copy_id] && this.instanceModel.instanceFailStage[copy_id] == stage_id) {
                    return false;
                }
                return true;
            }
        } else {
            if (stageCfg.pre_condition == 0) {
                if (this.instanceModel.instanceFailStage[copy_id] && this.instanceModel.instanceFailStage[copy_id] == stage_id) {
                    return false;
                }
                return true;
            }
            // var myday = (new Date()).getDay(); // 0-6?????????????????????????????? 
            // let stages: [InstanceData] = ModelManager.get(InstanceModel).instanceInfos[copy_id];
            // let copySubtype: number = -1;
            // stages && stages.forEach(element => {
            //     let date: Array<number> = element.data.subtype_date[1];
            //     if (date.indexOf(myday) != -1) {
            //         copySubtype = element.data.subtype;
            //     }
            // });
            // let stageCfgs = ConfigManager.getItems(Copy_stageCfg, { copy_id: copy_id, subtype: copySubtype });
            // for (let i = 0; i < stageCfgs.length; i++) {
            //     if (stageCfgs[i].id > curStageId ) {
            //         return true;
            //     }
            // }
        }
        return false;
    }

    /**
     * ???????????? ??????6 ????????????  ???????????????
     * ??????copy_id ??????????????????????????????
     * ??????copy_id ,stage_id ???????????????????????????????????????????????????
     */
    is_inst_6_can_fight(copy_id, stage_id?): boolean {
        if (!JumpUtils.ifSysOpen(this.get_copy_open_lv(copy_id), false)) return false; // ??????????????????
        let cfg = ConfigManager.getItem(Copy_stageCfg, { copy_id: copy_id });
        // //????????????
        // let times = GetStageTimesState(cfg.subtype);
        // let useTimes = GetCopyUseTimes(cfg.subtype);
        // if ((times != 0 && useTimes >= times)) {
        //     return false;
        // }
        //??????????????????
        let copyCfg = ConfigManager.getItem(CopyCfg, { copy_id: copy_id });
        let num = BagUtils.getItemNumById(copyCfg.item_1[0]);
        if (num < copyCfg.item_1[1]) {
            return false;
        }
        let data: InstanceData = GetInstanceDataByInstanceId(copy_id);
        let curStageId = data && data.serverData ? data.serverData.stageId : -1;//???????????????????????????
        if (stage_id > 0) {
            let stageCfg: Copy_stageCfg = ConfigManager.getItem(Copy_stageCfg, { id: stage_id });
            if (curStageId > 0) {
                if (stage_id == curStageId + 1 && this.roleModel.level >= stageCfg.player_lv) {
                    return true;
                }
            } else {
                if (stageCfg.pre_condition == 0 && this.roleModel.level >= stageCfg.player_lv) {
                    return true;
                }
            }

        } else if (cfg) {
            let stageCfgs = ConfigManager.getItems(Copy_stageCfg, { copy_id: copy_id, subtype: cfg.subtype });
            for (let i = 0; i < stageCfgs.length; i++) {
                if (stageCfgs[i].id > curStageId && this.roleModel.level >= stageCfgs[i].player_lv) {
                    return true;
                }
            }
        }
        return false;
    }

    /**???????????????????????? */
    has_guardian_copy_raid_times() {
        if (!JumpUtils.ifSysOpen(718)) return false;
        if (!this.copyModel.guardianOpen) return false;
        if (!this.copyModel.guardianMaxStageId) return false;
        let gCfg = ConfigManager.getItemByField(GlobalCfg, 'key', 'guardian_free_sweep');
        let vipCfg = ConfigManager.getItemByField(VipCfg, 'level', ModelManager.get(RoleModel).vipLv);
        let maxRaidTimes = gCfg.value[0] + vipCfg.vip12 || 0;
        return this.copyModel.guardianRaidNum < maxRaidTimes;
    }

    /**???????????????????????????????????? */
    has_guardianCallReward_red() {
        if (!JumpUtils.ifSysOpen(2908)) return false;
        if (!this.guarianModel.callRewardInfo) return false;
        let type = ActUtil.getActRewardType(97);
        let res = false;
        if (type > 0) {
            let info = this.guarianModel.callRewardInfo;
            if (!info.limit || !info.limit.length) {
                return false;
            }
            let cfgs = ConfigManager.getItems(Activity_guardianCfg, (cfg: Activity_guardianCfg) => {
                if (cfg.type == type && info.playerNum >= cfg.players[0] && info.playerNum <= cfg.players[1]) {
                    return true;
                }
            });
            for (let i = 0, n = cfgs.length; i < n; i++) {
                if (!info.limit[i] || info.limit[i].limit <= 0) {
                    continue;
                }
                let cfg = cfgs[i];
                if (info.drawTimes >= cfg.number) {
                    if ((info.rewarded & 1 << cfg.reward_id - 1) < 1) {
                        res = true;
                        break;
                    }
                }
            }
        }
        return res
    }

    has_ultimate_copy_fight() {
        if (!JumpUtils.ifSysOpen(2949)) return false;
        let type = ActUtil.getActRewardType(130)
        let cfgs = ConfigManager.getItems(Copyultimate_stageCfg)
        let maxType = cfgs[cfgs.length - 1].reward_id
        if (type > maxType) {
            type = maxType
        }

        let typeCfgs = ConfigManager.getItemsByField(Copyultimate_stageCfg, "reward_id", type)
        let maxStageId = typeCfgs[typeCfgs.length - 1].id
        if (this.copyModel.ultimateMaxStageId >= maxStageId) {
            return false
        }

        if (this.copyModel.ultimateLeftNum > 0 || this.copyModel.ultimatIsClear) {
            return true
        }
        return false
    }

    get_copy_open_lv(copyId) {
        let lv = 701;
        switch (copyId) {
            case InstanceID.BRO_INST:
                lv = 702;
                break;
            case InstanceID.GOD_INST:
                lv = 715;
                break;
            case InstanceID.HERO_INST:
                lv = 701;
                break;
            case InstanceID.SPACE_INST:
                lv = 705;
                break;
            case InstanceID.GOLD_INST:
                lv = 704;
                break;
            case InstanceID.ELITE_INST:
                lv = 2700
                break;
            case InstanceID.CUP_ROOKIE_INST:
                lv = 2700
                break;
            case InstanceID.CUP_CHALLENGE_INST:
                lv = 2700
                break;
            case InstanceID.DOOMSDAY_INST:
                lv = 703;
                break
            case InstanceID.ETERNQL_INST:
                lv = 2833;
                break
            case InstanceID.HEROTRIAL_INST:
                lv = 2839;
                break
            case InstanceID.RUNE_INST:
                lv = 716;
                break
            case InstanceID.ENDRUIN_INST:
                lv = 2872;
                break
            case InstanceID.GUARDIAN_INST:
                lv = 718;
                break
        }
        return lv;
    }

    /**
     * ???????????????????????????
     *
     */
    is_inst_can_fight() {
        //let instList = [InstanceID.BRO_INST, InstanceID.GOD_INST, InstanceID.DOOMSDAY_INST, InstanceID.HERO_INST, InstanceID.SPACE_INST, InstanceID.GOLD_INST, InstanceID.CUP_ROOKIE_INST]
        let instList = ConfigManager.getItemByField(GlobalCfg, 'key', 'instance_list_copy_ids').value;
        let result = false;
        for (let i = 0; i < instList.length; i++) {
            if (instList[i] == InstanceID.BRO_INST) {
                result = this.is_survival_show_redPoint(instList[i])//this.is_inst_2_3_can_fight(instList[i]) || this.is_inst_hangup_reward(instList[i]);
                if (result) break;
            }
            if (instList[i] == InstanceID.GOLD_INST) {
                result = this.is_inst_6_can_fight(instList[i])
                if (result) break;
            }
            if (instList[i] == InstanceID.DOOMSDAY_INST) {
                result = this.is_doomsDay_show_redPoint(instList[i])
                if (result) break;
            }
            if (instList[i] == InstanceID.HERO_INST) {
                result = this.is_heroInst_show_redpoint(instList[i])
                if (result) break;
            }
            if (instList[i] == InstanceID.SPACE_INST) {
                result = this.is_spaceInst_show_redpoint(instList[i])
                if (result) break;
            }
            if (instList[i] == InstanceID.CUP_ROOKIE_INST) {
                result = this.is_eliteInst_show_redpoint(instList[i])
                if (result) break;
            }
            if (instList[i] == InstanceID.GOD_INST) {
                result = this.is_heroCopyInst_show_redpoint(instList[i])
                if (result) break;
            }
            if (instList[i] == InstanceID.RUNE_INST) {
                result = this.is_runeCopyInst_show_redpoint(instList[i])
                if (result) break;
            }
            if (instList[i] == InstanceID.ENDRUIN_INST) {
                result = this.is_EndRuinCopyInst_show_redpoint(instList[i])
                if (result) break;
            }
        }
        return result;
    }

    is_inst_hangup_reward(copy_id) {
        let rewardRed = false
        let data = null;
        this.instanceModel.instanceNetData.some(info => {
            if (info.dungeonId == copy_id) {
                data = info;
                return;
            }
        })
        if (data != null) {
            let time = 0;
            let cp: CopyCfg = ConfigManager.getItem(CopyCfg, { copy_id: copy_id });
            let search_limit = cp.search_limit;
            if (data.stageId == 0) {
                let hangTime = data.hangupTime;
                if (hangTime == 0) {
                    time = 0;
                } else {
                    let temTime = Math.floor(GlobalUtil.getServerTime() / 1000) - data.hangupTime
                    if (temTime > search_limit) {
                        temTime = search_limit;
                    }
                    time = temTime;
                }
            } else {
                if (data.hangupTime > 0) {
                    let temTime = Math.floor(GlobalUtil.getServerTime() / 1000) - data.hangupTime
                    if (temTime > search_limit) {
                        temTime = search_limit;
                    }
                    time = temTime;
                }
            }
            if (copy_id == CopyType.Survival) {
                if (time >= cp.search) {
                    rewardRed = true;
                }
            } else {
                if (time >= cp.search * 4) {
                    rewardRed = true;
                }
            }

        }
        return rewardRed;
        // let obj = this.instanceModel.instanceHangReward[copy_id];
        // return obj ? true : false;
    }

    /**
     * ??????????????????????????????
     */
    is_heroInst_show_redpoint(instanceID) {

        if (JumpUtils.ifSysOpen(this.get_copy_open_lv(instanceID), false)) {
            let n = "hero_inst"
            let l = GlobalUtil.getLocal(n)
            let serverTime = ModelManager.get(ServerModel).serverTime
            let nowDate = new Date(serverTime);//ModelManager.get(ServerModel).serverTime
            if (l) {
                let saveDate = new Date(parseInt(l));
                if (saveDate.getMonth() == nowDate.getMonth() && saveDate.getDate() == nowDate.getDate()) {

                    let model = ModelManager.get(InstanceModel)
                    let score = model.dunGeonBossJusticeState.score
                    //1.??????boss
                    if (model.dunGeonBossJusticeState.boss.id == 0) {
                        return true;
                    }
                    //2.??????????????????????????????????????????????????????
                    let heroCanUp = false;
                    if (model.dunGeonBossJusticeState.slots.length > 0) {
                        let temList = model.dunGeonBossJusticeState.slots;
                        let oldFight = 0;
                        let heroNum = 0;
                        for (let i = 0; i < temList.length; i++) {
                            //??????????????????
                            if (temList[i].heroId <= 0) {
                                heroCanUp = true;
                                break;
                            } else {
                                oldFight += temList[i].heroPower;
                                heroNum++;
                            }
                        }
                        if (heroCanUp) {
                            return true
                        }

                        //?????????????????????????????????
                        let a: BagItem[] = [];
                        ModelManager.get(HeroModel).heroInfos.forEach(element => {
                            a.push(element);
                        });
                        //?????????????????????
                        a.sort((a: BagItem, b: BagItem) => {
                            return (<icmsg.HeroInfo>b.extInfo).power - (<icmsg.HeroInfo>a.extInfo).power;
                        });
                        a.length = heroNum;
                        let newFight = 0;
                        a.forEach(heroInfo => {
                            newFight += (<icmsg.HeroInfo>heroInfo.extInfo).power;
                        })
                        if (newFight > oldFight) {
                            return true;
                        }
                    }
                    //3.?????????????????????
                    let bosscfg = ConfigManager.getItemByField(Justice_bossCfg, 'id', model.dunGeonBossJusticeState.boss.id);
                    let generalcfg = ConfigManager.getItemByField(Justice_generalCfg, 'lv', model.dunGeonBossJusticeState.general.level + 1)
                    if (generalcfg && bosscfg && model.dunGeonBossJusticeState.general.level < bosscfg.general_lv && score >= generalcfg.exp) {
                        return true;
                    }

                    //4.???????????????
                    if (model.dunGeonBossJusticeState.rewards.length > 0) {
                        return true;
                    }
                    //5.?????????????????????
                    let mercenaryList = model.dunGeonBossJusticeState.mercenaries;
                    if (mercenaryList.length > 0) {
                        for (let i = 0; i < mercenaryList.length; i++) {
                            if (mercenaryList[i] > 0) {
                                let cfg = ConfigManager.getItemByField(Justice_mercenaryCfg, 'type', i + 1, { 'lv': mercenaryList[i] + 1 });
                                if (cfg && score >= cfg.exp) {
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                } else {
                    //????????????????????????
                    return true;
                }
            } else {
                return true;
            }
        }
        return false
    }


    /**
     * ??????????????????
     */
    is_heroCopyInst_show_redpoint(instanceID) {
        if (JumpUtils.ifSysOpen(this.get_copy_open_lv(instanceID), false)) {
            let model = this.instanceModel
            var myday = GlobalUtil.getCurWeek()
            let copyCfgs = ConfigManager.getItemsByField(CopyCfg, 'copy_id', 3);
            let num = 0;
            let state = false;
            copyCfgs.forEach((cfg, i) => {
                let date: Array<number> = cfg.subtype_date[1];
                if (date.indexOf(myday) != -1 || myday == 0) {
                    num += model.heroCopySweepTimes[i]
                    if (!state) {
                        state = num > 0 && model.heroEnterCopy.indexOf(cfg.subtype) < 0;
                    }
                }
            })
            return state; //!model.heroEnterCopy;
        }
        return false;
    }

    /**
     * ???????????????????????????
     */
    is_championShip_reward_redpoint() {
        let res = false;
        let list = this.championModel.guessList;
        if (!list || list.length <= 0) { return false; }
        if (!this.championModel.infoData) return false;
        // let cfg: Champion_mainCfg = ConfigManager.getItemById(Champion_mainCfg, this.championModel.infoData.seasonId);
        // if (!cfg) { return false; }
        // let curTime = GlobalUtil.getServerTime();
        // let c = cfg.close_time.split('/');
        // let ct = new Date(c[0] + '/' + c[1] + '/' + c[2] + ' ' + c[3] + ':' + c[4] + ':' + c[5]).getTime();
        // if (curTime >= ct && curTime <= ct + 24 * 60 * 60 * 1000 * 2 && !this.championModel.infoData.rankRewarded) {
        //     res = true;
        // }
        let curTime = GlobalUtil.getServerTime();
        let roleModel = ModelManager.get(RoleModel);
        let cfgs = ConfigManager.getItems(ActivityCfg, (cfg: ActivityCfg) => {
            if (cfg.id == 122 && cfg.reward_type == this.championModel.infoData.seasonId && cfg.cross_id.length > 0 && cfg.cross_id.indexOf(roleModel.crossId) >= 0) {
                return true
            } else if (cfg.id == 122 && cfg.reward_type == this.championModel.infoData.seasonId && cfg.type == 4) {
                return true;
            }
        })
        //??????????????????
        let tempCfgs = [];
        cfgs.forEach(c => {
            if (Array.isArray(c.platform_id) && c.platform_id.indexOf(iclib.SdkTool.tool.config.platform_id) !== -1) {
                tempCfgs.push(c);
            }
        })
        if (tempCfgs.length <= 0) {
            cfgs.forEach(c => {
                if (!c.platform_id) {
                    tempCfgs.push(c);
                }
            })
        }
        cfgs = tempCfgs;
        if (cfgs.length > 0) {
            for (let i = 0, n = cfgs.length; i < n; i++) {
                let cfg = cfgs[i];
                let endTime;
                let openTime;
                if (cfg.type == 3) {
                    // endTime = new Date(`${cfg.close_time[0]}/${cfg.close_time[1]}/${cfg.close_time[2]} ${cfg.close_time[3]}:${cfg.close_time[4]}`).getTime();
                    endTime = TimerUtils.transformDate(cfg.close_time);
                } else if (cfg.type == 4) {
                    let time = roleModel.CrossOpenTime * 1000;
                    endTime = time + (cfg.close_time[2] * 24 * 60 * 60 + cfg.close_time[3] * 60 * 60 + cfg.close_time[4] * 60) * 1000;
                }
                if (curTime >= endTime && curTime <= endTime + 24 * 60 * 60 * 1000 * 2 && !this.championModel.infoData.rankRewarded) {
                    res = true;
                    break;
                }
            }

        }



        return res;
    }

    /**????????????????????????????????? */
    has_cave_rewards() {
        if (!JumpUtils.ifSysOpen(2911)) return false;
        let rewardType = ActUtil.getActRewardType(104);
        let c = ConfigManager.getItems(Cave_adventureCfg);
        rewardType = Math.min(rewardType, c[c.length - 1].type);
        for (let i = 0; i < this.activityModel.caveCurLayer; i++) {
            let cfgs = ConfigManager.getItems(Cave_adventureCfg, (cfg: Cave_adventureCfg) => {
                if (cfg.type == rewardType && cfg.layer == i + 1 && cfg.progress == 1) {
                    return true;
                }
            });
            let info = this.activityModel.caveLayerInfos[i];
            if (info && Object.keys(info.passMap).length == cfgs.length && !info.boxState) {
                return true;
            }
        }
    }

    /**????????????????????????????????? */
    has_cave_task_rewards() {
        if (!JumpUtils.ifSysOpen(2911)) return false;
        let rewardType = ActUtil.getActRewardType(104);
        let c = ConfigManager.getItems(Cave_taskCfg);
        rewardType = Math.min(rewardType, c[c.length - 1].type);
        let cfgs = ConfigManager.getItems(Cave_taskCfg, (cfg: Cave_taskCfg) => {
            if (cfg.type == rewardType && cfg.layer == this.activityModel.caveCurLayer) {
                return true;
            }
        });
        for (let i = 0; i < cfgs.length; i++) {
            if (TaskUtil.getTaskState(cfgs[i].taskid) && !TaskUtil.getTaskAwardState(cfgs[i].taskid)) {
                return true;
            }
        }
    }

    /**??????????????????????????? */
    has_cave_gift() {
        if (!JumpUtils.ifSysOpen(2911)) return false;
        if (this.activityModel.caveFirstInGiftView && ActivityUtils.getCaveGiftDatas().length > 0) {
            return true;
        }
    }

    /**???????????????????????? */
    is_cave_can_explore() {
        if (!JumpUtils.ifSysOpen(2911)) return false;
        if (this.activityModel.caveExplore <= 0) return false;
        let rewardType = ActUtil.getActRewardType(104);
        let c = ConfigManager.getItems(Cave_taskCfg);
        rewardType = Math.min(rewardType, c[c.length - 1].type);
        let cfgs = ConfigManager.getItems(Cave_adventureCfg, (cfg: Cave_adventureCfg) => {
            if (cfg.type == rewardType && cfg.layer == this.activityModel.caveCurLayer && cfg.progress == 1) {
                return true;
            }
        });
        let info = this.activityModel.caveLayerInfos[this.activityModel.caveCurLayer - 1];
        if (!info || cfgs.length > Object.keys(info.passMap).length) {
            return true;
        }
    }

    /**
     * ????????????????????????
     */
    is_guardianTower_rain_redpoint() {

        if (!JumpUtils.ifSysOpen(2898)) return false;
        if (this.guarianTowerModel.stateInfo) {
            let cfg = ConfigManager.getItemByField(GlobalCfg, 'key', "guardiantower_free_sweep").value
            let stateInfo = this.guarianTowerModel.stateInfo
            let allNum = cfg[0] + stateInfo.buyRaidNum;
            if (!this.guarianTowerModel.enterGuardianTower && allNum > stateInfo.raidNum) {
                return true;
            }
        }

        return false
    }
    /**
     * ????????????????????????
     */
    has_guess_bet_game() {
        if (!JumpUtils.ifSysOpen(2856)) return false;
        let list = this.championModel.guessList;
        if (!list || list.length <= 0) { return false; }
        if (!this.championModel.infoData) return false;
        // let cfg: Champion_mainCfg = ConfigManager.getItemById(Champion_mainCfg, this.championModel.infoData.seasonId);
        // if (!cfg) { return false; }
        // let curTime = GlobalUtil.getServerTime();
        // let o = cfg.open_time.split('/');
        // let c = cfg.close_time.split('/');
        // let ot = new Date(o[0] + '/' + o[1] + '/' + o[2] + ' ' + o[3] + ':' + o[4] + ':' + o[5]).getTime();
        // let ct = new Date(c[0] + '/' + c[1] + '/' + c[2] + ' ' + c[3] + ':' + c[4] + ':' + c[5]).getTime();
        // ot += 86400 * 1000;
        // if (curTime < ot || ct < curTime) {
        //     return false;
        // }
        if (!ActUtil.ifActOpen(122)) {
            return false;
        }
        for (let i = 0; i < list.length; i++) {
            let info = list[i];
            if (!info.playerId) {
                return true;
            }
        }
        return false;
    }

    /**
     * ??????????????????????????????
     */
    has_guess_check_fight_game() {
        if (!JumpUtils.ifSysOpen(2856)) return false;
        let list = this.championModel.guessList;
        if (!list || list.length <= 0) { return false; }
        if (!this.championModel.infoData) return false;
        // let cfg: Champion_mainCfg = ConfigManager.getItemById(Champion_mainCfg, this.championModel.infoData.seasonId);
        // if (!cfg) { return false; }
        // let curTime = GlobalUtil.getServerTime();
        // let o = cfg.open_time.split('/');
        // let c = cfg.close_time.split('/');
        // let ot = new Date(o[0] + '/' + o[1] + '/' + o[2] + ' ' + o[3] + ':' + o[4] + ':' + o[5]).getTime();
        // let ct = new Date(c[0] + '/' + c[1] + '/' + c[2] + ' ' + c[3] + ':' + c[4] + ':' + c[5]).getTime();
        // ot += 86400 * 1000;
        // if (curTime < ot || ct < curTime) {
        //     return false;
        // }
        if (!ActUtil.ifActOpen(122)) {
            return false;
        }
        for (let i = 0; i < list.length; i++) {
            let info = list[i];
            if (info.playerId && !info.rewardScore) {
                return true;
            }
        }
        return false;
    }

    /**
     * ???????????????????????????????????????
     */
    has_guess_exchange_item() {
        if (!this.championModel.infoData) return false;
        let cfg: Champion_mainCfg = ConfigManager.getItemById(Champion_mainCfg, this.championModel.infoData.seasonId);
        if (!cfg) { return false; }
        // let curTime = GlobalUtil.getServerTime();
        // let c = cfg.close_time.split('/');
        // let ct = new Date(c[0] + '/' + c[1] + '/' + c[2] + ' ' + c[3] + ':' + c[4] + ':' + c[5]).getTime();
        // if (ct - curTime <= 0) {
        //     return false;
        // }
        if (!ActUtil.ifActOpen(122)) {
            return false;
        }
        let localStr = GlobalUtil.getLocal('championET', true) || '';
        if (localStr.length > 0) {
            let time = parseInt(localStr.split('_')[0]);
            let state = localStr.split('_')[1];
            let curTime = GlobalUtil.getServerTime();
            if (state == 'true' && curTime < TimerUtils.getTomZerohour(time / 1000) * 1000) {
                return false;
            }
        }
        let datas: Champion_exchangeCfg[] = [];
        if (cfg) {
            datas = ConfigManager.getItemsByField(Champion_exchangeCfg, 'season', cfg.season);
            if (datas.length <= 0) {
                let cs = ConfigManager.getItems(Champion_exchangeCfg);
                datas = ConfigManager.getItemsByField(Champion_exchangeCfg, 'season', cs[cs.length - 1].season);
            }
        }
        let m = ModelManager.get(ChampionModel);
        for (let i = 0; i < datas.length; i++) {
            let boughtNum = m.exchangedInfo[datas[i].id] || 0;
            if (boughtNum < datas[i].limit_times) {
                let divisionCfg = ConfigManager.getItemById(Champion_divisionCfg, datas[i].limit_lv);
                let point = m.myPoints || 0;
                if (point >= divisionCfg.point) {
                    if (BagUtils.getItemNumById(datas[i].cost[0]) >= datas[i].cost[1]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * ?????????????????????
     */
    is_champion_def_lose() {
        if (!this.championModel.infoData) return false;
        // let cfg: Champion_mainCfg = ConfigManager.getItemById(Champion_mainCfg, this.championModel.infoData.seasonId);
        // if (!cfg) { return false; }
        // let curTime = GlobalUtil.getServerTime();
        // let c = cfg.close_time.split('/');
        // let ct = new Date(c[0] + '/' + c[1] + '/' + c[2] + ' ' + c[3] + ':' + c[4] + ':' + c[5]).getTime();
        // if (ct - curTime <= 0) {
        //     return false;
        // }
        if (!ActUtil.ifActOpen(122)) {
            return false;
        }
        return this.championModel.isDefLose;
    }

    /**
     * ??????????????????
     * @param instanceID 
     */
    is_runeCopyInst_show_redpoint(instanceID) {
        if (JumpUtils.ifSysOpen(this.get_copy_open_lv(instanceID), false)) {
            let model = this.instanceModel
            let cfg = ConfigManager.getItemByField(Copy_stageCfg, 'copy_id', CopyType.Rune);
            if (model.runeInfo && model.runeInfo.availableTimes > 0 && !model.runeEnterCopy) {
                return true;
            }
        }
        return false;
    }

    /**
     * ??????????????????
     * @param instanceID 
     */
    is_EndRuinCopyInst_show_redpoint(instanceID) {
        if (JumpUtils.ifSysOpen(this.get_copy_open_lv(instanceID), false)) {
            if (!this.copyModel.endRuinStateData) return false;
            //????????????
            if (this.copyModel.endRuinStateData.times > 0) return true;
            let temCfg = this.copyModel.endRuinCfgs[0];
            let firstNums = CopyUtil.getEndRuinStageState(temCfg.id);
            let firstState = firstNums[0] == 1 && firstNums[1] == 3
            this.copyModel.endRuinCfgs.forEach(cfg => {
                let temNums = CopyUtil.getEndRuinStageState(cfg.id);
                if (temNums[0] == 1 && temNums[1] == 3) {
                    temCfg = cfg;
                    firstState = true;
                }
            })
            let stateNum = firstState ? 1 : 3;
            if (firstState && this.copyModel.endRuinStateData.raidsStage == temCfg.id) {
                stateNum = 2;
            }
            if (stateNum == 1 && this.copyModel.endRuinStateData.raids > 0) return true;
            //????????????
            let cfgs = ConfigManager.getItems(Copy_ruin_rewardCfg);
            let res = false;
            let chapterIds = [];
            let starNums: number[] = []
            for (let i = 0; i < cfgs.length; i++) {
                let cfg = cfgs[i]
                if (chapterIds.indexOf(cfg.chapter) < 0) {
                    chapterIds.push(cfg.chapter);
                    starNums = CopyUtil.getEndRuinChapterAllStarNum(cfg.chapter);
                }
                if (cfg.star <= starNums[0]) {
                    if (!CopyUtil.getEndRuinChapterStarRewardState(cfg.chapter, cfg.star)) {
                        return true;
                    }

                }
            }

        }
        return false;
    }
    /**????????????????????? */
    is_ArenaTeam_show_redpoint(enterShow: boolean = true) {

        if (!ActUtil.ifActOpen(75)) {
            return false;
        }
        let res = false;
        let temModel = ModelManager.get(ArenaTeamViewModel);

        //???????????????
        if (temModel.actId == 0) {
            return false;
        }

        let isInAct = false;
        if (ActUtil.ifActOpen(76)) {
            isInAct = true;
            //???????????? ????????????
            if (temModel.arenaTeamInfo && temModel.isTeamLeader && temModel.arenaTeamInfo.players.length < 3) {
                return true;
            }
            //???????????????

        }
        if (ActUtil.ifActOpen(77)) {
            isInAct = true;
            if (temModel.arenaTeamInfo.remainChance > 0 && temModel.arenaTeamInfo.players.length > 0 && temModel.isTeamLeader) {
                return true;
            }

            //????????????????????????
            if (temModel.arenaTeamInfo && temModel.isTeamLeader) {
                let cfgs = ConfigManager.getItems(Teamarena_prizeCfg, (cfg: Teamarena_prizeCfg) => {
                    if (cfg.times <= temModel.arenaTeamInfo.fightTimes) {
                        return true;
                    }
                    return false;
                })
                for (let i = 0; i < cfgs.length; i++) {
                    let cfg = cfgs[i];
                    let old = temModel.fightRewarded;
                    if (!((old & 1 << cfg.times) >= 1)) {
                        return true;
                    }
                }
            }
        }

        if (!isInAct) {
            let temshow = true;
            if (temModel.arenaTeamInfo) {
                let players = temModel.arenaTeamInfo.players
                if (players.length = 0) {
                    temshow = false;
                } else {
                    let roleModel = ModelManager.get(RoleModel)
                    players.forEach(player => {
                        if (player.brief.id == roleModel.id) {
                            if (player.score <= 0) {
                                temshow = false;
                            }
                        }
                    })
                }
            } else {
                temshow = false;
            }
            if (!temModel.rankRewarded && temshow) {
                return true;
            }
        }

        // if (ActUtil.ifActOpen(78)) {
        //     isInAct = true;
        //     if (!temModel.rankRewarded && temModel.arenaTeamInfo && temModel.arenaTeamInfo.players.length > 0) {
        //         return true;
        //     }
        // }

        //????????????
        if (enterShow && !temModel.enterView && isInAct) {
            return true;
        }

        return res;
    }

    /**????????????????????? */
    is_vault_show_redPoint() {
        if (!JumpUtils.ifSysOpen(2884)) return false;
        let model = ModelManager.get(VaultModel)
        if (!model.enterView) {
            return true
        }
        if (this.relicModel.RedPointEventIdMap[53001]) {
            return true
        }
        return false
    }

    /**
     * ??????????????????
     * @param instanceID 
     */
    is_HeroTrialCopy_show_redPoint(instanceID?: number) {
        let have = false;
        let activityId = 44
        if (!ActUtil.ifActOpen(activityId)) {
            return false;
        }
        let model = this.instanceModel
        if (!model.heroTrialInfo) return false;
        let tem = model.heroTrialInfo.stageDamages;
        let value = tem[tem.length - 1]
        let haveReward = false;
        model.heroTrialInfo.rewardTimes.forEach(data => {
            if (value >= data.damage && data.times > 0 && model.heroTrialInfo.rewardRecord.indexOf(data.damage) < 0) {
                haveReward = true;
            }
        })
        if (haveReward) {
            return true;
        }
        if (!this.instanceModel.ClickHeroTrialEndless) {
            return true
        }
        return have;
    }
    /**
     * ?????????????????????
     * @param instanceID 
     */
    is_NewHeroTrialCopy_show_redPoint(instanceID?: number) {
        let have = false;
        if (!ActUtil.ifActOpen(70)) {
            return false;
        }
        if (!this.instanceModel.ClickNewHeroTrialEndless) {
            have = true
        }
        return have;
    }

    /**
     * ?????????????????????
     * @param instanceID 
     */
    is_ArenaHonor_show_redPoint() {
        let have = false;
        if (!JumpUtils.ifSysOpen(2919, false)) {

            return have;
        }
        let model = ModelManager.get(ArenaHonorModel)
        let rmodel = ModelManager.get(RoleModel)
        let time = rmodel.CrossOpenTime * 1000;
        //let nowTime = GlobalUtil.getServerTime();
        let temTime = ActUtil.getActStartTime(110);
        if (temTime - time < (7 * 24 * 60 * 60 - 1) * 1000) {
            return false
        }

        let curProId = ArenaHonorUtils.getCurProgressId();
        if (curProId == 1 && !model.enterGuildView) {
            return true;
        }

        //??????
        if (curProId && curProId >= 2 && model.list.length > 0) {
            let guessList: icmsg.ArenaHonorMatch[] = [];
            let cfg = ConfigManager.getItemById(Arenahonor_progressCfg, curProId);
            model.list.forEach(data => {
                if (cfg.match.indexOf(data.match) >= 0 && cfg.group.indexOf(data.group) >= 0) {
                    if (data.players.length > 1 && data.players[0].id > 0 && data.players[1].id > 0) {
                        guessList.push(data);
                    }
                }
            })
            guessList.forEach(data => {
                if (data.guess == 0 || data.guessWinner == 0) {
                    have = true;
                }
            })
            let old = model.draw[Math.floor((curProId - 1) / 8)] | 0;
            if (guessList.length > 0 && (old & 1 << (curProId - 1) % 8) <= 0) {
                return true
            }
        }

        //??????????????????
        if (curProId == 1 && !model.openDefenferView && model.list.length > 0 && model.playersInfoMap[rmodel.id]) {
            return true;
        }

        return have;
    }

    /**
     * ?????????????????????
     * @param instanceID 
     */
    is_WorldHonor_show_redPoint() {
        let have = false;
        let model = ModelManager.get(WorldHonorModel)
        let rmodel = ModelManager.get(RoleModel)
        if (!JumpUtils.ifSysOpen(2921, false)) {
            if (model.list.length > 0) {
                let temCfg = ConfigManager.getItems(Arenahonor_worshipCfg)[0]
                let maxNum = temCfg.worship_times;
                if (maxNum > model.giveFlower) {
                    return true;
                }
            }
            return have;
        }

        let time = rmodel.CrossOpenTime * 1000;
        //let nowTime = GlobalUtil.getServerTime();
        let temTime = ActUtil.getActStartTime(112);
        if (temTime - time < (7 * 24 * 60 * 60 - 1) * 1000) {
            return false
        }

        let curProId = WorldHonorUtils.getCurProgressId();
        if (curProId == 1 && !model.enterGuildView) {
            return true;
        }

        //??????
        if (curProId && curProId >= 2 && model.list.length > 0) {
            let guessList: icmsg.ArenaHonorMatch[] = [];
            let cfg = ConfigManager.getItemById(Arenahonor_worldwideCfg, curProId);
            model.list.forEach(data => {
                if (cfg.match.indexOf(data.match) >= 0 && cfg.group.indexOf(data.group) >= 0) {
                    if (data.players.length > 1 && data.players[0].id > 0 && data.players[1].id > 0) {
                        guessList.push(data);
                    }
                }
            })
            guessList.forEach(data => {
                if (data.guess == 0 || data.guessWinner == 0) {
                    have = true;
                }
            })

            let old = model.draw[Math.floor((curProId - 1) / 8)] | 0;
            if (guessList.length > 0 && (old & 1 << (curProId - 1) % 8) <= 0) {
                return true
            }
        }

        //??????????????????
        if (curProId == 1 && !model.openDefenferView && model.list.length > 0 && model.playersInfoMap[rmodel.id]) {
            return true;
        }

        //????????????
        if (!curProId) {
            let temCfg = ConfigManager.getItems(Arenahonor_worshipCfg)[0]
            let maxNum = temCfg.worship_times;
            if (maxNum > model.giveFlower) {
                return true;
            }
        }

        return have;
    }

    /**
     * ?????????????????????????????????
     */
    is_spaceInst_show_redpoint(instanceID) {
        if (JumpUtils.ifSysOpen(this.get_copy_open_lv(instanceID), false)) {
            // let n = "space_inst"
            // let l = GlobalUtil.getLocal(n)
            // let nowDate = new Date(ModelManager.get(ServerModel).serverTime);//ModelManager.get(ServerModel).serverTime
            // if (l) {
            //     let saveDate = new Date(parseInt(l));
            //     if (saveDate.getMonth() == nowDate.getMonth() && saveDate.getDate() == nowDate.getDate()) {
            //         if (!this.instanceModel.instanceEnterState[instanceID + '']) {
            //             return true;
            //         }
            //     } else {
            //         return true;
            //     }
            // } else {
            //     return true;
            // }
            //??????????????????????????????
            let model = ModelManager.get(TrialInfo)
            let items = ConfigManager.getItemsByField(Copy_stageCfg, "copy_id", CopyType.Trial)
            for (let i = 0; i < items.length; i++) {
                if (items[i].drop_2 && items[i].drop_2.length > 0) {
                    let type = 1;//type 1????????? 2????????? 3?????????
                    if (items[i].id <= model.lastStageId) {
                        type = 2;
                        if (model.getStageRewardState(items[i].id)) {
                            type = 3;
                        }
                    }
                    if (type == 2) {
                        return true;
                    }
                }
            }

            let cfg = ConfigManager.getItemById(GlobalCfg, "tower_sweep_consumption").value
            let allNum = cfg[0] + model.buyNum;
            if (allNum - model.raidsNum > 0 && !model.enterCopy) {
                return true;
            }
        }
        return false
    }

    /**???????????? ???????????? */
    is_eliteInst_show_redpoint(instanceID) {
        if (JumpUtils.ifSysOpen(this.get_copy_open_lv(instanceID), false)) {

            let prizeList = []
            let cfgs = this.copyModel.eliteNoviceCfgs;

            for (let i = 0; i < cfgs.length; i++) {
                if (prizeList.indexOf(cfgs[i].prize) == -1) {
                    prizeList.push(cfgs[i].prize)
                }
            }
            for (let i = 0; i < prizeList.length; i++) {
                if (CopyUtil.isOpenEliteStageChapter(prizeList[i], 0)) {
                    let nums = CopyUtil.getEliteStageCurChaterData(prizeList[i], 0)
                    let cfgs = ConfigManager.getItems(Copycup_prizeCfg, { 'copy_id': 12, 'chapter': prizeList[i] })
                    let bit: number[] = this.copyModel.eliteNoviceBits
                    for (let j = 0; j < cfgs.length; j++) {
                        let cfg = cfgs[j];
                        let lock = (j + 1) * 3 > nums[0];
                        let over = false;
                        let old = bit[Math.floor((cfg.id - 1) / 8)];
                        if ((old & 1 << (cfg.id - 1) % 8) >= 1) over = true;
                        if (!lock && !over) {
                            return true;
                        }
                    }
                }
            }
            return false;

        }
        return false
    }

    /**????????????????????? */
    is_super_value_show_redpoint() {
        let curDay = Math.floor((GlobalUtil.getServerTime() - ActUtil.getActStartTime(140)) / (24 * 60 * 60 * 1000)) + 1;
        let _checkActVaild = (day: number) => {
            let cfgs = ConfigManager.getItems(Activity_super_valueCfg, (cfg: Activity_super_valueCfg) => {
                if (cfg.reward_type == day) return true;
            });

            for (let i = 0; i < cfgs.length; i++) {
                let actId = ConfigManager.getItemById(SystemCfg, cfgs[i].system_id).activity;
                if (actId == 137) {
                    //????????????
                    // let storeM = ModelManager.get(StoreModel);
                    // if (storeM.firstPayTime) {
                    //     let time = TimerUtils.getTomZerohour(storeM.firstPayTime / 1000);
                    //     if (GlobalUtil.getServerTime() < time * 1000 && !ActUtil.ifActOpen(actId)) {
                    //         return false;
                    //     }
                    // } else if (!ActUtil.ifActOpen(actId)) {
                    //     return false;
                    // }
                } else if (cc.js.isNumber(actId) && actId > 0 && !ActUtil.ifActOpen(actId)) {
                    return false;
                }
            }
            return true;
        }
        for (let i = 0; i < curDay; i++) {
            let info = this.activityModel.superValueInfo[i + 1];
            if (_checkActVaild(i + 1)) {
                if (!info || !info.isGain) {
                    return true;
                }
            }
        }
        return false;
    }

    /**?????????????????????????????? */
    checkEliteInstRedPointTip() {
        let prizeList = []
        let copyModel = ModelManager.get(CopyModel)
        let cfgs = copyModel.eliteStageCfgs
        for (let i = 0; i < cfgs.length; i++) {
            if (prizeList.indexOf(cfgs[i].prize) == -1) {
                prizeList.push(cfgs[i].prize)
            }
        }
        for (let i = 0; i < prizeList.length; i++) {
            if (CopyUtil.isOpenEliteStageChapter(prizeList[i]) && CopyUtil.isGetElitePassReward(prizeList[i])) {
                if (copyModel.isEliteOpenFirst) {
                    RedPointUtils.save_state("elite_inst_red_point", true)
                    copyModel.isEliteOpenFirst = false
                }
                break
            }
        }
    }

    is_survival_show_redPoint(instanceID: number) {
        if (JumpUtils.ifSysOpen(this.get_copy_open_lv(instanceID), false)) {
            let stateMsg = this.copyModel.survivalStateMsg;
            return stateMsg && (stateMsg.stageId > 0 || stateMsg.merRewards.length > 0);
        }
        return false;
    }

    is_eternal_show_redPoint() {
        let copyCfg: CopyCfg
        let cfgs = ConfigManager.getItems(CopyCfg, (item: CopyCfg) => {
            if (item.copy_id == 15) {
                return true;
            }
            return false;
        })

        if (cfgs.length > 0) {
            cfgs.forEach(cfg => {
                if (ActUtil.ifActOpen(cfg.activityid)) {
                    copyCfg = cfg;
                }
            });
        }
        if (copyCfg) {
            let stages = ConfigManager.getItems(Eternal_stageCfg, (item: Eternal_stageCfg) => {
                if (item.subtype == copyCfg.subtype) {
                    return true
                }
                return false;
            })
            if (stages.length != this.copyModel.eternalCopyStageIds.length && !this.copyModel.enterEternalCopy) {
                return true;
            }
        }
        return false;
    }

    //
    is_peak_show_redPoint() {
        if (ActUtil.ifActOpen(84)) {
            let peakModel = ModelManager.get(PeakModel);

            if (peakModel.peakStateInfo) {
                //???????????????
                let temStateInfo = peakModel.peakStateInfo
                let num = peakModel.freeNum + temStateInfo.buyEnterTimes - temStateInfo.enterTimes;
                if (num > 0) {
                    return true;
                }
                //???????????????
                let cfgs = ConfigManager.getItems(Peak_challengeCfg, (item: Peak_challengeCfg) => {
                    if (item.reward_type == 1 && item.times <= temStateInfo.totalEnterTimes) {
                        return true
                    }
                    return false;
                })
                let reward = temStateInfo.challenge;
                for (let i = 0; i < cfgs.length; i++) {
                    let cfg = cfgs[i];
                    let id = cfg.times
                    let old = reward[Math.floor((id - 1) / 8)];
                    if (!((old & 1 << (id - 1) % 8) >= 1)) {
                        return true;
                    }
                }
                //???????????????
                if (temStateInfo.maxRank >= 2) {

                    let divisionCfgs = ConfigManager.getItems(Peak_gradeCfg, (item: Peak_gradeCfg) => {
                        if (item.reward_type == 1 && item.grade <= temStateInfo.maxRank) {
                            return true
                        }
                        return false;
                    })

                    for (let i = 0; i < divisionCfgs.length; i++) {
                        let cfg = divisionCfgs[i]
                        if (cfg.rewards == '') continue;
                        let state = 0;
                        let old = temStateInfo.gradeReward[Math.floor((cfg.grade - 1) / 8)];
                        if ((old & 1 << (cfg.grade - 1) % 8) >= 1) {
                            //??????????????????????????????
                            if (cfg.hero == '') {
                                state = 1
                            } else {
                                let old = temStateInfo.gradeHero[Math.floor((cfg.grade - 1) / 8)];
                                if ((old & 1 << (cfg.grade - 1) % 8) >= 1) {
                                    state = 1
                                }
                            }
                        }
                        if (state == 0) {
                            return true;
                        }
                    }
                }

            }
        }
        return false;
    }


    //????????????-????????????
    is_BYarmy_skin_redPoint() {

        //1 ???????????????
        let allLv = 0;
        this.byModel.byLevelsData.forEach((lv, index) => {
            let cfg = ConfigManager.getItemByField(BarracksCfg, 'type', index + 1, { 'barracks_lv': lv })
            if (cfg) {
                allLv += cfg.rounds;
            }
        })
        let openLv = ConfigManager.getItemByField(GlobalCfg, 'key', 'army_open').value[0]
        if (allLv < openLv) {
            return false;
        }
        if (!this.byModel.byarmyState) {
            return false
        }
        //?????????????????????
        let cfgs = ConfigManager.getItems(Soldier_army_skinCfg);
        let haveSkin = false;
        let skins = this.byModel.byarmyState.skins
        cfgs.some(cfg => {
            let num = BagUtils.getItemNumById(cfg.consumption[0])
            if (skins.indexOf(cfg.skin_id) < 0 && num > 0) {
                haveSkin = true;
                return true;
            }
        })
        if (haveSkin) {
            return true;
        }
        //???????????????????????????????????????????????????????????????
        let heroIds = this.heroModel.PveUpHeroList.concat();

        for (let i = 0, n = skins.length; i < n; i++) {
            let cfg = ConfigManager.getItemByField(Soldier_army_skinCfg, 'skin_id', skins[i]);
            let curType = cfg.type
            heroIds.forEach(heroId => {
                let heroInfo = HeroUtils.getHeroInfoByHeroId(heroId);
                if (heroInfo) {
                    let temType = Math.floor(heroInfo.soldierId / 100)
                    if (temType == curType && heroInfo.soldierSkin <= 0) {
                        haveSkin = true;
                    }
                }
            })
            if (haveSkin) {
                return true;
            }
        }
        return false;
    }
    //????????????-????????????
    is_BYarmy_trammel_redPoint() {

        //1 ???????????????
        let allLv = 0;
        this.byModel.byLevelsData.forEach((lv, index) => {
            let cfg = ConfigManager.getItemByField(BarracksCfg, 'type', index + 1, { 'barracks_lv': lv })
            if (cfg) {
                allLv += cfg.rounds;
            }
        })
        let openLv = ConfigManager.getItemByField(GlobalCfg, 'key', 'army_open').value[0]
        if (allLv < openLv) {
            return false;
        }
        if (!this.byModel.byarmyState) {
            return false
        }

        let cfgs = ConfigManager.getItems(Soldier_army_trammelCfg);
        let haveTrammel = false;
        cfgs.some(cfg => {
            //let num = BagUtils.getItemNumById(cfg.consumption[0])
            if (this.byModel.byarmyState.trammels.indexOf(cfg.trammel_id) < 0) {
                let have = true;
                cfg.skin_id.forEach(skinId => {
                    if (this.byModel.byarmyState.skins.indexOf(skinId) < 0) {
                        have = false;
                    }
                })
                if (have) {
                    haveTrammel = true;
                    return true;
                }
            }
        })
        if (haveTrammel) {
            return true;
        }
        return false;
    }
    //????????????-????????????
    is_BYarmy_skin_resolve_redPoint() {
        let allLv = 0;
        this.byModel.byLevelsData.forEach((lv, index) => {
            let cfg = ConfigManager.getItemByField(BarracksCfg, 'type', index + 1, { 'barracks_lv': lv })
            if (cfg) {
                allLv += cfg.rounds;
            }
        })
        let openLv = ConfigManager.getItemByField(GlobalCfg, 'key', 'army_open').value[0]
        if (allLv < openLv) {
            return false;
        }
        if (!this.byModel.byarmyState) {
            return false
        }
        let cfg = ConfigManager.getItemByField(Soldier_skin_resolveCfg, 'resolve_lv', this.byModel.byarmyState.level + 1);
        if (cfg) {
            let limitNum = cfg.skin_consumption;
            let curNum = 0;
            let temSkins = this.byModel.byarmyState.skins;
            let cfgs = this.byModel.skinCfgs//ConfigManager.getItems(Soldier_army_skinCfg)
            cfgs.forEach(cfg => {
                let itemId = cfg.consumption[0];
                let itemData = BagUtils.getItemById(itemId);
                if (itemData) {
                    if (temSkins.indexOf(cfg.skin_id) >= 0) {
                        if (itemData.itemNum > 0) {
                            curNum += itemData.itemNum;
                        }
                    } else if (itemData.itemNum > cfg.consumption[1]) {
                        curNum += (itemData.itemNum - cfg.consumption[1]);
                    }
                }

            })
            return curNum >= limitNum;
        }

        return false;
    }

    /**?????? ???????????? 1-????????? 2-????????? 3-?????????????????? */
    has_soldier_redpoint() {
        if (!JumpUtils.ifSysOpen(2930)) return false;
        //?????????
        let types = [1, 3, 4];
        for (let i = 0; i < types.length; i++) {
            if (this.is_can_soldier_tech_upgrade(types[i])) return true;
        }
        //????????????????????????
        if (!this.byModel.firstInTechView) return false;
        //???????????????
        if (this.has_soldier_tech_research_place()) return true;
        //??????????????????
        if (this.has_soldier_tech_research_rewards()) return true;

        return false;
    }

    /**?????? ??????????????? */
    has_soldier_tech_research_place() {
        let info = this.byModel.techResearchMap;
        for (let key in info) {
            if (info[key].type !== 2 && info[key].heroId <= 0) {
                return true;
            }
        }
        return false;
    }

    /**???????????? ????????? */
    is_can_soldier_tech_upgrade(type: number) {
        let info = this.byModel.techMap[type];
        let curCfg = ConfigManager.getItemByField(TechCfg, 'type', type, { lv: info ? info.lv : 0 });
        let nextCfg = ConfigManager.getItemByField(TechCfg, 'type', type, { lv: info ? info.lv + 1 : 1 });
        if (!nextCfg) return false;
        let dExp = curCfg.consumption - (info ? info.exp : 0);
        let materialsCfg = ConfigManager.getItemsByField(Tech_consumptionCfg, 'type', type);
        materialsCfg.sort((a, b) => { return b.exp - a.exp; });
        for (let i = 0; i < materialsCfg.length; i++) {
            let itemNum = BagUtils.getItemNumById(materialsCfg[i].item);
            dExp -= (itemNum * materialsCfg[i].exp);
            if (dExp <= 0) {
                return true;
            }
        }
        return false;
    }

    /**???????????? ?????????????????? */
    has_soldier_tech_research_rewards() {
        let maxT = ConfigManager.getItemByField(Tech_globalCfg, 'key', 'research_limit').value[0] * 60 * 60 * 1000;
        for (let key in this.byModel.techResearchMap) {
            let info = this.byModel.techResearchMap[key];
            if (info.type !== 2 && info.heroId > 0 && info.startTime > 0) {
                let t = GlobalUtil.getServerTime() - info.startTime * 1000;
                if (t >= maxT * 0.9) {
                    return true;
                }
            }
        }
        return false;
    }

    /**???????????? ??????????????? */
    has_soldier_energize_free_times() {
        if (!JumpUtils.ifSysOpen(2931)) return false;
        let maxFree = ConfigManager.getItemByField(Tech_globalCfg, 'key', 'energize_free').value[0];
        if (this.byModel.energizeTodayNum < maxFree) return true;
    }

    /**?????????????????????*/
    is_Guardian_Call_redPoint() {
        if (JumpUtils.ifSysOpen(2897)) {
            return this.is_Guardian_Call_rewards() || this.is_Guardian_Call_recall();
        }
        return false;
    }

    /**??????????????????????????? */
    is_Guardian_Call_rewards() {
        let guardianModel = ModelManager.get(GuardianModel);
        if (!guardianModel.guardianDrawState) return false;
        //?????????????????????????????????
        //let rewardCfgs = ConfigManager.getItems(Guardian_cumulativeCfg);
        let rewardType = ActUtil.getActRewardType(100);
        let rewardCfgs = ConfigManager.getItems(Guardian_cumulativeCfg, (cfg: Guardian_cumulativeCfg) => {
            if (cfg.reward_type == rewardType) {
                return true;
            }
        });
        let nowTime = GlobalUtil.getServerTime();
        let temDate = new Date(nowTime)
        let monthDay = temDate.getDate();
        let stateData = guardianModel.guardianDrawState
        let isMonth = stateData.cumIsMonthGain;
        for (let i = 0, n = rewardCfgs.length; i < n; i++) {
            let cfg = rewardCfgs[i];
            if (!isMonth || monthDay >= cfg.days) {
                if (stateData.drawnNum >= cfg.integral) {
                    let state = 1;
                    let temNum = stateData.cumAwardFlag
                    if ((temNum & 1 << cfg.reward_id - 1) >= 1) {
                        state = 2;
                    }
                    if (state == 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**???????????????????????????????????????10??? */
    is_Guardian_Call_recall() {
        let guardianModel = ModelManager.get(GuardianModel);
        if (!guardianModel.guardianDrawState) return false;
        // ????????????10?????????
        let itemId = ConfigManager.getItemByField(Guardian_globalCfg, 'key', "guardian_item").value[0]
        let itemNum = BagUtils.getItemNumById(itemId);
        if (itemNum >= 10 && !guardianModel.enterCallView) {
            return true;
        } else {
            //????????????????????????
            let diamondNum = ConfigManager.getItemByField(Guardian_globalCfg, 'key', "diamond").value[0]
            let consumption = ConfigManager.getItemByField(Guardian_globalCfg, 'key', "diamond_consumption").value;
            let canUseNum = diamondNum - guardianModel.guardianDrawState.numByGems;
            if (canUseNum >= 10) {
                let gemsNum = BagUtils.getItemNumById(consumption[0])
                let needGemsNum = (10 - itemNum) * consumption[1];
                if (gemsNum >= needGemsNum && !guardianModel.enterCallView) {
                    return true;
                }
            }
        }

        return false;
    }

    /**?????????????????????????????????  ?????????????????? ?????? ??????*/
    is_hero_guardian_can_operate(heroInfo: icmsg.HeroInfo) {
        if (!heroInfo) return false
        let guardian_open = ConfigManager.getItemById(GlobalCfg, "guardian_open").value[0]
        if (heroInfo.star < guardian_open) { return false }

        if (this.is_hero_guardian_can_upgrade(heroInfo)) {
            return true
        }

        if (this.is_hero_guardian_can_starup(heroInfo)) {
            return true
        }

        if (this.is_can_inHero_guardian_equip_strength(heroInfo)) {
            return true
        }

        if (this.is_can_inHero_guardian_equip_change_max_power(heroInfo)) {
            return true
        }

        if (this.is_can_inHero_guardian_equip_break(heroInfo)) {
            return true
        }

        return false
    }


    /**?????????????????????????????? */
    is_hero_guardian_can_puton(heroInfo: icmsg.HeroInfo) {
        if (!heroInfo) return false
        let guardian_open = ConfigManager.getItemById(GlobalCfg, "guardian_open").value[0]
        if (heroInfo.star < guardian_open) { return false }
        /**????????????????????????????????? */
        let upHeros = this.heroModel.PveUpHeroList
        if (upHeros.indexOf(heroInfo.heroId) == -1) {
            return false
        }
        if (!heroInfo.guardian && GuardianUtils.getFreeGuardianNum(0) > 0) {
            return true
        }
        return false
    }

    /**??????????????????????????? */
    is_hero_guardian_can_upgrade(heroInfo: icmsg.HeroInfo) {
        if (!heroInfo) return false
        let guardian = heroInfo.guardian
        if (!guardian) return false
        let starCfg = ConfigManager.getItemByField(Guardian_starCfg, "guardian_id", guardian.type, { star: guardian.star })
        if (guardian.level >= starCfg.guardian_lv) return false

        /**????????????????????????????????? */
        let upHeros = this.heroModel.PveUpHeroList
        if (upHeros.indexOf(heroInfo.heroId) == -1) {
            return false
        }
        let gCfg = ConfigManager.getItemById(GuardianCfg, guardian.type)
        let lvCfg = ConfigManager.getItemById(Guardian_lvCfg, guardian.level + 1)
        if (!lvCfg) return false
        let costItems = lvCfg[`cost_color${gCfg.color}`]
        let count = 0
        for (let i = 0; i < costItems.length; i++) {
            let hasNum = BagUtils.getItemNumById(costItems[i][0])
            if (hasNum >= costItems[i][1]) {
                count++
            }
        }
        if (count >= costItems.length) {
            return true
        }
        return false
    }

    /**??????????????????????????? */
    is_hero_guardian_can_starup(heroInfo: icmsg.HeroInfo) {
        if (!heroInfo) return false
        let guardian = heroInfo.guardian
        if (!guardian) return false
        let gCfg = ConfigManager.getItemById(GuardianCfg, guardian.type)
        if (guardian.star >= gCfg.star_max) return false

        /**????????????????????????????????? */
        let upHeros = this.heroModel.PveUpHeroList
        if (upHeros.indexOf(heroInfo.heroId) == -1) {
            return false
        }

        let upStarCfg = ConfigManager.getItemByField(Guardian_starCfg, "guardian_id", guardian.type, { star: guardian.star + 1 })
        let costItems = upStarCfg.cost_star
        if (costItems && costItems.length > 0) {
            let count = 0
            for (let i = 0; i < costItems.length; i++) {
                let hasNum = 0
                let itemId = costItems[i][0]
                if (BagUtils.getItemTypeById(itemId) == BagType.GUARDIAN) {
                    hasNum = GuardianUtils.getFreeGuardianNum(itemId)
                } else {
                    hasNum = BagUtils.getItemNumById(itemId)
                }
                if (hasNum >= costItems[i][1]) {
                    count++
                }
            }
            if (count >= costItems.length) {
                return true
            }
        }
        return false
    }


    /** 
    /** ????????????????????????????????????
    * @param condition
    */
    get_free_guardian_equip(condition?: any): BagItem[] {
        return BagUtils.getItemsByType(BagType.GUARDIANEQUIP, condition);
    }

    /**
   * ????????????????????????????????????????????????????????????
   * @param hero
   * @param item
   */
    is_can_guardian_equip_up(hero: icmsg.HeroInfo, item: BagItem): boolean {
        if (!hero) return false;
        if (!item) return false;
        let cfg = ConfigManager.getItemById(Guardian_equipCfg, item.itemId);
        let guardianEquip = this.get_hero_in_guardian_equip(hero, cfg.part);
        if (this.compare_guardian_equip(guardianEquip, item, hero)) {
            return true;
        }
        return false;
    }

    is_can_guardian_equip_up_by_part(hero: icmsg.HeroInfo, part): boolean {
        if (!hero) return false;
        let guardianEquip = this.get_hero_in_guardian_equip(hero, part);
        let freeItems = this.get_free_guardian_equip({ part: part })
        for (let i = 0; i < freeItems.length; i++) {
            if (this.compare_guardian_equip(guardianEquip, freeItems[i], hero)) {
                return true;
            }
        }
        return false;
    }

    /**??????????????? ????????? */
    is_can_guardian_equip_strength(hero: icmsg.HeroInfo, part) {
        if (!hero) return false

        let upHeros = this.heroModel.PveUpHeroList
        if (upHeros.indexOf(hero.heroId) == -1) {
            return false
        }
        let guardianEquip = this.get_hero_in_guardian_equip(hero, part);
        if (!guardianEquip) return false
        let cfg = ConfigManager.getItemById(Guardian_equipCfg, guardianEquip.itemId);
        let extInfo = guardianEquip.extInfo as icmsg.GuardianEquip
        let starCfg = ConfigManager.getItemByField(Guardian_equip_starCfg, "star", extInfo.star, { type: cfg.type, part: cfg.part })
        if (extInfo.level == starCfg.limit) {
            return false
        }
        let lvCfg = ConfigManager.getItemByField(Guardian_equip_lvCfg, "type", cfg.type, { part: cfg.part, lv: extInfo.level })
        let costItems = lvCfg.consumption
        let count = 0
        for (let i = 0; i < costItems.length; i++) {
            let hasNum = BagUtils.getItemNumById(costItems[i][0]);
            if (hasNum > costItems[i][1]) {
                count++
            }
        }
        if (count == costItems.length) {
            return true
        }
        return false
    }

    /**?????????????????????????????? */
    is_can_guardian_equip_break_by_part(hero: icmsg.HeroInfo, part): boolean {
        if (!hero) return false;
        let guardianEquip = this.get_hero_in_guardian_equip(hero, part);
        if (!guardianEquip) return false
        let cfg = ConfigManager.getItemById(Guardian_equipCfg, guardianEquip.itemId);
        let extInfo = guardianEquip.extInfo as icmsg.GuardianEquip
        let starCfg = ConfigManager.getItemByField(Guardian_equip_starCfg, "star", extInfo.star, { type: cfg.type, part: cfg.part })
        if (!starCfg) {
            return false
        }
        if (extInfo.level != starCfg.limit) {
            return false
        }
        let costItems = starCfg.consumption
        let count = 0
        for (let i = 0; i < costItems.length; i++) {
            let hasNum = BagUtils.getItemNumById(costItems[i][0]);
            if (hasNum > costItems[i][1]) {
                count++
            }
        }
        let specialCost = starCfg.special
        if (!specialCost) {
            return false
        }
        let replaceItem = starCfg.alternative
        let specialEnough = false
        let s_hasNum = BagUtils.getItemNumById(specialCost[0][0])//?????????????????????
        let s_hasNum2 = BagUtils.getItemNumById(replaceItem[0][0])//????????????????????????
        if (s_hasNum + s_hasNum2 >= specialCost[0][1]) {
            specialEnough = true
        }
        if (count == costItems.length && specialEnough) {
            return true
        }
        return false;
    }


    /**????????????????????????????????? ?????? */
    is_can_inHero_guardian_equip_strength(heroInfo: icmsg.HeroInfo) {
        if (!heroInfo) return false
        /**????????????????????????????????? */
        let upHeros = this.heroModel.PveUpHeroList
        if (upHeros.indexOf(heroInfo.heroId) == -1) {
            return false
        }
        for (let i = 0; i < 10; i++) {
            //?????????
            if (this.is_can_guardian_equip_strength(heroInfo, i + 1)) {
                return true
            }
        }
        return false
    }

    /**????????????????????????????????? ???????????????????????? */
    is_can_inHero_guardian_equip_change_max_power(heroInfo: icmsg.HeroInfo) {
        if (!heroInfo) return false
        /**????????????????????????????????? */
        let upHeros = this.heroModel.PveUpHeroList
        if (upHeros.indexOf(heroInfo.heroId) == -1) {
            return false
        }
        if (heroInfo.guardian) {
            for (let i = 0; i < 10; i++) {
                //?????????
                if (this.is_can_guardian_equip_up_by_part(heroInfo, i + 1)) {
                    return true
                }
            }
        }
        return false
    }

    /**????????????????????????????????? ?????? */
    is_can_inHero_guardian_equip_break(heroInfo: icmsg.HeroInfo) {
        if (!heroInfo) return false
        /**????????????????????????????????? */
        let upHeros = this.heroModel.PveUpHeroList
        if (upHeros.indexOf(heroInfo.heroId) == -1) {
            return false
        }
        for (let i = 0; i < 10; i++) {
            //?????????
            if (this.is_can_guardian_equip_break_by_part(heroInfo, i + 1)) {
                return true
            }
        }
        return false
    }


    /**?????????????????????????????? */
    get_hero_in_guardian_equip(hero: icmsg.HeroInfo, part: number) {
        if (hero) {
            if (hero.guardian && hero.guardian.equips && hero.guardian.equips[part - 1]) {
                let id = hero.guardian.equips[part - 1].id
                if (id > 0) {
                    let bagItem = {
                        series: id,
                        itemId: hero.guardian.equips[part - 1].type,
                        itemNum: 1,
                        type: BagType.GUARDIANEQUIP,
                        extInfo: hero.guardian.equips[part - 1]
                    }
                    return bagItem
                }
            }
            return null
        }
    }

    /**
    * ?????????????????????, e2 ???????????? e1
    * @param e1
    * @param e2
    */
    compare_guardian_equip(e1: BagItem, e2: BagItem, heroInfo: icmsg.HeroInfo): boolean {

        //??????????????????
        if (!e1 && e2) {
            return true
        }

        let guardianEquip1 = ConfigManager.getItemById(Guardian_equipCfg, e1.itemId)
        let guardianEquip2 = ConfigManager.getItemById(Guardian_equipCfg, e2.itemId)

        //?????? ??????????????????
        if (heroInfo) {
            if (guardianEquip1.part != guardianEquip2.part) {
                return false
            }
        }

        //????????????
        if (GuardianUtils.getTargetEquipPower(e2.extInfo as icmsg.GuardianEquip) > GuardianUtils.getTargetEquipPower(e1.extInfo as icmsg.GuardianEquip)) {
            return true
        }
        return false;
    }

    /**???????????????????????? */
    has_must_do_task() {
        if (!this.taskModel.mustDoData) return false
        let list = this.taskModel.mustDoData.list
        for (let i = 0; i < list.length; i++) {
            if (list[i].remain > 0) {
                return true
            }
        }
        return false
    }

    /**????????????????????? */
    is_doomsDay_show_redPoint(instanceID) {
        if (JumpUtils.ifSysOpen(this.get_copy_open_lv(instanceID), false)) {

            let cfgs = ConfigManager.getItems(CopyCfg, { 'copy_id': 14 });
            let res = false;
            let power = ModelManager.get(RoleModel).MaxPower;
            let doomsDayModel = ModelManager.get(DoomsDayModel)
            let datas = doomsDayModel.doomsDayInfos;

            let vipCfg = ConfigManager.getItemByField(VipCfg, "level", this.roleModel.vipLv)
            let vipNum = (vipCfg && cc.js.isNumber(vipCfg.vip7)) ? vipCfg.vip7 : 0;
            let freeNum = ConfigManager.getItemByField(GlobalCfg, 'key', 'doomsday_free_sweep').value[0];
            let activityModel = ModelManager.get(ActivityModel);
            let rank = activityModel.roleServerRank ? activityModel.roleServerRank.rank : -1;
            if (rank >= 1 && rank <= 3) {
                let cServerRankTCfg = CarnivalUtil.getCrossRankConfig(rank);
                if (cc.js.isNumber(cServerRankTCfg.privilege1)) {
                    freeNum += cServerRankTCfg.privilege1
                }
            }
            //????????????
            let combineRank = this.combineModel.serverRank ? this.combineModel.serverRank : -1
            if (ActUtil.ifActOpen(95) && combineRank >= 1 && combineRank <= 3) {
                let combineTQCfg = CombineUtils.getCrossRankConfig(combineRank);
                if (cc.js.isNumber(combineTQCfg.privilege1)) {
                    freeNum += combineTQCfg.privilege1
                }
            }

            for (let i = 0; i < cfgs.length; i++) {

                let cfg = cfgs[i];
                let res = true;
                if (cfg.subtype >= 46) {
                    vipNum = 0;
                }
                let stageCfg = ConfigManager.getItemByField(Copy_stageCfg, 'subtype', cfg.subtype)
                let have = false;
                if (stageCfg) {
                    if (stageCfg.player_lv && stageCfg.player_lv > this.roleModel.level) {
                        res = false;
                    } else {
                        datas.forEach(data => {
                            if (data.subType == cfg.subtype) {
                                have = true;
                                if (stageCfg.power > power) {
                                    if (doomsDayModel.unLockStageId.indexOf(stageCfg.id) < 0) {
                                        doomsDayModel.unLockStageId.push(stageCfg.id)
                                    }
                                    res = false;
                                }
                                // else if (cfg.subtype >= 46) {
                                //     res = cfg.participate + vipNum + freeNum > data.num && doomsDayModel.enterStageIDs.indexOf(cfg.subtype) < 0
                                // } 
                                else if (data.stageId > 0) {
                                    let tem = ConfigManager.getItemByField(Copy_stageCfg, 'id', data.stageId + 1, { 'subtype': cfg.subtype });
                                    if (tem) {
                                        if (power < tem.power) {
                                            if (doomsDayModel.unLockStageId.indexOf(tem.id) < 0) {
                                                doomsDayModel.unLockStageId.push(tem.id)
                                            }
                                            res = cfg.participate + vipNum + freeNum > data.num //false;
                                        } else if (doomsDayModel.unLockStageId.indexOf(tem.id) >= 0) {
                                            let index = doomsDayModel.unLockStageId.indexOf(tem.id);
                                            doomsDayModel.unLockStageId.splice(index, 1);
                                            let index1 = doomsDayModel.enterStageIDs.indexOf(cfg.subtype);
                                            if (index1 >= 0) doomsDayModel.enterStageIDs.splice(index1, 1);
                                            res = true
                                        } else if (doomsDayModel.enterStageIDs.indexOf(cfg.subtype) < 0) {
                                            res = true
                                        } else {
                                            res = cfg.participate + vipNum + freeNum > data.num//false
                                        }
                                    } else {
                                        res = cfg.participate + vipNum + freeNum > data.num //&& doomsDayModel.enterStageIDs.indexOf(cfg.subtype) < 0
                                    }
                                }
                                else {
                                    res = cfg.participate + vipNum + freeNum > data.num //&& doomsDayModel.enterStageIDs.indexOf(cfg.subtype) < 0
                                }
                            }
                        })
                        if (!have && doomsDayModel.enterStageIDs.indexOf(cfg.subtype) >= 0) {
                            res = false;
                        }
                    }
                }
                if (res) {
                    return true;
                }
            }
            return res;
        }
        return false
    }
    /**????????????120??? ???????????????????????? */
    is_can_reward_welfare() {
        let cfgs = ConfigManager.getItems(Mission_welfareCfg);
        let lastSid = ModelManager.get(CopyModel).lastCompleteStageId;
        if (ModelManager.get(TaskModel).isFirstOpenKfflView) return true;
        for (let i = 0; i < cfgs.length; i++) {
            if (cfgs[i].args <= lastSid) {
                if (!TaskUtil.getWelfareTaskState(cfgs[i].id)) return true;
            }
        }
        return false;
    }

    /**?????????????????? ???????????????????????? */
    has_reward_welfare2() {
        if (!ModelManager.get(StoreModel).isBuyWelfare2 || !TaskUtil.isAllRecivedInWelfareView()) return false;
        let cfgs = ConfigManager.getItems(Mission_welfare2Cfg);
        let loginDays = ModelManager.get(RoleModel).loginDays;
        for (let i = 0; i < cfgs.length; i++) {
            if (cfgs[i].days <= loginDays) {
                if (!TaskUtil.getWelfare2TaskState(cfgs[i].id)) return true;
            }
        }
        return false;
    }

    /**
     * ??????????????????????????????
     */
    has_daily_recharge_reward() {
        if (!JumpUtils.ifSysOpen(2834) && !this.storeModel.firstPayTime) return false;
        if (this.activityModel.dailyRechargeRewarded) return false;
        let cfg = ConfigManager.getItem(Gift_daily_firstCfg, (cfg: Gift_daily_firstCfg) => {
            if (cfg.world_level[0] <= this.activityModel.worldAvgLv && cfg.world_level[1] >= this.activityModel.worldAvgLv) {
                return true;
            }
        });
        if (this.activityModel.dailyPayMoney >= cfg.RMB_cost) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * ????????????????????????
     * @param params ??????sysId??????
     */
    has_any_reward_of_all_exciting_act(params: number[]) {
        for (let i = 0; i < params.length; i++) {
            if (this.has_reward_exciting_act(params[i])) {
                return true;
            }
        }
        return false;
    }

    /**
     * ??????????????????
     * @param params ??????sysId 
     */
    has_reward_exciting_act(params: number) {
        let cfgs;
        let sysId = params;
        let sysCfg = ConfigManager.getItemById(SystemCfg, sysId);
        if (!sysCfg) {
            return false;
        }
        if (!JumpUtils.ifSysOpen(sysId)) {
            return false;
        }
        let actCfg = ActUtil.getCfgByActId(sysCfg.activity);
        let rewardType = actCfg ? actCfg.reward_type : null;
        switch (sysId) {
            case 2821:
                let cycle = ModelManager.get(ActivityModel).excitingActOfContinuousCycle;
                cfgs = ConfigManager.getItemsByField(Activity_continuousCfg, 'cycle', cycle);
                break;
            case 2822:
                cfgs = ConfigManager.getItems(Activity_upgradeCfg);
                break;
            case 2823:
                cfgs = ConfigManager.getItemsByField(Talent_alchemyCfg, 'reward_type', rewardType);
                break;
            case 2824:
                cfgs = ConfigManager.getItemsByField(Talent_quick_combatCfg, 'reward_type', rewardType);
                break;
            case 2825:
                cfgs = ConfigManager.getItemsByField(Talent_arenaCfg, 'reward_type', rewardType);
                break;
            case 2826:
                cfgs = ConfigManager.getItemsByField(Talent_treasureCfg, 'reward_type', rewardType);
                break;
            case 2828:
                cfgs = ConfigManager.getItemsByField(Activity_collect_heroCfg, 'type', rewardType);
                break;
            case 2842:
                let type = ModelManager.get(ActivityModel).excitingAcrOfStarGiftRewardType;
                cfgs = ConfigManager.getItemsByField(Activity_star_giftsCfg, 'reward_type', type);
                break;
            default:
                break;
        }
        let type = {
            2821: subActType.continuous,
            2822: subActType.upgrade,
            2823: subActType.alchemy,
            2824: subActType.quickCombat,
            2825: subActType.arena,
            2826: subActType.treasure,
            2828: subActType.collectHero,
            2842: subActType.starGift,
        }[sysId];
        let info = this.activityModel.excitingActInfo[type] || {};
        if (Object.keys(info).length <= 0) {
            return false;
        }
        for (let i = 0; i < cfgs.length; i++) {
            let rounds = cfgs[i]['rounds'] || 0;
            if (info[rounds] && info[rounds][cfgs[i].target]) {
                let args = cfgs[i].args || 0;
                let num = info[rounds][cfgs[i].target][args];
                if (num && num >= cfgs[i].number && !this.activityModel.excitingRewards[cfgs[i].taskid]) {
                    if (type == subActType.upgrade) {
                        let limit = this.activityModel.excitingActOfUpgradeLimitInfo[cfgs[i].taskid];
                        if (!info && info != 0) info = cfgs.limit;
                        if (limit <= 0) continue;
                    }
                    return true;
                }
            }
        }
    }

    /**
     * ??????????????????????????????
     *
     */
    is_can_reward_main_hangInfo(rewardList: []) {
        if (this.roleModel.level < 16) {
            return true
        }
        return rewardList.length > 0;
    }

    /**
     * ??????????????????????????????
     */
    is_can_reward_main_line_cup() {
        let obj = this.mainLineModel.ownAreaCupNumber;
        let state = false;
        // for (let key in obj) {
        //     let getCups = obj[key];
        //     let box = this.mainLineModel.receiveAreaCupReward[parseInt(key)];
        //     let cfgs: Copy_prizeCfg[] = ConfigManager.getItems(Copy_prizeCfg, { prize_id: parseInt(key) });
        //     for (let i = 0; i < cfgs.length; i++) {
        //         if (getCups >= cfgs[i].cup && !this.mainLineModel.isCupGot(box, i)) {
        //             state = true;
        //             break;
        //         }
        //     }
        // }
        return state;
    }

    /**??????????????????10??? ?????????????????? */
    /**??????????????????n??? ?????????????????? */
    is_can_lottery(time: number) {
        let nums = [BagUtils.getItemNumById(140001), BagUtils.getItemNumById(140002), BagUtils.getItemNumById(140011)];
        if (time == 1) {
            if (nums[0] >= time || nums[2] >= time || (nums[0] + nums[2]) >= time) return true;
        }
        else {
            if (nums[0] >= time || nums[1] >= time || nums[2] >= time || (nums[0] + nums[2]) >= time) return true;
        }
        return false;
    }

    is_lottery_credit_reward() {
        if (!JumpUtils.ifSysOpen(401)) {
            return false;
        }
        let costCfg = ConfigManager.getItemByField(GlobalCfg, 'key', 'luckydraw_exchange');
        let credit = this.lotteryModel.credit;
        if (credit >= costCfg.value[0]) return true;
        else return false;
    }

    /**
     * ??????????????????
     */
    is_lottery_item_update() {
        if (!JumpUtils.ifSysOpen(401)) {
            return false;
        }
        let obj = GlobalUtil.getLocal('lotteryRedpoint', true) || {};
        let cfgs = ConfigManager.getItems(LuckydrawCfg);
        let ids = [];
        cfgs = cfgs.filter((cfg: LuckydrawCfg) => {
            if (ids.indexOf(cfg.id) == -1) {
                let sysId = cfg.system;
                if (cfg.paper && cfg.paper > 0 && ((sysId != 0 && JumpUtils.ifSysOpen(sysId)) || cfg.act_type == 0)) {
                    ids.push(cfg.id);
                    return true;
                }
            }
        });
        for (let i = 0; i < cfgs.length; i++) {
            let info = obj[cfgs[i].item_id];
            if (info && info.num >= (cfgs[i].item_num / 10) && !info.isCheck) {
                return true;
            }
        }
        return false;
    }

    /**???????????????????????? */
    has_unique_equip_draw_times() {
        if (!JumpUtils.ifSysOpen(2955)) return false;
        let v = ConfigManager.getItemByField(Unique_globalCfg, 'key', 'uniquedrop_unlock').value;
        let m = ModelManager.get(RoleModel);
        if (m.maxHeroStar < v[0] && m.level < v[1]) return false;
        let cfg = ConfigManager.getItemById(Unique_lotteryCfg, 1);
        if (BagUtils.getItemNumById(cfg.item) >= 1) return true;
    }

    /**???????????????????????? */
    is_gene_item_update() {
        if (!JumpUtils.ifSysOpen(2832)) {
            return false;
        }
        if (this.lotteryModel.firstInGene) {
            let cfgs = ConfigManager.getItems(GeneCfg);
            for (let i = 0; i < cfgs.length; i++) {
                let costItem = cfgs[i].item;
                if (BagUtils.getItemNumById(costItem[0]) >= costItem[1]) {
                    return true;
                }
            }
        }
        let itemId = 140001;
        let hasNum = BagUtils.getItemNumById(itemId) || 0;
        if (hasNum <= 0) return false;
        let local = GlobalUtil.getLocal(`geneItem${itemId}`, true) || 0;
        return hasNum > local;
    }

    /**
    * ??????????????????????????????
    */
    has_chip_compose(): boolean {
        let cfgs = ConfigManager.getItems(HeroCfg, (cfg: HeroCfg) => {
            if (cfg.show == 1 && cfg.compose_show && cfg.compose_show.length >= 1) {
                let careerCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", cfg.career_id)
                return true;
            }
        });
        let infos: icmsg.HeroInfo[] = [];
        cfgs.forEach(cfg => {
            cfg.compose_show.forEach(star => {
                let temp = HeroUtils.getHeroListByTypeId(cfg.id);
                let list: icmsg.HeroInfo[] = [];
                let b = false;
                temp.forEach(info => {
                    if (info.star == star && !b) {
                        b = true;
                        infos.push(info);
                        list.push(info);
                    }
                });
                if (list.length == 0) {
                    let careerLv = ConfigManager.getItemById(Hero_starCfg, star).career_lv;
                    let careerCfg: Hero_careerCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", cfg.career_id, { career_lv: careerLv })
                    let heroInfo = new icmsg.HeroInfo();
                    heroInfo.heroId = parseInt(`${cfg.id}${star}`);
                    heroInfo.typeId = cfg.id;
                    heroInfo.careerId = cfg.career_id;
                    heroInfo.soldierId = cfg.soldier_id[0];
                    heroInfo.star = star;
                    heroInfo.level = careerCfg.hero_lv;
                    heroInfo.slots = null;
                    heroInfo.power = HeroUtils.getPowerByStarAndCareer(cfg.id, cfg.career_id, star);
                    heroInfo.careerLv = ConfigManager.getItemsByField(Hero_careerCfg, 'career_id', cfg.career_id)[0].career_lv;
                    heroInfo.status = null;
                    infos.push(heroInfo);
                }
            });
        });

        for (let i = 0; i < infos.length; i++) {
            let info = infos[i];
            let cfg = ConfigManager.getItemById(HeroCfg, info.typeId);
            if (info.star < cfg.star_max) {
                if (this.is_can_star_up(info)) return true;
            }
        }
        return false;
    }

    /**
     * ?????????????????????????????????????????????
     */
    has_hero_compose_reward() {
        // let composeCfgs = ConfigManager.getItems(Hero_composeCfg);
        // for (let i = 0; i < composeCfgs.length; i++) {
        //     let cfg = composeCfgs[i];
        //     let isActive = HeroUtils.checkHeroComposeIsActive(cfg.parent_id);
        //     if (!isActive) {
        //         let status = HeroUtils.getHeroComposeStatusById(cfg.parent_id);
        //         if (!status) status = '00000000';
        //         let unRecivePos = [];
        //         let a = status.indexOf('0');
        //         while (a != -1) {
        //             a != 0 && unRecivePos.push(status.length - 1 - a); //????????????????????????????????????,??????
        //             a = status.indexOf('0', a + 1);
        //         }
        //         let checkChildFun = (child, posIdx): boolean => {
        //             if (child && child.length == 2) {
        //                 let childInfo = HeroUtils.getHeroInfoById(child[0]);
        //                 if (childInfo) {
        //                     if ([4, 2, 0].indexOf(posIdx) != -1) return true;
        //                     else {
        //                         let heroCfg = ConfigManager.getItemById(HeroCfg, child[0]);
        //                         let starLimt = ConfigManager.getItemById(Hero_colorCfg, heroCfg.color).star;
        //                         if (childInfo.star == starLimt) return true;
        //                     }
        //                 }
        //                 return false;
        //             }
        //             return false;
        //         }
        //         for (let j = 0; j < unRecivePos.length; j++) {
        //             if (unRecivePos[j] == 6) {
        //                 let targetHeroInfo = HeroUtils.getHeroInfoById(cfg.parent_id);
        //                 if (targetHeroInfo) return true;
        //             }
        //             else {
        //                 let cfgs = [cfg.child1, cfg.child1, cfg.child2, cfg.child2, cfg.child3, cfg.child3];
        //                 if (checkChildFun(cfgs[unRecivePos[j]], unRecivePos[j])) return true;
        //             }
        //         }
        //     }
        // }
        return false;
    }

    /**
     * ????????????????????????????????? ????????????
     */
    has_signal_hero_compose_or_reward(id: number): boolean {
        // let isActive = HeroUtils.checkHeroComposeIsActive(id);
        // let cfg = ConfigManager.getItemByField(Hero_composeCfg, 'parent_id', id);
        // if (isActive) {
        //     let redPointFlag = HeroUtils.getHeroComposeRedPointFlag(id);
        //     if (redPointFlag == 1) return false;  //????????????
        //     // ???????????????,??????????????????
        //     let childs = [cfg.child1, cfg.child2, cfg.child3];
        //     let valiedLen = 0;
        //     for (let i = 0; i < childs.length; i++) {
        //         if (childs[i] && childs[i].length == 2) {
        //             let childCfg = ConfigManager.getItemById(HeroCfg, childs[i][0]);
        //             let chips = BagUtils.getItemById(childCfg.chip_id);
        //             if (chips && chips.itemNum >= childs[i][1]) valiedLen += 1;
        //         }
        //         else {
        //             childs.splice(i, 1);
        //             i--;
        //         }
        //     }
        //     if (valiedLen == childs.length) return true;
        // }
        // else {
        //     //?????????????????????,???????????????????????????
        //     let status = HeroUtils.getHeroComposeStatusById(cfg.parent_id);
        //     if (!status) status = '00000000';
        //     let unRecivePos = [];
        //     let a = status.indexOf('0');
        //     while (a != -1) {
        //         a != 0 && unRecivePos.push(status.length - 1 - a);
        //         a = status.indexOf('0', a + 1);
        //     }
        //     let checkChildFun = (child, posIdx): boolean => {
        //         if (child && child.length == 2) {
        //             let childInfo = HeroUtils.getHeroInfoById(child[0]);
        //             if (childInfo) {
        //                 if ([4, 2, 0].indexOf(posIdx) != -1) return true;
        //                 else {
        //                     let heroCfg = ConfigManager.getItemById(HeroCfg, child[0]);
        //                     let starLimt = ConfigManager.getItemById(Hero_colorCfg, heroCfg.color).star;
        //                     if (childInfo.star == starLimt) return true;
        //                 }
        //             }
        //             return false;
        //         }
        //         return false;
        //     }
        //     for (let j = 0; j < unRecivePos.length; j++) {
        //         if (unRecivePos[j] == 6) {
        //             let targetHeroInfo = HeroUtils.getHeroInfoById(cfg.parent_id);
        //             if (targetHeroInfo) return true;
        //         }
        //         else {
        //             let cfgs = [cfg.child1, cfg.child1, cfg.child2, cfg.child2, cfg.child3, cfg.child3];
        //             if (checkChildFun(cfgs[unRecivePos[j]], unRecivePos[j])) return true;
        //         }
        //     }
        // }
        return false;
    }


    /**
     * ???????????????????????????????????????
     */
    is_can_active_compose(): boolean {
        // let cfg = ConfigManager.getItems(Hero_composeCfg);
        // for (let i = 0; i < cfg.length; i++) {
        //     let id = cfg[i].parent_id;
        //     // let redPointFlag = HeroUtils.getHeroComposeRedPointFlag(id);
        //     // if (redPointFlag == 1) continue;  //????????????
        //     let heroInfo = HeroUtils.getHeroInfoById(id);
        //     if (!heroInfo) continue;
        //     let status = HeroUtils.getHeroComposeStatusById(id);
        //     if (!status) continue;
        //     let childs = HeroUtils.getHeroSynthesisInfo(id);
        //     let activeStr = '';   //isActive,parent, child3,child3,...,child1
        //     let activeMap = ['01000011', '01001111', '01111111']; //[childlen==1, ==2, ==3]
        //     activeStr += `${activeMap[childs.length - 1]}`;
        //     if (status == activeStr) return true;
        // }
        return false
    }

    /**?????????????????????????????? */
    has_kfcb_act_reward(day: number) {
        let serverTime = Math.floor(GlobalUtil.getServerTime() / 1000)
        let serverOpenTime = GlobalUtil.getServerOpenTime()
        if (day == 3) {
            let list3 = ConfigManager.getItems(Activity_ranking3Cfg)
            let endTime3 = serverOpenTime + 3600 * 24 * 3 - serverTime
            if (endTime3 <= 0) {
                if (this.activityModel.kfcb_percent3 > 0 && this.activityModel.kfcb_percent3 <= list3[list3.length - 1].rank && this.activityModel.kfcb_rewarded3 == false) {
                    return true
                }
            }
        } else if (day == 7) {
            let list7 = ConfigManager.getItems(Activity_ranking7Cfg)
            let endTime7 = serverOpenTime + 3600 * 24 * 7 - serverTime
            if (endTime7 <= 0) {
                if (this.activityModel.kfcb_percent7 > 0 && this.activityModel.kfcb_percent7 <= list7[list7.length - 1].rank && this.activityModel.kfcb_rewarded7 == false) {
                    return true
                }
            }
        }
        return false
    }

    /**?????????????????? */
    has_monthcard_receive() {
        if (!JumpUtils.ifSysOpen(2836)) return false;
        let storeModel = ModelManager.get(StoreModel);
        for (let i = 0; i < storeModel.monthCardListInfo.length; i++) {
            const info = storeModel.monthCardListInfo[i];
            if (info.id == 500001 || info.id == 500002) {
                if (info && info.time > GlobalUtil.getServerTime() / 1000 && !info.isRewarded) {
                    return true;
                }
            }
        }
        return false;
    }

    has_kfLogin_reward() {
        if (!JumpUtils.ifSysOpen(2878)) return false;
        if (!this.activityModel.kfLoginDays) return false;
        if ((this.activityModel.kfLoginDaysReward & 1 << this.activityModel.kfLoginDays - 1) <= 0) return true;
        else return false;
    }

    /**????????? ??????/??????/?????? */
    is_energy_can_do() {
        let types = [1, 2, 3, 4, 5];
        for (let i = 0; i < types.length; i++) {
            if (this.is_energy_can_update(types[i])) {
                return true;
            }
        }
    }

    is_energy_can_update(type: number) {
        return this.is_energy_can_active(type) || this.is_energy_can_upgrade(type) || this.is_energy_can_advance(type)
    }

    /**????????? ??????*/
    is_energy_can_active(type: number) {
        if (!JumpUtils.ifSysOpen(2871)) return false;
        let info = this.energyModel.energyStationInfo[type];
        if (!info || info.upgradeId > 0) return false;
        if (!info.isRedPoint) return false;
        let typeCfg = ConfigManager.getItemById(Energystation_typeCfg, info.stationId);
        let c = typeCfg.consumption;
        let heros = this.heroModel.heroInfos;
        let totalNum = c[2];
        for (let i = 0; i < heros.length; i++) {
            let info = <icmsg.HeroInfo>heros[i].extInfo;
            if (info.star == c[1]) {
                let heroCfg = <HeroCfg>BagUtils.getConfigById(info.typeId);
                if (heroCfg.group[0] == c[0]) {
                    let b = HeroUtils.heroLockCheck(info, false);
                    if (!b) {
                        totalNum -= 1;
                    }
                    if (totalNum <= 0) {
                        return true;
                    }
                }
            }
        }
    }

    /**????????? ??????*/
    is_energy_can_upgrade(type: number) {
        if (!JumpUtils.ifSysOpen(2871)) return false;
        let info = this.energyModel.energyStationInfo[type];
        if (!info || info.upgradeId <= 0) return false;
        if (!info.isRedPoint) return false;
        let curUpgradeCfg = ConfigManager.getItemById(Energystation_upgradeCfg, info.upgradeId);
        let nextUpgradeCfg = ConfigManager.getItem(Energystation_upgradeCfg, (cfg: Energystation_upgradeCfg) => {
            if (cfg.type == curUpgradeCfg.type && cfg.level == curUpgradeCfg.level && cfg.times == curUpgradeCfg.times + 1) {
                return true;
            }
        });
        if (!nextUpgradeCfg) return false;
        for (let i = 0; i < nextUpgradeCfg.consumption.length; i++) {
            let c = nextUpgradeCfg.consumption[i];
            if (BagUtils.getItemNumById(c[0]) < c[1]) {
                return false;
            }
        }
        return true;
    }

    /**????????? ??????*/
    is_energy_can_advance(type: number) {
        if (!JumpUtils.ifSysOpen(2871)) return false;
        let info = this.energyModel.energyStationInfo[type];
        if (!info || info.advanceId <= 0) return false;
        if (!info.isRedPoint) return false;
        let curAdvanceCfg = ConfigManager.getItemById(Energystation_advancedCfg, info.advanceId);
        let nextAdvanceCfg = ConfigManager.getItem(Energystation_advancedCfg, (cfg: Energystation_advancedCfg) => {
            if (cfg.type == curAdvanceCfg.type && cfg.class == curAdvanceCfg.class && cfg.level == curAdvanceCfg.level + 1) {
                return true;
            }
        });
        if (!nextAdvanceCfg) return false;
        let curUpgradeCfg = ConfigManager.getItemById(Energystation_upgradeCfg, info.upgradeId);
        if (nextAdvanceCfg.limit && curUpgradeCfg.level < nextAdvanceCfg.limit) return false;
        for (let i = 0; i < nextAdvanceCfg.consumption.length; i++) {
            let c = nextAdvanceCfg.consumption[i];
            if (BagUtils.getItemNumById(c[0]) < c[1]) {
                return false;
            }
        }

        if (nextAdvanceCfg.hero_consumption) {
            let c = nextAdvanceCfg.hero_consumption;
            let heros = this.heroModel.heroInfos;
            let totalNum = c[2];
            for (let i = 0; i < heros.length; i++) {
                let info = <icmsg.HeroInfo>heros[i].extInfo;
                if (info.star == c[1]) {
                    let heroCfg = <HeroCfg>BagUtils.getConfigById(info.typeId);
                    if (heroCfg.group[0] == c[0]) {
                        let b = HeroUtils.heroLockCheck(info, false);
                        if (!b) {
                            totalNum -= 1;
                        }
                        if (totalNum <= 0) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        else {
            return true;
        }
    }

    /**???????????????????????????????????? */
    has_awake_star_up_gift() {
        if (!JumpUtils.ifSysOpen(2920)) return false;
        let stars = [6, 7, 8, 9, 10];
        if (!this.activityModel.awakeHeroId) return true;
        for (let i = 0; i < stars.length; i++) {
            let b = this.has_awake_star_up_gift_by_star(stars[i]);
            if (b) {
                return true;
            }
        }
        return false;
    }

    has_awake_star_up_gift_by_star(star: number) {
        if (!JumpUtils.ifSysOpen(2920)) return false;
        let info = this.activityModel.awakeStarUpGiftMap[star];
        if (info && this.activityModel.awakeHeroId) {
            let heroInfo = HeroUtils.getHeroInfoByHeroId(this.activityModel.awakeHeroId);
            if (heroInfo && heroInfo.star >= info.totalStar) {
                for (let i = 0; i < info.awardList.length; i++) {
                    if (i <= info.nowDay) {
                        let id = info.awardList[i];
                        if (id == 0) {
                            if ((i >= 1 && info.isCharge) || i == 0) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    /**?????????????????????????????? ??? ????????????????????????????????????>=1 */
    has_diary_task_reward() {
        if (!JumpUtils.ifSysOpen(2858)) return false;
        let actId = 59;
        let actCfg = ActUtil.getCfgByActId(actId);
        let startTime = ActUtil.getActStartTime(actId);
        // let endTime = ActUtil.getActEndTime(actId);
        let now = GlobalUtil.getServerTime();
        // let t = (endTime - now) / 1000;
        let curDay = Math.min(7, Math.ceil((now - startTime) / 86400000));
        let cfgs = ConfigManager.getItems(DiaryCfg, (cfg: DiaryCfg) => {
            if (cfg.days == curDay && cfg.reward_type == actCfg.reward_type) {
                return true;
            }
        });
        if (this.taskModel.firstInDiary) {
            for (let i = 0; i < cfgs.length; i++) {
                if (!TaskUtil.getTaskState(cfgs[i].taskid)) {
                    return true;
                }
            }
        }
        else {
            for (let i = 0; i < cfgs.length; i++) {
                if (TaskUtil.getTaskState(cfgs[i].taskid)) {
                    if (!TaskUtil.getTaskAwardState(cfgs[i].taskid)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**??????????????????????????? */
    has_pieces_chess_reward() {
        if (!JumpUtils.ifSysOpen(2914)) return false;
        let type = ActUtil.getActRewardType(106);
        let c = ConfigManager.getItems(Pieces_divisionCfg);
        type = Math.min(type, c[c.length - 1].type);
        let cfgs = ConfigManager.getItemsByField(Pieces_divisionCfg, 'type', type);
        let score = this.piecesModel.score | 0;
        for (let i = 0; i < cfgs.length; i++) {
            if (cfgs[i].point > 0 && score >= cfgs[i].point && this.piecesModel.divisionRewardMap[cfgs[i].division] !== 1) {
                return true
            }
        }
        return false;
    }

    /**???????????????????????? */
    has_pieces_atk_times() {
        if (!JumpUtils.ifSysOpen(2914)) return false;
        if (this.piecesModel.firstInChessView && this.piecesModel.restChallengeTimes >= 1) return true;
    }

    /**?????????????????????????????? */
    has_diary_lv_reward() {
        if (!JumpUtils.ifSysOpen(2858)) return false;
        let actId = 59;
        let actCfg = ActUtil.getCfgByActId(actId);
        let cfgs = ConfigManager.getItems(Diary_rewardCfg, (cfg: Diary_rewardCfg) => {
            if (cfg.reward_type == actCfg.reward_type) {
                return true;
            }
        });

        let itemId = ConfigManager.getItemByField(Diary_globalCfg, 'key', 'item').value[0];
        let itemNum = BagUtils.getItemNumById(itemId);
        for (let i = 0; i < cfgs.length; i++) {
            if (itemNum >= cfgs[i].value[1]) {
                if ((this.taskModel.diaryLvRewards & 1 << cfgs[i].level) <= 0) {
                    return true;
                }
            }
        }
    }

    /**?????????????????????????????? */
    has_diary_extra_reward() {
        if (!JumpUtils.ifSysOpen(2858)) return false;
        let actId = 59;
        let actCfg = ActUtil.getCfgByActId(actId);
        let cfgs = ConfigManager.getItems(Diary_reward1Cfg, (cfg: Diary_reward1Cfg) => {
            if (cfg.reward_type == actCfg.reward_type) {
                return true;
            }
        });

        let _getLv = () => {
            let itemId = ConfigManager.getItemByField(Diary_globalCfg, 'key', 'item').value[0];
            let itemNum = BagUtils.getItemNumById(itemId);
            let cfgs = ConfigManager.getItemsByField(Diary_rewardCfg, 'reward_type', actCfg.reward_type);
            cfgs.sort((a, b) => { return b.level - a.level; });
            let curLv = 0;
            for (let i = 0; i < cfgs.length; i++) {
                if (cfgs[i].level == 0 || itemNum >= cfgs[i].value[1]) {
                    curLv = cfgs[i].level;
                    break;
                }
            }
            return curLv;
        }
        let curLv = _getLv();
        let itemId = ConfigManager.getItemByField(Diary_globalCfg, 'key', 'item1').value[0];
        let itemNum = BagUtils.getItemNumById(itemId);
        for (let i = 0; i < cfgs.length; i++) {
            if (curLv >= cfgs[i].level && itemNum >= cfgs[i].value[1]) {
                if ((this.taskModel.diaryExtraRewards & 1 << cfgs[i].level) <= 0) {
                    return true;
                }
            }
        }
    }

    /** ???????????????,???????????????*/
    has_guild_sign_reward(arg) {
        if (this.roleModel.guildId > 0) {
            if (arg == 1) {
                return !(this.guildModel.signFlag & arg)
            }
            let signCfg = ConfigManager.getItemById(Guild_signCfg, 1)
            if (arg == 2) {
                return !(this.guildModel.signFlag & arg) && this.guildModel.signNum >= signCfg.number2
            }
            if (arg == 4) {
                return !(this.guildModel.signFlag & arg) && this.guildModel.signNum >= signCfg.number3
            }
        }
        return false
    }

    /** ????????????????????????*/
    has_guild_war_fight() {
        return false
    }

    /**??????????????????????????? */
    has_guild_worker_set() {
        if (this.roleModel.guildId > 0) {
            if (this.mercenaryModel.lentHeroList) {
                return MercenaryUtils.setHeroLength > MercenaryUtils.hiredHeroLength
            }
        }
        return false
    }

    /**???????????????????????? */
    has_worker_money_get() {
        if (this.roleModel.guildId > 0) {
            let list = this.mercenaryModel.lentHeroList
            for (let i = 0; i < list.length; i++) {
                let hangTime = list[i].settlteTime - list[i].gainTime
                if (hangTime >= 24 * 60 * 60) {
                    return true
                }
            }
        }
        return false
    }

    /**??????????????????????????????
     * type 1 ???????????????  type 2 ??????????????? 
     */
    has_foot_hold_reward(type) {
        let footHold = ModelManager.get(FootHoldModel)
        if (this.roleModel.guildId > 0) {
            let guildMapData = footHold.guildMapData
            let globalData = footHold.globalMapData
            if (type == 1) {
                if (guildMapData && guildMapData.redPoint && guildMapData.redPoint.points.length > 0) {
                    return true
                }
                if (footHold.energy >= 2 && !globalData) {
                    return true
                }
            } else if (type == 2) {
                if ((globalData && globalData.redPoint && globalData.redPoint.points.length > 0)) {
                    return true
                }
                if (footHold.energy >= 2 && !this.footHoldModel.isGuessMode) {
                    return true
                }

                if (this.has_guess_redPoint()) {
                    return true
                }
            }
        }
        return false
    }

    /**??????????????? ???????????? */
    has_guess_redPoint() {
        if (this.roleModel.guildId > 0 && this.footHoldModel.guessOpened) {
            let tabs = FootHoldUtils.getGuessTabDatas()
            for (let i = 0; i < tabs.length; i++) {
                let hasRed = Boolean(this.footHoldModel.guessRedPoints & Math.pow(2, tabs[i]))
                let hasGet = Boolean(this.footHoldModel.guessRewarded & Math.pow(2, tabs[i]))
                if (hasRed && tabs[i] <= FootHoldUtils.getCurGuessRound()) {
                    if (!hasGet) {
                        return true
                    }
                }
                let dailyHasRed = Boolean(this.footHoldModel.guessRedPoints & Math.pow(2, tabs[i] + 15))
                let dailyHasGet = Boolean(this.footHoldModel.guessRewarded & Math.pow(2, tabs[i] + 15))
                if (dailyHasRed && tabs[i] <= FootHoldUtils.getCurGuessRound()) {
                    if (!dailyHasGet) {
                        return true
                    }
                }

                //???????????????
                if (FootHoldUtils.isGuessStart()
                    && !FootHoldUtils.isGuessEnd()
                    && this.footHoldModel.guessVotedId == 0
                    && this.footHoldModel.guessVotedPoints == 0
                    && this.footHoldModel.guessWinnerId == 0
                    && FootHoldUtils.getCurGuessRound() < tabs.length
                    && tabs[i] == FootHoldUtils.getCurGuessRound()) {
                    return true
                }
            }



        }
        return false
    }

    /**?????????????????? ???????????????????????? */
    has_guild_president_reward_send() {
        if (this.roleModel.guildId > 0 && GuildUtils.isCanOperate(this.roleModel.id, GuildAccess.SendFhReward)) {
            let records = this.footHoldModel.fhDropRecord
            let fullNum = 0
            for (let i = 0; i < records.length; i++) {
                let count = 0
                for (let key in records[i].goods) {
                    count += records[i].goods[key].num
                }
                if (count == 6) {
                    fullNum++
                }
            }
            if (fullNum == records.length) {
                return false
            }

            let goods = this.footHoldModel.fhDropGoods
            if (goods.length > 0) {
                let count = 0
                for (let i = 0; i < goods.length; i++) {
                    if (goods[i].count > 0) {
                        count++
                    }
                }
                return count > 0
            }
        }
        return false
    }


    /**?????????????????? ?????????????????????????????? */
    has_guild_member_reward_get() {
        if (this.roleModel.guildId > 0) {
            let footHold = ModelManager.get(FootHoldModel)
            if (footHold.fhDropReward.length > 0) {
                return true
            }
        }
        return false
    }

    /**????????? ?????????????????? */
    is_fh_coopertion_apply() {
        if (this.footHoldModel.coopApplyNum > 0) {
            return true
        }
        return false
    }


    /**??????????????????  ??????*/
    is_guild_icon_show_red_point() {
        if (!JumpUtils.ifSysOpen(2400)) {
            return false
        }

        if (this.roleModel.guildId == 0) {
            return false
        }

        //???????????? 20000  20001 20002
        let signFlags = [1, 2, 4]
        for (let i = 0; i < signFlags.length; i++) {
            if (this.has_guild_sign_reward(signFlags[i])) {
                return true
            }
        }

        //??????????????? 20014
        if (this.has_guild_worker_set()) {
            return true
        }


        //??????????????? 20017
        if (this.has_worker_money_get()) {
            return true
        }

        //?????????????????????????????? 20018
        if (this.has_foot_hold_reward(1)) {
            return true
        }

        //????????????????????? 20023
        if (this.has_guild_member_reward_get()) {
            return true
        }

        //?????????????????????????????? 20024
        if (this.has_guild_president_reward_send()) {
            return true
        }

        //??????????????????????????? 20027
        if (this.has_foot_hold_reward(2)) {
            return true
        }

        //??????boss???????????????????????? 20052
        if (this.has_guild_boss_reward_or_challenge()) {
            return true
        }

        //??????????????????????????????????????? 20160
        if (this.has_guild_power_reward_or_challenge()) {
            return true
        }

        //?????????????????? 20080
        if (this.has_guild_member_apply()) {
            return true
        }

        //?????????????????? 20096
        if (this.is_can_send_red_envelope()) {
            return true
        }

        //?????????????????? 20097
        if (this.is_can_grab_red_envelope()) {
            return true
        }

        //?????????????????????????????? 20107
        if (this.has_siege_fight_num()) {
            return true
        }

        //???????????????????????? 20110
        if (this.has_ungget_foothold_daily_task()) {
            return true
        }

        //???????????????????????? 20111
        if (this.has_ungget_foothold_rank_task()) {
            return true
        }

        //???????????????????????? 20112
        if (this.has_military_free_energy()) {
            return true
        }

        //????????????????????? 20158
        if (this.is_fh_coopertion_apply()) {
            return true
        }

        //???????????????????????? 20168
        if (this.has_expedition_task_rewards()) {
            return true
        }

        //???????????????????????? 20169
        if (this.has_expedition_army_strengthen()) {
            return true
        }

        return false
    }

    /**?????????????????????????????? */
    has_link_game_rewards() {
        if (!JumpUtils.ifSysOpen(2910)) return false;
        if (!this.activityModel.linkGameRound) return false;
        let t = ConfigManager.getItems(ComboCfg);
        let rewardType = Math.min(t[t.length - 1].reward_type, ActUtil.getActRewardType(102));
        let taskCfgs = ConfigManager.getItems(ComboCfg, (cfg: ComboCfg) => {
            if (cfg.reward_type == rewardType && cfg.rounds == this.activityModel.linkGameRound) {
                return true;
            }
        });
        for (let i = 0; i < taskCfgs.length; i++) {
            if (TaskUtil.getTaskState(taskCfgs[i].task_id) && !TaskUtil.getTaskAwardState(taskCfgs[i].task_id)) {
                return true;
            }
        }

        let lineCfgs = ConfigManager.getItems(Combo_lineCfg, (cfg: Combo_lineCfg) => {
            if (cfg.reward_type == rewardType && cfg.rounds == this.activityModel.linkGameRound) {
                return true;
            }
        });
        for (let i = 0; i < lineCfgs.length; i++) {
            let cardIds = lineCfgs[i].card_id;
            for (let j = 0; j < cardIds.length; j++) {
                let taskId = ConfigManager.getItem(ComboCfg, (cfg: ComboCfg) => {
                    if (cfg.reward_type == rewardType && cfg.rounds == this.activityModel.linkGameRound && cfg.card_id == cardIds[j]) {
                        return true;
                    }
                }).task_id;
                if (!TaskUtil.getTaskAwardState(taskId)) {
                    break;
                }
                if (j == cardIds.length - 1 && !this.activityModel.linkRewardMap[lineCfgs[i].id]) {
                    return true;
                }
            }
        }
    }

    /**??????????????????????????? */
    has_link_game_gift() {
        if (!JumpUtils.ifSysOpen(2910)) return false;
        if (!this.activityModel.linkGameRound) return false;
        if (!this.activityModel.firstInLinkGiftView) return false;
        let datas: icmsg.StorePushGift[] = this.storeModel.starGiftDatas;
        for (let i = 0; i < datas.length; i++) {
            let d = datas[i];
            let cfg = ConfigManager.getItemById(Store_pushCfg, d.giftId);
            if (cfg && cfg.event_type == 3 && d.remainNum > 0 && d.startTime + cfg.duration > GlobalUtil.getServerTime() / 1000) {
                return true;
            }
        }
    }

    /** ?????????????????????????????? */
    has_store_free_gift() {
        let cfgs: Store_giftCfg[] = [];
        let tempList = ConfigManager.getItems(Store_giftCfg);
        tempList.forEach(element => {
            if (this._checkGiftOpen(element)) {
                cfgs.push(element);
            }
        });
        let list = this.storeModel.giftBuyList;
        for (let i = 0; i < cfgs.length; i++) {
            let buyCount = 0
            for (let j = 0; j < list.length; j++) {
                if (list[j].id == cfgs[i].gift_id) {
                    buyCount = list[j].count
                    break
                }
            }
            if (cfgs[i].RMB_cost == 0 && cfgs[i].times_limit - buyCount > 0) {
                return true
            }
        }
        let types = [2, 4, 6]
        for (let index = 0; index < types.length; index++) {
            let cfgs = ConfigManager.getItemsByField(Store_giftCfg, "tab", types[index])
            for (let i = 0; i < cfgs.length; i++) {
                let giftIds = GlobalUtil.getLocal("newGiftData" + types[index]) || []
                if (giftIds.indexOf(cfgs[i].gift_id) == -1 && this._checkGiftOpen(cfgs[i])) {
                    return true
                }
            }
        }
        return false
    }

    /**????????????????????? ???????????? */
    has_siege_fight_num() {
        return this.siegeModel.canFightNum > 0
    }

    /**
     * ????????????????????????
     */
    has_Turntable_can_ten_draw() {
        //??????10????????????????????????
        // let curTime = GlobalUtil.getServerTime();
        // let tem1 = new Date(curTime / 1000)
        // let time = GlobalUtil.getLocal('turnDraw_time', true);
        // let state = false;

        // if (!time) {
        //     state = true;
        // } else {
        //     let tem2 = new Date(time / 1000)
        //     if (tem1.getDate() != tem2.getDate() || tem1.getMonth() != tem2.getMonth()) {
        //         state = true;
        //     }
        // }
        let turntableCfgs = ConfigManager.getItems(Luckydraw_turntableCfg)
        for (let i = 0; i < turntableCfgs.length; i++) {
            let cfg = turntableCfgs[i];
            let curNum = BagUtils.getItemNumById(cfg.cost[0])
            // let temNum = state ? cfg.cost[1] : cfg.cost2[1]
            // if (curNum >= temNum) {
            //     return true;
            // }
            if (curNum > 0) {
                return true
            }
        }
        return false;
    }

    /**
     * ??????????????????????????????
     * @param storeType 
     * @param ids 
     */
    is_store_item_can_buy(storeType: StoreType = 2, ids: number[]) {
        if (!JumpUtils.ifSysOpen(1702)) return false;
        let cfgs: StoreCfg[] = ConfigManager.getItems(StoreCfg, (cfg: StoreCfg) => {
            if (cfg.type == storeType && ids.indexOf(cfg.item_id) != -1) {
                return true;
            }
        });
        let list = this.storeModel.storeInfo;
        for (let i = 0; i < cfgs.length; i++) {
            let buyCount: icmsg.StoreBuyInfo = list[cfgs[i].id];
            if (!buyCount || (cfgs[i].times_limit - buyCount.count > 0)) {
                return true
            }
        }
        return false;
    }

    _checkGiftOpen(cfg: Store_giftCfg) {
        let openLv = parseInt(cfg.gift_level) || 0;
        if (cfg.open_conds) {
            let info = this.storeModel.storeInfo[cfg.open_conds];
            if (!info || info.count <= 0) {
                return false;
            }
        }
        if (cfg.cross_id && cfg.cross_id.indexOf(this.roleModel.crossId) === -1) {
            return false;
        }
        if (cfg.unlock) {
            let star = ModelManager.get(RoleModel).maxHeroStar;
            if (star < cfg.unlock) return false;
        }
        if (openLv > this.roleModel.level) {
            // ?????????????????????
            return false;
        } else if (cfg.timerule == 0) {
            // ??????????????????
            return true;
        } else {
            let timeCfg: any = cfg.restricted;
            // ?????????????????????????????????????????????????????????
            if (timeCfg.length > 0) {
                if (timeCfg[0] == 3) {
                    let startArr = timeCfg[2]
                    let endArr: any = timeCfg[3]
                    let time = GlobalUtil.getServerOpenTime() * 1000;
                    let startDate = time + (startArr[2] * 24 * 60 * 60 + startArr[3] * 60 * 60 + startArr[4] * 60) * 1000;
                    let endDate = time + (endArr[2] * 24 * 60 * 60 + endArr[3] * 60 * 60 + endArr[4] * 60) * 1000;
                    let nowDay = GlobalUtil.getServerTime();
                    if (nowDay >= startDate && nowDay <= endDate) {
                        return true;
                    }
                }
                else if (timeCfg[0] == 1) {
                    let startArr = timeCfg[2];
                    let endArr: any = timeCfg[3];
                    // let startDate = new Date(startArr[0] + '/' + startArr[1] + '/' + startArr[2] + ' ' + startArr[3] + ':' + startArr[4] + ':0')
                    // let endDate = new Date(endArr[0] + '/' + endArr[1] + '/' + endArr[2] + ' ' + endArr[3] + ':' + endArr[4] + ':0')
                    let startDate = TimerUtils.transformDate(startArr);
                    let endDate = TimerUtils.transformDate(endArr);
                    let nowDay = GlobalUtil.getServerTime();
                    if (nowDay >= startDate && nowDay <= endDate) {
                        return true;
                    }
                }
                else if (timeCfg[0] == 6) {
                    if (ActUtil.ifActOpen(timeCfg[1][0])) {
                        return true;
                    }
                }
                else if (timeCfg[0] == 7) {
                    if (JumpUtils.ifSysOpen(2856)) {
                        let model = ModelManager.get(ChampionModel);
                        if (model.infoData && model.infoData.seasonId) {
                            // let cfg: Champion_mainCfg = ConfigManager.getItemById(Champion_mainCfg, model.infoData.seasonId);
                            // if (cfg) {
                            //     let o = cfg.open_time.split('/');
                            //     let c = cfg.close_time.split('/');
                            //     let ot = new Date(o[0] + '/' + o[1] + '/' + o[2] + ' ' + o[3] + ':' + o[4] + ':' + o[5]).getTime();
                            //     let ct = new Date(c[0] + '/' + c[1] + '/' + c[2] + ' ' + c[3] + ':' + c[4] + ':' + c[5]).getTime();
                            //     let curTime = GlobalUtil.getServerTime();
                            //     if (curTime >= ot && curTime <= ct) {
                            //         return true;
                            //     }
                            // }
                            if (ActUtil.ifActOpen(122)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }


    /**??????????????????????????? */
    has_free_alchemy() {
        if (!JumpUtils.ifSysOpen(2830)) {
            return false;
        }
        let freeCfg = ConfigManager.getItemByField(Activity_alchemyCfg, "type", 1)
        let useTime = this.activityModel.alchemyTimes[0] ? this.activityModel.alchemyTimes[0] : 0
        let addTime = 0
        if (this.storeModel.isMonthCardActive(freeCfg.ex_condition)) {
            addTime += freeCfg.ex_times
        }
        if (ActUtil.getCfgByActId(37)) {
            let exTimes = ConfigManager.getItemByField(Talent_extra_chanceCfg, 'key', `alchemy_1`).value;
            addTime += exTimes
        }
        if (freeCfg.times + addTime - useTime > 0) {
            return true
        }
        return false
    }

    /**?????????????????????????????? */
    has_good_funds_reward() {
        let info = this.storeModel.goodFundsInfo
        if (info) {
            let startZero = TimerUtils.getZerohour(info.startTime)
            let rewardZero = TimerUtils.getZerohour(info.rewardTime)
            if (info && info.startTime > 0) {
                if ((startZero + 30 * 86400) > Math.floor(GlobalUtil.getServerTime() / 1000) && Math.floor(GlobalUtil.getServerTime() / 1000) > info.rewardTime) {
                    let isReward = TimerUtils.isCurDay(info.rewardTime)
                    return !isReward
                }
            }
        }
        return false
    }


    /**?????????????????????????????? */
    has_better_funds_reward() {
        let info = this.storeModel.betterFundsInfo
        if (info) {
            let startZero = TimerUtils.getZerohour(info.startTime)
            if (info && info.startTime > 0) {
                if ((startZero + 30 * 86400) > Math.floor(GlobalUtil.getServerTime() / 1000) && Math.floor(GlobalUtil.getServerTime() / 1000) > info.rewardTime) {
                    let isReward = TimerUtils.isCurDay(info.rewardTime)
                    return !isReward
                }
            }
        }
        return false
    }

    /**?????????????????????vip?????????????????????????????? */
    has_vip_daily_month_reward() {
        if (this.storeModel.isMonthCardActive(500002)) {
            if (!TimerUtils.isCurDay(this.roleModel.mcRewardTime)) {
                return true
            }
        }
        return false
    }

    /**????????????vip????????????  ????????????????????? */
    has_vip_free_gift() {
        if (!JumpUtils.ifSysOpen(2851)) {
            return false;
        }
        let cfgs = ConfigManager.getItems(VipCfg)
        let needExp = 0
        for (let i = 0; i < cfgs.length; i++) {
            if (i > 0) {
                let cfg = cfgs[i - 1]
                needExp = cfg.exp
            }
            if (this.roleModel.vipExp < needExp) {
                return false
            }
            let state = !!(this.roleModel.vipGiftBoughtFlag & Math.pow(2, i))
            if (!state) {
                return true
            }
        }
        return false
    }

    /**?????????????????????????????? */
    has_sign_recharge_reward() {
        if (!JumpUtils.ifSysOpen(1200)) {
            return false;
        }
        let signModel = ModelManager.get(SignModel)
        if (signModel.signPayAvailable) {
            return true
        }
        return false
    }

    /**???????????????????????????????????? */
    has_scoreSys_node_reward() {
        let curNode = this.taskModel.grading.boxOpened
        if (curNode == 0) {
            curNode = 1
        }
        let cfgs = ConfigManager.getItems(ScoreCfg)
        for (let i = 0; i < cfgs.length; i++) {
            let curCfg = cfgs[i]
            if (this.roleModel.badgeExp >= curCfg.exp[1] && curNode == curCfg.node) {
                return true
            }
        }
        return false
    }


    /**?????????????????????????????????????????? */
    has_scoreSys_node_item_reward() {
        let list = TaskUtil.getGradingTaskList()
        for (let index = 0; index < list.length; index++) {
            const cfg: Score_missionCfg = list[index];
            let fbId = cfg.fbId;
            let roleMode = ModelManager.get(RoleModel);
            let copyMode = ModelManager.get(CopyModel);
            let b = true;
            let level = cfg.level;
            if (level) {
                b = roleMode.level >= level;
            }
            if (fbId) {
                b = b && copyMode.lastCompleteStageId >= fbId;
            }
            //????????????
            if (!b) {
                return false
            }
            // ???????????????
            let finish = TaskUtil.getTaskState(cfg.id)
            let geted = this.taskModel.rewardIds[cfg.id] || 0
            // ???????????? 0:????????? 1:????????? 2:?????????
            let state = 1
            if (finish) {
                if (geted == 0) {
                    state = 0
                } else {
                    state = 2
                }
            }
            if (state == 0) {
                return true
            }
        }
        return false
    }

    /**??????????????????????????????????????? */
    has_better_arena_setDefence() {
        let list = this.heroModel.heroInfos
        let datas: icmsg.HeroInfo[] = []
        list.forEach(element => {
            datas.push((element.extInfo as icmsg.HeroInfo))
        });
        let ids = this.heroModel.PvpArenUpHeroList
        for (let i = 0; i < ids.length; i++) {
            if (ids[i] > 0) {
                let heroInfo = HeroUtils.getHeroInfoByHeroId(ids[i])
                if (!heroInfo) return false;
                for (let j = 0; j < datas.length; j++) {
                    if (ids.indexOf(datas[j].heroId) == -1 && heroInfo.level < datas[j].level) {
                        return true
                    }
                }
            }
        }
        return false
    }

    /**??????????????????????????? */
    has_free_store_item_buy() {
        if (!JumpUtils.ifSysOpen(1702)) return false;
        let items = ConfigManager.getItemsByField(StoreCfg, "type", 2)
        for (let i = 0; i < items.length; i++) {
            let cfg = items[i]
            if (cfg && cfg instanceof StoreCfg && cfg.type == StoreType.GEMS && cfg.money_cost[1] == 0) {
                let list = ModelManager.get(StoreModel).storeInfo;
                let buyCount: icmsg.StoreBuyInfo = list[cfg.id];
                if (!buyCount || (cfg.times_limit - buyCount.count > 0)) {
                    return true
                }
            }
        }
        return false
    }

    /**?????????????????????????????? */
    has_teach_guide_reward(type) {
        let cfgs = ConfigManager.getItemsByField(Foothold_teachingCfg, "stage", type)
        for (let i = 0; i < cfgs.length; i++) {
            if (this.footHoldModel.activityIndex < cfgs[i].order) {
                continue
            }
            let finishNum = this.footHoldModel.teachTaskEventDatas[cfgs[i].eventid] || 0
            if (finishNum > 0) {
                if (finishNum >= cfgs[i].number) {
                    return true
                }
            }
        }
        return false
    }

    /**???????????????????????? */
    has_ungget_foothold_daily_task() {
        if (this.footHoldModel.isGuessMode) {
            return false
        }
        let cfgs = ConfigManager.getItems(Foothold_dailytaskCfg)
        for (let i = 0; i < cfgs.length; i++) {
            let finish = TaskUtil.getTaskState(cfgs[i].id)
            let geted = this.taskModel.rewardIds[cfgs[i].id] || 0
            if (finish && geted == 0) {
                return true
            }
        }
        return false
    }

    /**???????????????????????? */
    has_ungget_foothold_rank_task() {
        if (this.footHoldModel.isGuessMode) {
            return false
        }
        let list = TaskUtil.getFootholdRankTaskList()
        for (let i = 0; i < list.length; i++) {
            let finish = TaskUtil.getTaskState(list[i].id)
            let geted = this.taskModel.rewardIds[list[i].id] || 0
            if (finish && geted == 0) {
                return true
            }
        }
        return false
    }

    /**?????????????????????????????? */
    has_military_free_energy() {
        if (this.footHoldModel.isGuessMode) {
            return false
        }
        let freeEnergyNum = MilitaryRankUtils.getPrivilegeCommon(MRPrivilegeType.p2, this.footHoldModel.militaryRankLv)
        if (this.footHoldModel.freeEnergy < freeEnergyNum) {
            return true
        }
        return false
    }

    /**?????????????????????????????? */
    has_guild_member_apply() {
        if (this.guildModel.applyList.length > 0) {
            return true
        }
        return false
    }

    /** */
    /** ???????????????????????????
    * @param condition
    */
    get_free_costume(condition?: any): BagItem[] {
        return BagUtils.getItemsByType(BagType.COSTUME, condition);
    }

    /**
   * ?????????????????????????????????????????????????????????
   * @param hero
   * @param item
   */
    is_can_costume_up(hero: icmsg.HeroInfo, item: BagItem): boolean {
        if (!hero) return false;
        if (!item) return false;
        let costume_star = ConfigManager.getItemById(Costume_globalCfg, "costume_star").value[0]
        if (hero.star < costume_star) {
            return false
        }
        let cfg = ConfigManager.getItemById(CostumeCfg, item.itemId);
        let costumeItem = this.get_hero_costume(hero, cfg.part);
        if (this.compare_costume(costumeItem, item, hero)) {
            return true;
        }
        return false;
    }

    /**??????????????? */
    is_can_costume_strength(hero: icmsg.HeroInfo, part) {
        if (!hero) return false

        if (!JumpUtils.ifSysOpen(2865)) {
            return false;
        }

        let upHeros = this.heroModel.PveUpHeroList
        if (upHeros.indexOf(hero.heroId) == -1) {
            return false
        }
        let costume_star = ConfigManager.getItemById(Costume_globalCfg, "costume_star").value[0]
        if (hero.star < costume_star) {
            return false
        }
        let costumeItem = this.get_hero_costume(hero, part);
        if (!costumeItem) return false
        let cfg = ConfigManager.getItemById(CostumeCfg, costumeItem.itemId);
        let extInfo = costumeItem.extInfo as icmsg.CostumeInfo
        let nextCfg = ConfigManager.getItemByField(Costume_costCfg, 'level', extInfo.level + 1)
        if ((nextCfg && !nextCfg[`cost_${cfg.color}`]) || !nextCfg) {
            return false
        }

        let hasNum = BagUtils.getItemNumById(nextCfg[`cost_${cfg.color}`][0][0]);
        if (hasNum >= nextCfg[`cost_${cfg.color}`][0][1]) {
            return true
        }
        return false
    }

    /**???????????? */
    is_can_all_costume_strength() {
        let upHeros = this.heroModel.PveUpHeroList
        for (let i = 0; i < upHeros.length; i++) {
            let heroInfo = HeroUtils.getHeroInfoByHeroId(upHeros[i])
            for (let i = 0; i < 4; i++) {
                //?????????
                if (heroInfo) {
                    if (this.is_can_costume_strength(heroInfo, i)) {
                        return true
                    }
                }
            }
        }
        return false
    }

    /**????????????????????? */
    get_hero_costume(hero: icmsg.HeroInfo, part: number) {
        if (hero) {
            if (hero.costumeIds && hero.costumeIds[part]) {
                let id = hero.costumeIds[part].id
                if (id > 0) {
                    let bagItem = {
                        series: id,
                        itemId: hero.costumeIds[part].typeId,
                        itemNum: 1,
                        type: BagType.COSTUME,
                        extInfo: hero.costumeIds[part]
                    }
                    return bagItem
                }
            }
            return null
        }
    }

    /**
    * ????????????, e2 ???????????? e1
    * @param e1
    * @param e2
    */
    compare_costume(e1: BagItem, e2: BagItem, heroInfo: icmsg.HeroInfo): boolean {
        let costumeCfg2 = ConfigManager.getItemById(CostumeCfg, e2.itemId)

        //??????????????????
        if (heroInfo) {
            let careerCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", heroInfo.careerId)
            // ????????????????????????
            if (costumeCfg2.career_type != careerCfg.career_type) {
                return false
            }
        }

        //??????????????????
        if (!e1 && e2) {
            return true
        }

        //????????????
        if (CostumeUtils.getEquipPower(e2.extInfo as icmsg.CostumeInfo) > CostumeUtils.getEquipPower(e1.extInfo as icmsg.CostumeInfo)) {
            return true
        }
        return false;
    }

    /**??????????????????/?????????????????? */
    has_costumeCustom_task_rewards() {
        if (!JumpUtils.ifSysOpen(2938)) return false;
        if (!ActUtil.ifActOpen(116)) return false;
        let rewardType = ActUtil.getActRewardType(117);
        let score = this.activityModel.costumeCustomScore;
        let progressCfgs = ConfigManager.getItemsByField(Costume_progressCfg, 'type', rewardType);
        for (let i = 0; i < progressCfgs.length; i++) {
            if (score >= progressCfgs[i].score && !this.activityModel.costumeCustomRewards[progressCfgs[i].score]) {
                return true;
            }
        }
        let tasks = ActivityUtils.getCurCostumeCustomTask();
        for (let j = 0; j < tasks.length; j++) {
            if (TaskUtil.getTaskState(tasks[j].task_id) && !TaskUtil.getTaskAwardState(tasks[j].task_id)) {
                return true;
            }
        }
    }

    /**???????????? ?????????????????? */
    has_costumeCustom_enougth_items() {
        if (!JumpUtils.ifSysOpen(2938)) return false;
        let v = ConfigManager.getItemByField(Costume_globalCfg, 'key', 'custom_item').value;
        if (BagUtils.getItemNumById(v[0]) >= v[1]) {
            return true;
        }
    }

    //???????????? ????????????????????????????????? ?????????????????????????????????
    is_luckTwist_egg_can_draw() {
        let actCfg = ActUtil.getCfgByActId(92);
        if (!actCfg) return false;
        let rewardType = ModelManager.get(ActivityModel).luckyTwistEggSubType
        let costNum = 0
        let twistCfg = ConfigManager.getItem(Twist_eggCfg, (cfg: Twist_eggCfg) => {
            if (cfg.type == rewardType && cfg.number == (ActivityUtils.getUseTwistEggTime() + 1)) return true;
        });
        if (twistCfg && twistCfg.consume && twistCfg.consume.length > 0) {
            costNum = twistCfg.consume[1]
        }
        if (this.roleModel.gems < costNum) {
            return false
        }
        let rewardCfgs = ConfigManager.getItemsByField(Twist_eggCfg, "type", rewardType)
        return this.activityModel.firstInluckyTwistEgg && ActivityUtils.getUseTwistEggTime() < rewardCfgs.length
    }


    //???????????????????????????????????? ?????????????????????????????????
    is_luckTwist_gift_can_buy() {
        let actCfg = ActUtil.getCfgByActId(92);
        if (!actCfg) return false;

        if (ActivityUtils.getTwistEggPushGiftNum() <= 0) {
            return false
        }

        return this.activityModel.firstInluckyTwistGift
    }



    /**???????????? ?????????????????? */
    is_combineIcon_show_red_point() {

        if (this.is_combine_carnival_daily_reward()) {
            return true
        }
        if (this.is_combine_carnival_ultimate_reward()) {
            return true
        }
        if (this.is_combine_carnival_score_reward()) {
            return true
        }

        return false
    }



    /**???????????? ?????? */
    is_combine_carnival_reward() {
        if (this.is_combine_carnival_daily_reward()) {
            return true
        }
        if (this.is_combine_carnival_ultimate_reward()) {
            return true
        }
        if (this.is_combine_carnival_score_reward()) {
            return true
        }
        return false
    }


    /**???????????? ?????????????????? */
    is_combine_carnival_daily_reward() {
        if (!JumpUtils.ifSysOpen(2906)) return false;
        let cfgs = ConfigManager.getItems(Combine_dailyCfg, { type: ModelManager.get(RoleModel).serverMegCount, day: CombineUtils.getCombineCarnivalDay() })
        for (let i = 0; i < cfgs.length; i++) {
            let finish = TaskUtil.getTaskState(cfgs[i].id)
            let geted = this.taskModel.rewardIds[cfgs[i].id] || 0
            if (finish && geted == 0) {
                return true
            }
        }
        return false
    }

    /**???????????? ?????????????????? */
    is_combine_carnival_ultimate_reward() {
        if (!JumpUtils.ifSysOpen(2906)) return false;
        let list = TaskUtil.getCombineUltimateTaskList()
        for (let i = 0; i < list.length; i++) {
            let finish = TaskUtil.getTaskState(list[i].id)
            let geted = this.taskModel.rewardIds[list[i].id] || 0
            if (finish && geted == 0) {
                return true
            }
        }
        return false
    }

    /**???????????? ?????????????????? */
    is_combine_carnival_score_reward() {
        if (!JumpUtils.ifSysOpen(2906)) return false;
        let combineModel = ModelManager.get(CombineModel)
        let cfgs = ConfigManager.getItems(Combine_rewardsCfg, { type: ModelManager.get(RoleModel).serverMegCount })
        if (cfgs.length == 0) {
            return false
        }
        for (let i = 0; i < 6; i++) {
            if (combineModel.playerScore >= cfgs[i].value && !combineModel.exchangeRecord[cfgs[i].id]) {
                return true
            }
        }
        return false
    }

    /**???????????????????????? */
    is_sevev_day_war_show_red_point() {
        if (!JumpUtils.ifSysOpen(2959)) return false;
        if (!this.activityModel.sevenDayWarInfo) return false

        let starTime = ActUtil.getActStartTime(138)
        let curTime = GlobalUtil.getServerTime()
        let curDay = Math.ceil((curTime - starTime) / (1000 * 86400))
        let cfgs = ConfigManager.getItems(Store_sevenday_war_giftCfg)
        for (let i = 0; i < cfgs.length; i++) {
            if (i + 1 > curDay) {
                break
            }
            if (Math.pow(2, (i + 1)) & this.activityModel.sevenDayWarInfo.stage) {
                if (!(Math.pow(2, (i + 1)) & this.activityModel.sevenDayWarInfo.reward)) {
                    return true
                }
            } else {
                return true
            }
        }
        return false
    }

    /**???????????????*/
    is_mystery_view_reward() {
        if (!JumpUtils.ifSysOpen(2952)) return false;
        let actType = ActUtil.getActRewardType(131);
        // let cfg = ConfigManager.getItemByField(Activity_mysteriousCfg, 'type', actType, { 'index': 1 });
        // let total = this.activityModel.mysteryVisitorTotal;
        // let old = this.activityModel.mysteryVisitorState
        // if (cfg.money <= total && (old & 1 << 0) <= 0) {
        //     return true;
        // }
        return false;
    }

    /**????????????*/
    is_mysteryVisitor_view1_reward() {
        if (!JumpUtils.ifSysOpen(2951)) return false;
        let actType = ActUtil.getActRewardType(132)
        let cfg = ConfigManager.getItemByField(Activity_mysteriousCfg, 'type', actType, { 'index': 1 });
        let total = this.activityModel.mysteryVisitorTotal;
        let old = this.activityModel.mysteryVisitorState
        if (cfg.money <= total && (old & 1 << 0) <= 0) {
            return true;
        }
        return false;
    }

    /**???????????? */
    is_mysteryVisitor_view2_reward() {
        if (!JumpUtils.ifSysOpen(2953)) return false;
        let actType = ActUtil.getActRewardType(132)
        let cfgs = ConfigManager.getItems(Activity_mysteriousCfg, (cfg) => {
            if (cfg.type == actType && cfg.index > 1) {
                return true;
            }
        });
        let total = this.activityModel.mysteryVisitorTotal;
        let old = this.activityModel.mysteryVisitorState
        for (let i = 0, n = cfgs.length; i < n; i++) {
            let cfg = cfgs[i];
            if (cfg.money <= total && (old & 1 << cfg.index - 1) <= 0) {
                return true;
            }
        }
        return false;
    }


    //???????????????????????????????????????????????????
    is_royalArena_set_defence() {
        let type = ActUtil.getActRewardType(133)
        let hasShow = GlobalUtil.getLocal(`royal_set_defence#${type}`) || false
        return !hasShow
    }

    //?????????????????????????????????
    is_royalArena_rank_reward() {
        let cfgs = ConfigManager.getItems(Royal_divisionCfg, (cfg: Royal_divisionCfg) => {
            if (cfg.rewards && cfg.rewards.length > 0) {
                return true
            }
            return false;
        })
        let model = ModelManager.get(RoyalModel)
        for (let i = 0; i < cfgs.length; i++) {
            if (model.score >= cfgs[i].point && !(model.divFlag & Math.pow(2, cfgs[i].division - 1))) {
                return true
            }
        }
        return false
    }



    /**
     * ???????????????
     * @param a
     * @param index
     */
    get_from_array(a: any[], index: number) {
        return a[index];
    }

    /**
     * ????????????, e2 ???????????? e1
     * @param e1
     * @param e2
     */
    compare_equip(e1: BagItem, e2: BagItem, heroInfo: icmsg.HeroInfo): boolean {
        let equipCfg2 = ConfigManager.getItemById(Item_equipCfg, e2.itemId)
        //??????????????????
        if (!e1 && e2) {
            return true
        }
        //??????????????????
        // if (heroInfo) {
        //     let careerCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", heroInfo.careerId)
        //     // ????????????????????????
        //     if (equipCfg2.career_type.indexOf(careerCfg.career_type) == -1) {
        //         return false
        //     }
        // }
        let equipCfg1 = ConfigManager.getItemById(Item_equipCfg, e1.itemId)
        //??????????????????????????????????????????????????????????????????????????????????????????
        if (equipCfg2.color > equipCfg1.color || (equipCfg2.color == equipCfg1.color && equipCfg2.star > equipCfg1.star)) {
            return true
        }
        // let power1 = GlobalUtil.getEquipPower(e1)
        // let power2 = GlobalUtil.getEquipPower(e2)
        // if (power2 > power1) {
        //     //????????????
        //     if (equipCfg2.color > equipCfg1.color) {
        //         return true;
        //     }
        //     return true
        // }
        return false;
    }

    /**
     * a????????????item????????????
     * @param item
     * @param a
     * @param type ?????????????????????|??????|?????????
     */
    has_higher(item: any, a: any[], type: string, heroInfo: icmsg.HeroInfo): boolean {
        let func: Function = this['compare_' + type];
        for (let i = 0, n = a.length; i < n; i++) {
            if (func(item, a[i], heroInfo)) {
                return true;
            }
        }
        return false;
    }

    /**
     * a????????????item????????????
     * @param item
     * @param a
     * @param type
     */
    has_lower(item: any, a: any[], type: string, heroInfo: icmsg.HeroInfo): boolean {
        let func: Function = this['compare_' + type];
        for (let i = 0, n = a.length; i < n; i++) {
            if (!func(item, a[i], heroInfo)) {
                return true;
            }
        }
        return false;
    }

    /**
     * ?????????????????????????????????????????????????????????????????????true?????????true
     * @param a
     * @param func
     * @param args
     */
    each_or(a: any[], func?: Function, ...args: any[]) {
        for (let i = 0, n = a.length; i < n; i++) {
            if (func(...args, a[i])) {
                // ????????????true?????????????????????true
                return true;
            }
        }
        return false;
    }

    /**
     * ????????????????????????????????????????????????????????????true??????????????????true
     * @param a
     * @param func
     * @param args
     */
    each_and(a: any[], func?: Function, ...args: any[]) {
        let n = a.length;
        // ????????????????????????0???????????????false
        if (n == 0) return false;
        for (let i = 0; i < n; i++) {
            if (!func(...args, a[i])) {
                // ????????????false?????????????????????false
                return false;
            }
        }
        return true;
    }

    /**
     * ????????????????????????
     * @param key
     * @param v
     */
    save_state(key: string, v: boolean) {
        if (v) {
            // _temp[key] = true;
            this.redPointModel.tempState[key] = true
        } else {
            // delete _temp[key];
            delete this.redPointModel.tempState[key]
        }
        gdk.e.emit(RedPointEvent.RED_POINT_STATUS_UPDATE);
    }

    /**
     * ???????????????key?????????????????????
     * @param key
     */
    is_not_in_state(key: string): boolean {
        // return _temp[key] ? false : true;
        return this.redPointModel.tempState[key] ? false : true
    }

    /**
     * ???????????????key??????????????????
     * @param key
     */
    is_in_state(key: string): boolean {
        // return _temp[key] ? true : false;
        return this.redPointModel.tempState[key] ? true : false
    }

    get temp(): StoreValue {
        // return _temp
        return this.redPointModel.tempState
    }

    /**
     * ?????????????????????
     * @param andIds
     * @param orIds
     */
    eval_expr(andIds: number[], orIds: number[]): boolean {
        let b: boolean = true;
        // ?????????????????????
        let n = andIds ? andIds.length : 0;
        if (n > 0) {
            for (let i = 0; i < n; i++) {
                b = b && this._eval(andIds[i]);
                // ????????????????????????
                if (!b) {
                    return b;
                }
            }
        }
        // ?????????????????????
        n = orIds ? orIds.length : 0;
        if (n > 0) {
            let b2: boolean = false;
            for (let i = 0; i < n; i++) {
                b2 = b2 || this._eval(orIds[i]);
                // ????????????????????????
                if (b2) {
                    break;
                }
            }
            // ??????????????????????????????????????????
            return b2;
        }
        return b;
    }

    /**
     * ????????????id????????????
     * @param id
     */
    _eval(id: number): boolean {
        // ????????????????????????
        let cfg = ConfigManager.getItemById(Common_red_pointCfg, id);
        if (!cfg) return false;   // ???????????????
        let key: string = cfg.expr;
        if (!key || key == '') return true; // ???????????????
        let expr: any = gdk.Cache.get(key);
        if (!expr) {
            expr = gdk.math.parse(key).compile();
        }
        // ??????????????????
        let s: any = Object['assign']({}, cfg);// cc.js.mixin(this, cfg);
        s['__proto__'] = this;
        // // ????????????????????????
        // Object.keys(cfg).forEach(n => {
        //     delete s[n];
        // });
        // // ???????????????????????????
        // for (let i = 1; ; i++) {
        //     let n = 'TEMP' + i;
        //     if (n in s) {
        //         delete s[n];
        //     } else {
        //         break;
        //     }
        // }
        // ????????????
        let r: any = expr.eval(s);
        if (r && typeof r === 'object') {
            r = r.entries[0];
        }
        gdk.Cache.put(key, expr, NaN);
        return !!r;
    }
};

// ??????????????????this
let RedPointUtils = gdk.Tool.getSingleton(RedPointUtilsClass);
for (let name in RedPointUtils) {
    let prop = RedPointUtils[name];
    if (typeof prop === 'function') {
        RedPointUtils[name] = prop.bind(RedPointUtils);
    }
}
export { RedPointEvent };
export default RedPointUtils;