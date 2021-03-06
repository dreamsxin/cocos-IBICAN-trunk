import ActivityMainViewCtrl from '../../view/act/ctrl/ActivityMainViewCtrl';
import ActUtil from '../../view/act/util/ActUtil';
import ArenaHonorUtils from '../../view/arenahonor/utils/ArenaHonorUtils';
import ChampionModel from '../../view/champion/model/ChampionModel';
import CombineMainViewCtrl from '../../view/combine/ctrl/CombineMainViewCtrl';
import ConfigManager from '../managers/ConfigManager';
import CopyModel from '../models/CopyModel';
import CopyUtil from './CopyUtil';
import DoomsDayModel from '../../view/instance/model/DoomsDayModel';
import EnterStageViewCtrl from '../../view/map/ctrl/EnterStageViewCtrl';
import ExpeditionHeroDetailViewCtrl from '../../view/guild/ctrl/expedition/army/ExpeditionHeroDetailViewCtrl';
import FootHoldModel from '../../view/guild/ctrl/footHold/FootHoldModel';
import FootHoldUtils from '../../view/guild/ctrl/footHold/FootHoldUtils';
import FriendViewCtrl from '../../view/friend/ctrl/FriendViewCtrl';
import GeneView from '../../view/lottery/ctrl/gene/GeneViewCtrl';
import GlobalUtil from './GlobalUtil';
import GuardianTowerModel from '../../view/act/model/GuardianTowerModel';
import GuideUtil from './GuideUtil';
import GuildMainCtrl from '../../view/guild/ctrl/GuildMainCtrl';
import GuildUtils from '../../view/guild/utils/GuildUtils';
import HeroModel from '../models/HeroModel';
import InstanceModel, { InstanceData } from '../../view/instance/model/InstanceModel';
import LotteryViewCtrl from '../../view/lottery/ctrl/LotteryViewCtrl';
import MathUtil from './MathUtil';
import ModelManager from '../managers/ModelManager';
import NetManager from '../managers/NetManager';
import PanelId from '../../configs/ids/PanelId';
import PiecesModel from '../models/PiecesModel';
import PveFsmEventId from '../../view/pve/enum/PveFsmEventId';
import PveLittleGameModel from '../../view/pve/model/PveLittleGameModel';
import PveReplayCtrl from '../../view/pve/ctrl/PveReplayCtrl';
import PveSceneCtrl from '../../view/pve/ctrl/PveSceneCtrl';
import PveSceneModel from '../../view/pve/model/PveSceneModel';
import RechargeLBCtrl from '../../view/store/ctrl/recharge/RechargeLBCtrl';
import RedPointUtils from './RedPointUtils';
import RelicModel from '../../view/relic/model/RelicModel';
import RelicUtils from '../../view/relic/utils/RelicUtils';
import RoleModel from '../models/RoleModel';
import RoleViewCtrl2 from '../../view/role/ctrl2/main/RoleViewCtrl2';
import RoyalModel from '../models/RoyalModel';
import SdkTool from '../../sdk/SdkTool';
import StoreModel from '../../view/store/model/StoreModel';
import StoreViewCtrl from '../../view/store/ctrl/StoreViewCtrl';
import SupportMainViewCtrl from '../../view/resonating/ctrl/SupportMainViewCtrl';
import TaskModel from '../../view/task/model/TaskModel';
import TimerUtils from './TimerUtils';
import WorldHonorUtils from '../../view/worldhonor/utils/WorldHonorUtils';
import WorldMapViewCtrl from '../../view/map/ctrl/WorldMapViewCtrl';
import {
    Arenahonor_progressCfg,
    Arenahonor_worldwideCfg,
    Champion_mainCfg,
    Copy_stageCfg,
    General_weaponCfg,
    Hero_careerCfg,
    Little_game_globalCfg,
    LuckydrawCfg,
    MainInterface_sort_1Cfg,
    MainInterface_sort_2Cfg,
    MainInterface_sortCfg,
    Pieces_initialCfg,
    Pieces_power1Cfg,
    Pieces_power2Cfg,
    Pve_bossbornCfg,
    Royal_sceneCfg,
    Store_first_payCfg,
    SystemCfg
    } from '../../a/config';
import { CopyType } from './../models/CopyModel';
import { GlobalCfg } from './../../a/config';
import { StageState } from '../../view/map/ctrl/CityStageItemCtrl';
import CityMapViewCtrl from '../../view/map/ctrl/CityMapViewCtrl ';

/**
 * @Description: ????????????????????????
 * @Author: weiliang.huang
 * @Last Modified by: jiangping
 * @Last Modified time: 2020-10-12 20:58:51
 * @Last Modified time: 2021-10-15 13:32:24
 */

class JumpUtilsClass {

    /**
     * ??????????????????????????????
     * @param sysId ??????id
     * @param showTips ????????????,??????????????????
     * @param isByAct  ????????????????????????
     */
    ifSysOpen(sysId: number, showTips: boolean = false, isByAct: boolean = true) {
        let cfg = ConfigManager.getItemById(SystemCfg, sysId);
        if (!cfg) {
            return true;
        }
        // ????????????
        if (cfg.platform && cfg.platform != '') {
            let ret = cfg.platform.split(',').some(p => {
                switch (p) {
                    case 'wx':
                        return cc.sys.platform === cc.sys.WECHAT_GAME;

                    case 'h5':
                        return cc.sys.isBrowser;

                    case 'ios':
                        return cc.sys.isNative;
                }
                return false;
            });
            if (!ret) {
                return false;
            }
        }
        // ?????????????????????
        let model = ModelManager.get(RoleModel);
        if (model.level < cfg.openLv) {
            // ??????????????????
            if (showTips) {
                let text = "???????????????" + "@level?????????";
                text = text.replace("@level", `${cfg.openLv}`);
                GlobalUtil.showMessageAndSound(text);
            }
            return false;
        }
        // ?????????????????????
        if (cc.js.isNumber(cfg.fbId) && cfg.fbId > 0 && !CopyUtil.isFbPassedById(cfg.fbId)) {
            // ??????????????????
            if (showTips) {
                let text = GlobalUtil.getSysFbLimitStr(cfg.fbId);
                GlobalUtil.showMessageAndSound(text);
            }
            return false;
        }
        // ????????????
        if (cfg.heroStar instanceof Array) {
            let num = Math.max(cfg.heroStar[1], 1);
            let list = ModelManager.get(HeroModel).heroInfos;
            for (let i = 0, n = list.length; i < n; i++) {
                let info = list[i].extInfo as icmsg.HeroInfo;
                if (info.star >= cfg.heroStar[0]) {
                    // if (--num <= 0) {
                    //     return true;
                    // }
                    num--;
                }
            }
            if (num > 0) {
                if (showTips) {
                    let text = `??????${cfg.heroStar[0]}??????????????????`;
                    GlobalUtil.showMessageAndSound(text);
                }
                return false;
            }
        }
        // VIP????????????
        if (cc.js.isNumber(cfg.vip) && cfg.vip > 0 && ModelManager.get(RoleModel).vipLv < cfg.vip) {
            if (showTips) {
                let text = `vip????????????${cfg.vip}?????????`;
                GlobalUtil.showMessageAndSound(text);
            }
            return false;
        }
        // ????????????????????? ??????????????????
        if (isByAct && cc.js.isNumber(cfg.activity) && cfg.activity > 0 && !ActUtil.ifActOpen(cfg.activity)) {
            if (showTips) {
                let text = '???????????????';
                let nextStartTime = ActUtil.getNextActStartTime(cfg.activity);
                if (nextStartTime) {
                    let nowTime = GlobalUtil.getServerTime();
                    let time1 = TimerUtils.format6((nextStartTime - nowTime) / 1000)
                    text = `??????${time1}?????????`;
                }
                GlobalUtil.showMessageAndSound(text);
            }
            return false;
        }

        return true;
    }

    /**
     * ????????????id??????????????????
     * @param sysId
     */
    openView(sysId: number, showTips: boolean = true) {
        let cfg = ConfigManager.getItemById(SystemCfg, sysId)
        if (!cfg) {
            return false
        }
        if (!this.ifSysOpen(sysId, showTips)) {
            return false
        }
        let handle = cfg.handle
        if (this[handle]) {
            this[handle].call(this, cfg.params)
        }
        return true
    }

    /**????????????????????? */
    showGuideMask() {
        let ctrl = GuideUtil.guideCtrl
        if (ctrl) {
            let comp = ctrl.getComponent(cc.BlockInputEvents)
            if (comp) {
                comp.enabled = true
            } else {
                ctrl.addComponent(cc.BlockInputEvents)
            }
        }
    }

    /**????????????????????? */
    hideGuideMask() {
        let ctrl = GuideUtil.guideCtrl
        if (ctrl) {
            let comp = ctrl.getComponent(cc.BlockInputEvents)
            if (comp && comp.enabled) {
                comp.enabled = false;
            }
        }
    }

    /**
     * ??????????????????
     */
    openBingYing(params: any[] = []) {
        // gdk.panel.open(PanelId.BYView)
        gdk.panel.open(PanelId.BYMainView);
    }

    /**
     * ????????????
     */
    openInstance(params: number[] | number) {
        let statgeId = params instanceof Array ? params[0] : params;
        let stageCfg = CopyUtil.getStageConfig(statgeId);
        if (!stageCfg) {
            cc.error(`????????? id: ${statgeId} ???????????????`);
            return;
        }
        switch (stageCfg.copy_id) {
            case 1:
            case 7:
                // ?????????????????????
                this.openInstancePvePanel(params);
                break;

            default:
                switch (stageCfg.type_pk) {
                    case 'pve':
                    case 'pve_fun':
                        // ???????????????
                        this.openInstancePvePanel(params);
                        break;

                    case 'pvp':
                        // this.openPanel({
                        //     panelId: PanelId.InstancePVPReadyView,
                        //     panelArgs: { args: stageCfg },
                        // });
                        gdk.panel.open(PanelId.RoleSetUpHeroSelector, null, null, { args: 1 });
                        break;
                }
                break;
        }
    }

    /**????????????????????????,???????????????????????? */
    openMainPvePanel(params: number[] | number, callback?: () => void, thisArg?: any) {
        let statgeId = params instanceof Array ? params[0] : params;
        if (!CopyUtil.isStageEnterable(statgeId)) {
            return this.openPvePanelLastStage();
        }
        this.openInstancePvePanel(statgeId, callback, thisArg);
    }

    /**????????????PVE??????????????????,???????????????????????? */
    openInstancePvePanel(params: number[] | number, callback?: () => void, thisArg?: any) {
        let statgeId = params instanceof Array ? params[0] : params;
        let panel = gdk.panel.get(PanelId.PveScene);
        if (panel && panel.activeInHierarchy) {
            let model = panel.getComponent(PveSceneCtrl).model;
            if (model.id != statgeId) {
                let fsmc = panel.getComponent(gdk.fsm.FsmComponent);
                if (fsmc) {
                    model.id = statgeId;
                    fsmc.fsm.broadcastEvent(PveFsmEventId.PVE_SCENE_REINIT);
                }
            }
            callback && callback.call(thisArg);
        } else {
            this.openPanel({
                panelId: PanelId.PveScene,
                callback: callback ? () => {
                    callback.call(thisArg);
                } : null,
                currId: gdk.gui.getCurrentView(),
                blockInput: true,
                panelArgs: { args: statgeId },
            });
        }
    }

    /**????????????????????????,?????????????????????????????? */
    openPvePanelLastStage() {
        let lastStageId = ModelManager.get(CopyModel).latelyStageId;
        let cfg = ConfigManager.getItemById(Copy_stageCfg, lastStageId);
        let roleLv = ModelManager.get(RoleModel).level;
        if (roleLv < cfg.player_lv) {
            gdk.gui.showMessage(`?????????????????????${cfg.player_lv}??????????????????`);
            return;
        }
        this.openMainPvePanel(lastStageId);
    }

    /**?????????????????? */
    openBountyInstance(mission: icmsg.BountyMission, callback?: () => void, thisArg?: any) {
        let model = new PveSceneModel();
        model.isBounty = true;
        model.bountyMission = mission;
        this.openPanel({
            panelId: PanelId.PveScene,
            callback: callback ? () => {
                callback.call(thisArg);
            } : null,
            currId: gdk.gui.getCurrentView(),
            blockInput: true,
            panelArgs: {
                args: model,
            },
        });
    }

    /**
     * ???????????????????????????
     * @param params ??????????????????????????????
     */
    openInstancePanel(params: number[] = []) {
        // let panel = gdk.panel.get(PanelId.Instance)
        // if (panel) {
        //     if (params && params.length > 0) {
        //         let comp = panel.getComponent(InstanceViewCtrl);
        //         comp.autoStageid = params[0];
        //     }
        //     return
        // }
        // gdk.panel.open(PanelId.Instance, (node: cc.Node) => {
        //     if (params && params.length > 0) {
        //         let comp = node.getComponent(InstanceViewCtrl);
        //         comp.autoStageid = params[0];
        //     }
        // })

        if (params && params.length > 0) {
            let model: InstanceModel = ModelManager.get(InstanceModel);
            let temp: InstanceData = model.instanceInfos[params[0]][0];
            gdk.panel.setArgs(PanelId.Instance, temp);
        }
        gdk.panel.open(PanelId.Instance);
    }

    openEnergyStation() {
        // gdk.panel.open(PanelId.EnergyStationView);
        this.openSupportView([3]);
    }

    /**
     * ??????????????????
     * @param params
     */
    openSCXLInstancePanel(params: number[] = []) {
        this.openInstancePanel([CopyType.Survival]);
    }

    /**
     * ??????????????????
     * @param params 
     */
    openDoomsdayInstancecPanel(params: number[] = []) {
        let doomsDayModel = ModelManager.get(DoomsDayModel)
        if (params && params.length > 0) {
            doomsDayModel.curIndex = params[0]
        }
        let model: InstanceModel = ModelManager.get(InstanceModel);
        let temp: InstanceData = model.instanceInfos[CopyType.DoomsDay][0];
        gdk.panel.setArgs(PanelId.Instance, temp);
        gdk.panel.open(PanelId.Instance);
    }

    /**
     * ???????????????
     */
    openVaultEnterView() {
        gdk.panel.open(PanelId.VaultEnterView);
    }

    /**
     * ???????????? ???
     * @param params 
     */
    openTowerCopyPanel(params: number[] = []) {
        gdk.panel.open(PanelId.TowerPanel);
    }
    /**
     * ??????????????????
     * @param params 
     */
    openEternalCopyPanel(params: number[] = []) {
        gdk.panel.open(PanelId.EternalCopyView);
    }

    /**
     * ???????????????????????? 
     * @param params 0:[exp ??????   job ??????  equip ??????], ...openRolePanel??????
     */
    openRolePanel(params: any[]) {
        // ??????????????????????????????
        if (!params || params.length == 0) {
            gdk.panel.open(PanelId.Role2);
            return;
        }
        let model = ModelManager.get(HeroModel);
        let heroInfos = model.heroInfos;
        GlobalUtil.sortArray(heroInfos, (a, b) => {
            return (<icmsg.HeroInfo>b.extInfo).power - (<icmsg.HeroInfo>a.extInfo).power
        })
        let n = heroInfos.length;
        if (n > 0) {
            params = params.concat();
            let type: string = params.shift();
            let info = heroInfos[0].extInfo as icmsg.HeroInfo;
            let heroId: number = params[1];
            let i = heroId > 0 ? 0 : 1;
            for (; i < n; i++) {
                let item = heroInfos[i].extInfo as icmsg.HeroInfo;
                // ?????????????????????id
                if (heroId > 0 && heroId != item.typeId) {
                    continue;
                }
                let found = false;
                switch (type) {
                    case 'exp':
                        // ???????????????
                        found = RedPointUtils.is_can_hero_upgrade(item);
                        break;

                    case 'job':
                        // ????????????????????????
                        found = RedPointUtils.is_can_job_up(item);
                        //found = true//????????????
                        break;
                    case 'equip':
                        // ????????????????????????????????????????????????????????????
                        // found = item.equips[0] === void 0 || item.equips[0] <= 0;
                        break;

                    case 'star':
                        // ???????????????
                        found = RedPointUtils.is_can_star_up(item);
                        break;

                    case 'soldier':
                        // ??????
                        found = RedPointUtils.is_can_soldier_change(item);
                        break;

                    default:
                        found = true;
                        break;
                }
                if (found) {
                    info = item;
                    break;
                }
            }
            // ????????????????????????
            if (model.curHeroInfo !== info) {
                model.curHeroInfo = info;
            }
            // ????????????????????????
            let node = gdk.panel.get(PanelId.RoleView2);
            gdk.panel.setArgs(PanelId.RoleView2, ...params);
            if (node) {
                // ?????????????????????????????????????????????
                let role = node.getComponent(RoleViewCtrl2);
                if (role) {
                    role.scheduleOnce(role.checkArgs, 0);
                }
            } else {
                gdk.panel.open(PanelId.RoleView2);
            }
        }
    }

    openEquipMerge(params: number[]) {
        if (params && params.length > 0) {
            gdk.panel.setArgs(PanelId.EquipView2, params)
            gdk.panel.open(PanelId.EquipView2)
            return
        }
        gdk.panel.open(PanelId.EquipView2)
    }


    /**???????????????????????? ???????????? 
     * 0:???????????? 
     * 1.???????????? 
     * 2.???????????? 
     * 3.???????????? 
     * 4 ???????????? 
     * 5 ????????????
     * 
    */
    openSubRoleView(params: any[]) {
        let index = 0
        if (params && params.length > 0) {
            index = params[0]
        }
        let node = gdk.panel.get(PanelId.RoleView2)
        if (node) {
            let ctrl = node.getComponent(RoleViewCtrl2)
            ctrl.selectFunc(null, index)
        }
    }

    /**?????????????????? ??????????????????
     * ??????????????????????????????????????????????????????
     * 
    */
    openRoleCareerUp(params: any[]) {
        let type = params[0]
        let model = ModelManager.get(HeroModel);
        let heroInfos = model.heroInfos;
        GlobalUtil.sortArray(heroInfos, (a, b) => {
            return (<icmsg.HeroInfo>b.extInfo).power - (<icmsg.HeroInfo>a.extInfo).power
        })
        let heroInfo = null
        for (let i = 0; i < heroInfos.length; i++) {
            let info = <icmsg.HeroInfo>heroInfos[i].extInfo
            let cfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", info.careerId)
            if (cfg.career_type == type) {
                heroInfo = info
                break
            }
        }
        if (heroInfo) {
            model.curHeroInfo = heroInfo
            // ????????????????????????
            let node = gdk.panel.get(PanelId.RoleView2);
            gdk.panel.setArgs(PanelId.RoleView2, [2]);
            if (node) {
                // ?????????????????????????????????????????????
                let role = node.getComponent(RoleViewCtrl2);
                if (role) {
                    role.scheduleOnce(role.checkArgs, 0);
                }
            } else {
                gdk.panel.open(PanelId.RoleView2);
            }
        } else {
            gdk.panel.open(PanelId.Role2);
        }

    }

    /**?????????????????? */
    openEquipPanel(params: any[] = []) {
        // params.unshift(2);
        // this.openRolePanel(params);
        let model = ModelManager.get(HeroModel);
        let heroInfos = model.heroInfos;
        let hasEquip = false
        for (let i = 0; i < heroInfos.length; i++) {
            let info = <icmsg.HeroInfo>heroInfos[i].extInfo
            let equipItem = null
            // if (info.equips.length > 0) {
            //     for (let j = 0; j < info.equips.length; j++) {
            //         equipItem = EquipUtils.getEquipData(info.equips[j])
            //         if (equipItem) {
            //             model.curEquip = equipItem
            //             model.curHeroInfo = info
            //             hasEquip = true
            //             break
            //         }
            //     }
            // }
        }
        if (hasEquip) {
            let self = this
            gdk.panel.open(PanelId.RoleView2, () => {
                gdk.panel.setArgs(PanelId.EquipView2, params)
                self.openPanel({
                    panelId: PanelId.EquipView2,
                    currId: PanelId.RoleView2,
                });
            });
        } else {
            gdk.panel.open(PanelId.Role2)
        }
    }

    /**
     * ????????????id??????????????????
     * @param id 
     * @param params 
     */
    openEquipPanelById(id: number, params?: any[]) {
        // ??????????????????????????????
        let model = ModelManager.get(HeroModel);
        let heroBagItems = model.heroInfos;
        let info;
        heroBagItems.forEach((heroInfo, idx) => {
            let h_info = heroInfo.extInfo as icmsg.HeroInfo;
            if (id == heroInfo.series) {
                info = h_info;
            }
        });
        if (!info) return;
        model.curHeroInfo = info;
        // ????????????????????????
        let node = gdk.panel.get(PanelId.RoleView2);
        params && gdk.panel.setArgs(PanelId.RoleView2, ...params);
        if (node) {
            // ?????????????????????????????????????????????
            let role = node.getComponent(RoleViewCtrl2);
            if (role) {
                role.scheduleOnce(role.checkArgs, 0);
            }
        } else {
            // ?????????????????????????????????????????????
            gdk.panel.open(PanelId.RoleView2);
        }
    }

    //????????????????????????
    openHeroTrialView(params: any[] = []) {
        //gdk.panel.open(PanelId.HeroTrialActionView);
        this.openActivityMain(8);
    }

    /**?????????????????? */
    oneKeyFunc() {
        let fsm = gdk.fsm.Fsm.getByName("FSM-PVE-SCENE")
        if (fsm) {
            // let model = PveSceneModel.get()
            // let cur: number = model.heros.length;
            // let max: number = model.towers.length - cur;
            // if (max < 1) {
            //     // ?????????????????????????????????
            //     return
            // }
            fsm.sendEvent(PveFsmEventId.PVE_SCENE_ONE_KEY_NOTIP);
        }
    }

    /**??????????????????????????? */
    pveSceneOneKeyStart(params: any[]) {
        let fsm = gdk.fsm.Fsm.getByName("FSM-PVE-SCENE");
        if (fsm) {
            fsm.broadcastEvent(PveFsmEventId.PVE_SCENE_ONE_KEY_FIGHT);
        }
    }

    /**?????????????????????????????????????????? */
    pveSceneQuickStart(params: any[]) {
        let fsm = gdk.fsm.Fsm.getByName("FSM-PVE-SCENE")
        if (fsm) {
            fsm.broadcastEvent(PveFsmEventId.PVE_SCENE_QUICK_FIGHT);
        }
    }

    /** ???????????? */
    pveSceneStart(params: any[]) {
        let fsm = gdk.fsm.Fsm.getByName("FSM-PVE-SCENE")
        if (fsm) {
            fsm.sendEvent(PveFsmEventId.PVE_SCENE_FIGHT);
        }
    }

    /**???????????? */
    pauseFight() {
        let node = gdk.panel.get(PanelId.PveScene);
        if (node) {
            let panel = node.getComponent(PveSceneCtrl);
            if (panel) {
                let model = panel.model;
                if (model.timeScale > 0) {
                    model['__pve_fight_time_scale__'] = model.timeScale;
                    model.timeScale = 0.0;
                }
            }
        }
    }

    /**???????????? */
    resumeFight() {
        let node = gdk.panel.get(PanelId.PveScene);
        if (node) {
            let panel = node.getComponent(PveSceneCtrl);
            if (panel) {
                let model = panel.model;
                let timeScale = model['__pve_fight_time_scale__'];
                if (cc.js.isNumber(timeScale) && timeScale > 0) {
                    model.timeScale = timeScale;
                    delete model['__pve_fight_time_scale__'];
                }
            }
        }
    }


    //???????????????????????????
    openMysteryView(param: any) {
        if (!this.ifSysOpen(2951, true)) {
            return;
        }
        let index = 0;
        if (param) {
            if (param instanceof Array) index = param[0];
            else index = param;
        }
        gdk.panel.setArgs(PanelId.MysteryVisitorActivityMainView, index);
        gdk.panel.open(PanelId.MysteryVisitorActivityMainView);
    }

    openRelicMapView() {
        gdk.panel.open(PanelId.RelicMapView);
    }

    openRelicMainView() {
        gdk.panel.open(PanelId.RelicMainView);
    }

    /**???????????? */
    openTavern() {
        gdk.panel.open(PanelId.TavernPanel);
    }

    /**
     * ????????????????????????
     * @param param systemId
     */
    openWonderfulActivityView(param: any) {
        let sysId;
        if (param) {
            if (param instanceof Array) sysId = param[0];
            else sysId = param;
        }
        if (!sysId) {
            let cfgs = ConfigManager.getItems(MainInterface_sort_1Cfg);
            cfgs.sort((a, b) => {
                return a.sorting - b.sorting;
            });
            for (let i = 0; i < cfgs.length; i++) {
                if (!cfgs[i].hidden && this.ifSysOpen(cfgs[i].systemid)) {
                    sysId = cfgs[i].systemid;
                    break;
                }
            }
        }
        gdk.panel.setArgs(PanelId.WonderfulActivityView, sysId);
        gdk.panel.open(PanelId.WonderfulActivityView);
    }

    openLoginReward() {
        // let sysIds = [2810];
        // let panelIds = [PanelId.TotalLoginView]
        // for (let i = 0; i < sysIds.length; i++) {
        //     if (this.ifSysOpen(sysIds[i])) {
        //         gdk.panel.open(panelIds[i]);
        //         return;
        //     }
        // }
        gdk.panel.open(PanelId.TotalLoginView);
    }

    openMagicView() {
        let sysIds = [2827];
        let panelIds = [PanelId.SubMagicExchange]
        for (let i = 0; i < sysIds.length; i++) {
            if (this.ifSysOpen(sysIds[i])) {
                gdk.panel.open(panelIds[i]);
                return;
            }
        }
    }

    /**
     * ??????????????????
     * @param param MainInterface_sort???  id??????
     */
    openActivityMain(param: any) {
        let idx;
        if (param) {
            if (param instanceof Array) idx = param[0];
            else idx = param;
        }
        if (!idx) {
            let cfgs = ConfigManager.getItems(MainInterface_sortCfg);
            cfgs.sort((a, b) => { return a.sorting - b.sorting; });
            for (let i = 0; i < cfgs.length; i++) {
                if (this.ifSysOpen(cfgs[i].systemid)) {
                    idx = cfgs[i].id;
                    break;
                }
            }
        }
        if (gdk.panel.isOpenOrOpening(PanelId.ActivityMainView)) {
            let panel = gdk.panel.get(PanelId.ActivityMainView);
            if (panel) {
                let ctrl = panel.getComponent(ActivityMainViewCtrl);
                ctrl.selectPageById(idx);
            }
            else {
                gdk.panel.setArgs(PanelId.ActivityMainView, idx);
            }
        }
        else {
            gdk.panel.setArgs(PanelId.ActivityMainView, idx);
            gdk.panel.open(PanelId.ActivityMainView);
        }
    }


    /**
    * ????????????????????????
    * @param param MainInterface_sort_2???  id??????
    */
    openCombineMain(param: any) {
        let idx;
        if (param) {
            if (param instanceof Array) idx = param[0];
            else idx = param;
        }
        if (!idx) {
            let cfgs = ConfigManager.getItems(MainInterface_sort_2Cfg);
            cfgs.sort((a, b) => { return a.sorting - b.sorting; });
            for (let i = 0; i < cfgs.length; i++) {
                if (this.ifSysOpen(cfgs[i].systemid)) {
                    idx = cfgs[i].id;
                    break;
                }
            }
        }
        if (gdk.panel.isOpenOrOpening(PanelId.CombineMainView)) {
            let panel = gdk.panel.get(PanelId.CombineMainView);
            if (panel) {
                let ctrl = panel.getComponent(CombineMainViewCtrl);
                ctrl.selectPageById(idx);
            }
            else {
                gdk.panel.setArgs(PanelId.CombineMainView, idx);
            }
        }
        else {
            gdk.panel.setArgs(PanelId.CombineMainView, idx);
            gdk.panel.open(PanelId.CombineMainView);
        }
    }

    openAdventureMainView() {
        gdk.panel.open(PanelId.AdventureMainView)
    }

    openAdventureStore() {
        gdk.panel.open(PanelId.AdventureStoreView);
    }

    openAdventureRank() {
        gdk.panel.open(PanelId.AdventureRankView);
    }

    openAdventurePassPort() {
        gdk.panel.open(PanelId.AdventurePassPortView);
    }

    /**?????????????????? */
    openTurnDrawView() {
        gdk.panel.open(PanelId.TurntableDrawView);
    }

    /**??????????????????120????????? */
    openKffl() {
        gdk.panel.open(PanelId.KfflActView);
    }

    /**????????????????????? */
    openPassPort() {
        // gdk.panel.open(PanelId.PassPort);
        gdk.panel.setArgs(PanelId.TradingPort, 9);
        gdk.panel.open(PanelId.TradingPort);
    }

    /**???????????????????????? */
    openGrowthFunds(param?: number) {
        gdk.panel.setArgs(PanelId.FundsView, [param ? param : 1])
        gdk.panel.setArgs(PanelId.TradingPort, 10);
        gdk.panel.open(PanelId.TradingPort);
    }

    /**??????????????????????????? */
    openTowerTunds() {
        gdk.panel.setArgs(PanelId.FundsView, [0])
        gdk.panel.setArgs(PanelId.TradingPort, 10);
        gdk.panel.open(PanelId.TradingPort);
    }

    /**???????????????????????? */
    openOneDollarGift() {
        // gdk.panel.open(PanelId.OneDollarGift);
        gdk.panel.setArgs(PanelId.TradingPort, 13);
        gdk.panel.open(PanelId.TradingPort);
    }

    /**?????????????????? */
    openWeeklyPassPort() {
        gdk.panel.setArgs(PanelId.TradingPort, 11);
        gdk.panel.open(PanelId.TradingPort);
    }

    /**???????????? */
    openDecomposeView() {
        gdk.panel.open(PanelId.Decompose)
    }

    /**
     * ????????????
     */
    openHeroComposeView() {
        // gdk.panel.open(PanelId.HeroComposeView);
        this.openEquipMerge([4]);
    }

    /**
     * ?????????????????? 
     * @param params ??????id
     */
    openLottery(params: any[]) {
        if (!params || params.length == 0) {
            params = null;
        }
        let cfg: LuckydrawCfg = null;
        if (params) {
            cfg = ConfigManager.getItemById(LuckydrawCfg, params[0]);
            if (!this.ifSysOpen(cfg.system) && cfg.act_type !== 0) {
                params[0] = 102;
                cfg = ConfigManager.getItemById(LuckydrawCfg, params[0]);
            }
        }

        let panel = gdk.panel.get(PanelId.Lottery);
        let param = cfg ? cfg.id : null;
        if (gdk.panel.isOpenOrOpening(PanelId.Lottery)) {
            if (panel) {
                let ctrl = panel.getComponent(LotteryViewCtrl);
                param && ctrl.selectPage(param);
            }
            else {
                gdk.panel.setArgs(PanelId.Lottery, param);
            }
        }
        else {
            gdk.panel.open(PanelId.Lottery, null, null, { args: param });
        }
    }

    openGeneLotteryView() {
        gdk.panel.setArgs(PanelId.GeneView, 1);
        gdk.panel.open(PanelId.GeneView);
    }

    openGeneEquipView() {
        gdk.panel.setArgs(PanelId.GeneView, 0);
        gdk.panel.open(PanelId.GeneView);
    }

    openGeneStore() {
        gdk.panel.setArgs(PanelId.GeneView, 1);
        gdk.panel.open(PanelId.GeneView, (node: cc.Node) => {
            let ctrl = node.getComponent(GeneView);
            ctrl.onStoreClick();
        });
    }

    // /**?????????????????? */
    // openCompose() {
    //     gdk.panel.open(PanelId.SynthesisPanel)
    // }

    /**?????????????????? */
    openHeroReset() {
        gdk.panel.open(PanelId.HeroResetView)
    }

    /**????????? */
    openDisassemble(params: number[] = [0]) {
        gdk.panel.setArgs(PanelId.HeroResetView, params[0]);
        gdk.panel.open(PanelId.HeroResetView);
    }

    /**?????????????????? */
    closeRewardPanel() {
        gdk.panel.hide(PanelId.Reward)
    }

    /**?????????????????? */
    openSignView(params: any[]) {
        gdk.panel.open(PanelId.Sign)
    }

    /**???????????? */
    playVideo(params: any[]) {
        if (!params || !params[0]) return;
        let node = new cc.Node();
        let spine = node.addComponent(sp.Skeleton);
        let resId = 'GuideView';
        spine.node.opacity = 0;
        spine.node.active = true;
        spine.skeletonData = null;
        spine.premultipliedAlpha = false;
        gdk.gui.layers.guideLayer.addChild(node, 999);
        gdk.rm.loadRes(resId, params[0], sp.SkeletonData, (res: sp.SkeletonData) => {
            if (!cc.isValid(node)) return;
            // ???????????????????????????
            gdk.DelayCall.addCall(() => {
                node.runAction(cc.sequence(
                    cc.fadeOut(0.25),
                    cc.callFunc(() => {
                        // ?????????????????????
                        node.destroy();
                        gdk.rm.releaseRes(resId, res);
                    }),
                ));
                GuideUtil.activeGuide('video#complete');
            }, this, params[2] || 1.0);
            // ?????????????????????
            spine.skeletonData = res;
            spine.loop = true;
            spine.animation = params[1];
            spine.node.runAction(cc.fadeIn(0.25));
        });
    }

    /**?????????????????? */
    backScene() {
        // console.log("hideAllView")
        // gdk.gui.hideAllView(gdk.panel.get(PanelId.MainPanel), gdk.panel.get(PanelId.PveScene))
        let pveScene = gdk.panel.get(PanelId.PveScene)
        if (pveScene) {
            gdk.panel.open(PanelId.PveScene)
            // ??????MainPanel
            let node: cc.Node = gdk.panel.get(PanelId.MainPanel);
            if (node) {
                node.destroy();
                // ??????node???gui????????????
                gdk.Timer.frameOnce(3, gdk.gui, gdk.gui.getView);
            }
            return
        }
        let mainPanel = gdk.panel.get(PanelId.MainPanel)
        if (mainPanel) {
            gdk.panel.open(PanelId.MainPanel)
        }
    }

    /**???????????? */
    openMainPanel(params: any[]) {
        gdk.gui.removeAllPopup()
        gdk.panel.open(PanelId.MainPanel)
    }

    /**???????????????????????? */
    openHangPanel(params: any[]) {
        gdk.panel.open(PanelId.PveReady)
    }

    /**??????????????? */
    openArena() {
        gdk.panel.open(PanelId.Arena)
    }

    /**?????? ?????? */
    openMastery(params: any[]) {
        gdk.panel.hide(PanelId.MasteryUp)
        let select = 0
        if (params && params.length > 0) {
            select = params[0]
        }
        // gdk.panel.open(PanelId.Mastery, (node: cc.Node) => {
        //     let comp = node.getComponent(MasteryViewCtrl)
        //     comp.scheduleOnce(() => {
        //         comp.selectType(null, select)
        //     }, 0.1)
        // })
    }


    /**
     * ?????????????????? ?????????????????????
     */
    openMainlineSelectStage(sid: number) {
        let cfg = ConfigManager.getItemById(Copy_stageCfg, sid);
        if (!cfg) return;
        let lv = ModelManager.get(RoleModel).level;
        if (cfg.player_lv > lv) {
            gdk.gui.showMessage(`?????????????????????${cfg.player_lv}??????????????????`);
            return;
        }
        let model = ModelManager.get(CopyModel);
        let cityData = model.getCityData(CopyUtil.getChapterId(sid), cfg.copy_id == 7 ? 1 : 0);
        if (!cityData || !cityData.stageDatas) {
            CC_DEBUG && cc.error(`????????? ${sid} ???????????????`);
            return;
        }
        cityData.stageDatas.some(data => {
            if (data.stageCfg.id != sid) return false;
            if (data.state == StageState.Lock) {
                gdk.gui.showMessage(`${data.cityId}-${data.sid}?????????`);
                return true;
            }
            if (data.stageCfg.copy_id == 7 && data.state == StageState.Pass) {
                gdk.gui.showMessage(`${data.cityId}-${data.sid}?????????`);
                return true;
            }
            gdk.panel.open(PanelId.EnterStageView, (node: cc.Node) => {
                let ctrl = node.getComponent(EnterStageViewCtrl);
                ctrl.updateData(data);
            });
            return true;
        });
    }

    openChampionView(params: number) {
        gdk.panel.open(
            [PanelId.ChampionRankView,
            PanelId.ChampionReportView,
            PanelId.ChampionExchangeView,
            PanelId.ChampionGradeView,
            PanelId.ChampionGuessView
            ][params]
        );
    }

    /**
     * ?????????
     */
    openChampion() {
        gdk.panel.open(PanelId.ChampionshipEnterView);
    }

    /**
     * ??????????????????
     * @param params 1-???????????? 2-???????????? 3-????????? 4-???????????? 5-?????? 
     */
    openSupportView(params?: number[]) {
        if (params && params.length == 1) {
            let node = gdk.panel.get(PanelId.SupportMainView);
            if (node) {
                let ctrl = node.getComponent(SupportMainViewCtrl);
                ctrl.selectPanel(params[0]);
                return;
            }
            gdk.panel.setArgs(PanelId.SupportMainView, params[0]);
        }
        gdk.panel.open(PanelId.SupportMainView);
    }

    openKfLoginView() {
        gdk.panel.open(PanelId.KfLoginView);
    }

    openCrossActListView() {
        gdk.panel.open(PanelId.CrossActListView);
    }

    openExpeditionMainView() {
        if (!this.ifSysOpen(2922, true) || ModelManager.get(RoleModel).guildId <= 0) {
            return;
        }
        gdk.panel.open(PanelId.GuildMain, (node: cc.Node) => {
            JumpUtils.openPanel({
                panelId: PanelId.ExpeditionMainView,
                currId: PanelId.GuildMain
            })
        })
    }

    openExpeditionHeroDetailView(id: number) {
        gdk.panel.open(PanelId.ExpeditionHeroDetailView, (node: cc.Node) => {
            let ctrl = node.getComponent(ExpeditionHeroDetailViewCtrl);
            ctrl.initHeroInfo(id);
        })
    }

    /**
     * ????????????
     * ????????? ????????????
     * Secret = 0,//????????????
     * Gold = 1,//??????
     * Diamond = 2,//??????
     * Gift = 3,//??????
     */
    openStore(params: any[], callback?: Function) {
        // let n = gdk.gui.getCurrentView().getComponent(gdk.BasePanel)
        // if (n && n.config) {
        //     n.config.tempHidemode = gdk.HideMode.DISABLE
        // }
        let panel = gdk.panel.get(PanelId.Store)
        let select = 0
        if (params && params.length > 0) {
            select = params[0]
        }
        if (panel) {
            let comp = panel.getComponent(StoreViewCtrl)
            comp.menuBtnSelect(null, select)
            callback && callback()
        } else {
            gdk.panel.open(PanelId.Store, (node: cc.Node) => {
                let comp = node.getComponent(StoreViewCtrl)
                comp.menuBtnSelect(null, select)
                callback && callback()
            })
        }
    }

    /*????????????????????????  0?????? 1?????? 2 ?????? 3?????? 4????????????*/
    openItemStore(params: any[]) {
        let select = 0
        if (params && params.length > 0) {
            select = params[0]
        }
        gdk.panel.open(PanelId.Store, (node: cc.Node) => {
            let comp = node.getComponent(StoreViewCtrl)
            comp.menuBtnSelect(null, 0)
            comp.typeBtnSelect(null, select)
        })
    }

    /*
    ???????????? [????????????,????????????]
    0 ??? ???????????? 1 ??? ????????????
     -------------------------
    0??????
    BlackStore = 0,//??????
    Hero = 1,//????????????
    Arena = 2,//?????????????????????
    Turntable = 3,//????????????
    Guild = 4,//????????????
    Survival = 5,//????????????
    Rune = 6,//????????????
    Costume = 7,// ??????
    --------------------------
    1??????
    Team = 0, //?????????
    Siege = 1,//????????????
    Guardian = 2,//????????????
    ArenaHonor = 3,//???????????????
    Expedition = 4,//????????????
    Ultimate = 5,//????????????
    */
    openScoreStore(params: any[]) {
        let select = 0
        let type = 0
        if (params && params.length > 1) {
            select = params[0]
            type = params[1]
        } else {
            return
        }
        gdk.panel.open(PanelId.Store, (node: cc.Node) => {
            let comp = node.getComponent(StoreViewCtrl)
            comp.menuBtnSelect(null, select)
            comp.typeBtnSelect(null, type)
        })
    }

    /*???????????????*/
    openCardStore(params: any[]) {
        let select = 0
        if (params && params.length > 0) {
            select = params[0]
        }
        gdk.panel.open(PanelId.Store, (node: cc.Node) => {
            let comp = node.getComponent(StoreViewCtrl)
            comp.menuBtnSelect(null, 3)
            comp.typeBtnSelect(null, select)
        })
    }

    /**???????????? */
    openRechargeView(params: any[]) {
        let select = 0
        if (params && params.length > 0) {
            select = params[0]
        }
        gdk.panel.setArgs(PanelId.Recharge, select);
        gdk.panel.open(PanelId.Recharge);
    }

    /**??????????????????--???????????? ??????[type,giftId?] */
    openRechargetLBPanel(params: any[]) {
        let tabIndex = 0
        if (params && params.length > 0) {
            tabIndex = params[0]
        }
        let storeModel = ModelManager.get(StoreModel)
        if (params[1] && params[1] == -1 && storeModel.giftJumpId) {
            params[1] = storeModel.giftJumpId;
            storeModel.giftJumpId = null;
        }
        gdk.panel.setArgs(PanelId.Recharge, 1);
        gdk.panel.open(PanelId.Recharge, () => {
            let panel = gdk.panel.get(PanelId.RechargeLB);
            if (panel) {
                let ctrl = panel.getComponent(RechargeLBCtrl)
                ctrl.typeBtnSelect(null, tabIndex)
                params[1] && ctrl.scrollToGift(params[1]);
            }
            else {
                gdk.panel.open(PanelId.RechargeLB, (node) => {
                    let ctrl = node.getComponent(RechargeLBCtrl)
                    ctrl.typeBtnSelect(null, tabIndex)
                    params[1] && ctrl.scrollToGift(params[1]);
                })
            }
        });
    }

    /**????????????--???????????? ?????? */
    openRechargetMFPanel(params: any[]) {
        // let tabIndex = 0
        // if (params && params.length > 0) {
        //     tabIndex = params[0]
        // }
        // gdk.panel.setArgs(PanelId.TradingPort, 7);
        // gdk.panel.open(PanelId.TradingPort, () => {
        //     let panel = gdk.panel.get(PanelId.RechargeMF);
        //     if (panel) {
        //         let c = panel.getComponent(RechargeMFCtrl);
        //         c.onBtnSelect(null, tabIndex);
        //     }
        //     else {
        //         if (gdk.panel.isOpenOrOpening(PanelId.RechargeMF)) {
        //             gdk.panel.setArgs(PanelId.RechargeMF, tabIndex);
        //         }
        //         else {
        //             gdk.panel.setArgs(PanelId.RechargeMF, tabIndex);
        //             gdk.panel.open(PanelId.RechargeMF);
        //         }
        //     }
        // });
        this.openStore([3]);
    }

    /**???????????? */
    openAlchemyView(params: any[]) {
        gdk.panel.open(PanelId.Alchemy);
    }

    /**???????????? */
    openScoreSysView() {
        gdk.panel.open(PanelId.ScoreSytemView)
    }

    /**???????????? */
    openMonthCardView() {
        gdk.panel.setArgs(PanelId.TradingPort, 12);
        gdk.panel.open(PanelId.TradingPort);
    }

    openGrowTaskView() {
        gdk.panel.setArgs(PanelId.GrowMenuView, 0);
        gdk.panel.open(PanelId.GrowMenuView);
    }

    openGeneralWeaponView() {
        if (this.ifSysOpen(2814, true)) {
            // gdk.panel.setArgs(PanelId.GrowMenuView, 1);
            // gdk.panel.open(PanelId.GrowMenuView);
            let cfg = ConfigManager.getItemByField(General_weaponCfg, 'chapter', ModelManager.get(TaskModel).weaponChapter);
            if (cfg) {
                gdk.panel.open(PanelId.GeneralWeaponTask);
            }
            else {
                gdk.panel.open(PanelId.GeneralWeaponUpgradePanel);
                // this.openSupportView([2]);
            }
        }
    }

    /**
     * ?????????????????????
     */
    openPiecesMain(params: any[]) {
        if (!JumpUtils.ifSysOpen(2914)) {
            return;
        }
        gdk.panel.open(PanelId.PiecesMain);
    }

    /**
    * ????????????????????????
    */
    openCServerActivityMain(params: any[]) {

        let id = 0;
        if (params && params.length > 0) {
            id = params[0]
        }
        if (id > 0) {
            let cfg = ConfigManager.getItemById(MainInterface_sortCfg, id);
            if (!JumpUtils.ifSysOpen(cfg.systemid)) {
                return;
            }
            gdk.panel.setArgs(PanelId.CServerActivityMainView, id);
        }
        gdk.panel.open(PanelId.CServerActivityMainView);
    }

    /**
    * ???????????????????????????
    */
    openLuckTwistBtnClick() {
        if (!JumpUtils.ifSysOpen(2902)) {
            return;
        }
        gdk.panel.open(PanelId.LuckyTwistMain);
    }

    /**
     * ??????7?????????
     */
    open7dActivity(params: any[]) {
        gdk.panel.open(PanelId.SevenDays);
    }

    /**
     * ??????????????????
     */
    openDailyRecharge() {
        gdk.panel.open(PanelId.DailyFirstRecharge);
    }

    /**
     * ??????????????????
     * @param params 
     */
    openDailyMission(params: any[]) {
        gdk.panel.open(PanelId.Task);
    }

    /**
     * ????????????
     * @param params 
     */
    openFirstPayGift(params?: number[]) {
        let storeModel = ModelManager.get(StoreModel);
        if (!SdkTool.tool.can_charge || storeModel._hasGetFirstPayReward() || !JumpUtils.ifSysOpen(1801, false)) {
            // ?????????????????????????????????????????????????????????
            return
        }
        let index = (params instanceof Array) ? params[0] : void 0;
        if (!cc.js.isNumber(index)) {
            let cfgs = ConfigManager.getItems(Store_first_payCfg);
            index = storeModel.firstPayList.length + 1;
            if (index > cfgs.length) {
                // ????????????????????????????????????????????????
                let cfg = GuideUtil.getCurGuide();
                if (cfg) {
                    // ??????????????????????????????????????????
                    let cond = `popup#${PanelId.FirstPayGift.__id__}#close#bymyself`;
                    if (cfg.finishCondition == cond) {
                        GuideUtil.activeGuide(cond);
                    }
                }
                return;
            }
        }
        this.openPanelAfter(
            PanelId.FirstPayGift,
            [
                PanelId.MainLevelUpTip,
                PanelId.FunctionOpen,
                PanelId.Sign,
                PanelId.AskPanel,
            ],
            {
                args: index,
            },
        );
    }

    /**?????? ???????????????????????? */
    openKfcbView(params: any[]) {
        let roleModel = ModelManager.get(RoleModel)
        let kfcb_cfg = ConfigManager.getItemById(GlobalCfg, "kfcb_lv_time").value
        let serverTime = Math.floor(GlobalUtil.getServerTime() / 1000)
        let serverOpenTime = GlobalUtil.getServerOpenTime()
        let endTime = serverOpenTime + 3600 * 24 * kfcb_cfg[1] - serverTime
        if (roleModel.level >= kfcb_cfg[0] && endTime > 0) {
            gdk.panel.open(PanelId.KfcbActView)
        }
    }

    /**
     * ????????????
     * ????????? ????????????
     * [0] ??????
     * [1] ??????
     * [2] ??????
     * [3] ??????
     */
    openFriend(params: any[]) {
        // let n = gdk.gui.getCurrentView().getComponent(gdk.BasePanel)
        // if (n && n.config) {
        //     n.config.tempHidemode = gdk.HideMode.DISABLE
        // }
        let panel = gdk.panel.get(PanelId.Friend)
        let select = 0
        if (params && params.length > 0) {
            select = params[0]
        }
        if (panel) {
            let comp = panel.getComponent(FriendViewCtrl)
            comp.selectPanel(null, select)
        } else {
            gdk.panel.open(PanelId.Friend, (node: cc.Node) => {
                let comp = node.getComponent(FriendViewCtrl)
                comp.selectPanel(null, select)
            })
        }
    }

    /**?????? */
    openRank(params: any[]) {
        gdk.panel.open(PanelId.Rank)
    }

    /**?????? */
    openMail(params: any[]) {
        gdk.panel.open(PanelId.Mail)
    }

    /**?????? */
    openGuild(params: any[]) {
        let model = ModelManager.get(RoleModel)
        if (model.guildId > 0) {
            gdk.panel.open(PanelId.GuildMain)
        } else {
            gdk.panel.setArgs(PanelId.GuildList, true)
            gdk.panel.open(PanelId.GuildList)
        }
    }

    /* ???????????????*/
    openGuildFootHold() {
        NetManager.on(icmsg.GuildDetailRsp.MsgType, this._openGuildFh, this)
        let model = ModelManager.get(RoleModel)
        if (model.guildId > 0) {
            gdk.panel.open(PanelId.GuildMain)
        } else {
            gdk.gui.showMessage(gdk.i18n.t("i18n:GUILD_TIP52"))
        }
    }

    _openGuildFh() {
        NetManager.off(icmsg.GuildDetailRsp.MsgType, this._openGuildFh, this)
        let panel = gdk.panel.get(PanelId.GuildMain);
        if (panel) {
            let ctrl = panel.getComponent(GuildMainCtrl);
            ctrl.openFootHoldView()
        }
    }

    openGuildRank() {
        gdk.panel.open(PanelId.GuildListRankView);
    }

    openGuildMail() {
        gdk.panel.open(PanelId.GuildMailSendView);
    }

    openGuildBoss() {
        if (!this.ifSysOpen(2835) || ModelManager.get(RoleModel).guildId <= 0) {
            return;
        }
        let panel = gdk.panel.get(PanelId.GuildMain);
        if (panel) {
            let ctrl = panel.getComponent(GuildMainCtrl);
            ctrl.openGuildBossFight();
        }
        else {
            if (gdk.panel.isOpenOrOpening(PanelId.GuildMain)) {
                if (!GuildUtils.isHoldCamp()) {
                    gdk.gui.showMessage(gdk.i18n.t("i18n:GUILD_TIP53"))
                    return
                }
                gdk.panel.open(PanelId.GuildBossView);
            }
            else {
                gdk.panel.open(PanelId.GuildMain, (node: cc.Node) => {
                    let ctrl = node.getComponent(GuildMainCtrl);
                    ctrl.openGuildBossFight();
                })
            }
        }
    }

    openGuildPowerView() {
        if (!this.ifSysOpen(2835, true) || ModelManager.get(RoleModel).guildId <= 0) {
            return;
        }
        gdk.panel.open(PanelId.GuildPowerView)
    }

    /**?????????????????? */
    openRelicTradingPort() {
        if (!JumpUtils.ifSysOpen(2894, true)) {
            return
        }
        gdk.panel.open(PanelId.RelicTradingPortView)
    }

    /**???????????????????????? */
    openSiegeMainView() {
        if (ModelManager.get(RoleModel).guildId > 0) {
            gdk.panel.open(PanelId.SiegeMainView)
        } else {
            gdk.gui.showMessage(gdk.i18n.t("i18n:GUILD_TIP52"))
        }
    }

    /**?????????????????? */
    openSiegeFightView() {
        if (ModelManager.get(RoleModel).guildId > 0) {
            gdk.panel.open(PanelId.SiegeFightView)
        } else {
            gdk.gui.showMessage(gdk.i18n.t("i18n:GUILD_TIP52"))
        }
    }

    /**??????????????????????????? */
    openFootholdRankView() {
        if (ModelManager.get(RoleModel).guildId > 0) {
            gdk.panel.open(PanelId.GuildMain, () => {
                let mainView = gdk.panel.get(PanelId.GuildMain)
                if (mainView) {
                    let ctrl = mainView.getComponent(GuildMainCtrl)
                    ctrl.openGlobalFootHold(() => {
                        gdk.panel.open(PanelId.FHResultView)
                    })
                }
            })
        } else {
            gdk.gui.showMessage(gdk.i18n.t("i18n:GUILD_TIP52"))
        }
    }

    /**??????????????? ?????????????????? */
    openFootholdGuess() {
        if (ModelManager.get(RoleModel).guildId > 0) {
            gdk.panel.open(PanelId.GuildMain, () => {
                let mainView = gdk.panel.get(PanelId.GuildMain)
                if (mainView) {
                    let ctrl = mainView.getComponent(GuildMainCtrl)
                    ctrl.openGlobalFootHold(() => {
                        gdk.panel.open(PanelId.FHCrossGuessView)
                    })
                }
            })
        } else {
            gdk.gui.showMessage(gdk.i18n.t("i18n:GUILD_TIP52"))
        }
    }

    /**??????????????? */
    openFootholdMainView() {
        if (ModelManager.get(RoleModel).guildId > 0) {
            gdk.panel.open(PanelId.GuildMain, () => {
                let mainView = gdk.panel.get(PanelId.GuildMain)
                if (mainView) {
                    let ctrl = mainView.getComponent(GuildMainCtrl)
                    ctrl.openGlobalFootHold()
                }
            })
        } else {
            gdk.gui.showMessage(gdk.i18n.t("i18n:GUILD_TIP52"))
        }
    }


    openCaveMainView() {
        gdk.panel.open(PanelId.CaveMain);
    }

    /**????????? */
    openWorldMap(params: any[]) {
        gdk.panel.open(PanelId.WorldMapView);
    }

    openSubInstanceEliteView() {
        gdk.panel.open(PanelId.SubInstanceEliteView);
    }


    /**?????????????????? */
    openOnlineReward() {
        gdk.panel.open(PanelId.OnlineRewardPanel);
    }

    /**
     * ????????????
     * @param params  0-???????????? 1-???????????? 
     */
    openCityMap(params: any[]) {
        switch (params[0]) {
            case 0:
                gdk.panel.open(PanelId.CityMapView);
                break;
            case 1:
                let model = ModelManager.get(CopyModel);
                let lastEliteStageId = model.eliteStageCfgs[0].id; //??????????????????
                if (model.eliteStageData) {
                    let data = model.eliteStageData[model.eliteStageData.length - 1];
                    if (data && data != 0) lastEliteStageId = data;
                }
                gdk.panel.open(PanelId.CityMapView, (node) => {
                    let ctrl = node.getComponent(CityMapViewCtrl);
                    ctrl.curCityId = CopyUtil.getChapterId(lastEliteStageId);
                    ctrl.initData(1);
                });
                break;
            default:
                break;
        }
    }

    /**?????????????????? ?????????????????? */
    trackCity(params: any[]) {
        let guideCfg = GuideUtil.getCurGuide();
        if (!guideCfg) return;
        let targetSid = parseInt(guideCfg.bindBtnId) || null;
        if (!targetSid) return;
        let panel = gdk.panel.get(PanelId.CityMapView);
        if (!panel) {
            gdk.panel.open(PanelId.CityMapView, (node) => {
                let ctrl: CityMapViewCtrl;
                ctrl = node.getComponent(CityMapViewCtrl);
                ctrl.moveToCenter(targetSid);
            })
        }
        else {
            let ctrl: CityMapViewCtrl;
            ctrl = panel.getComponent(CityMapViewCtrl);
            ctrl.moveToCenter(targetSid);
        }
    }

    /**?????????????????????????????????????????????????????? */
    trackChapter(params: any[]) {
        let guideCfg = GuideUtil.getCurGuide();
        if (!guideCfg) return;
        let targetChapterId = parseInt(guideCfg.bindBtnId) || null;
        if (!targetChapterId) return;
        let panel = gdk.panel.get(PanelId.WorldMapView);
        if (!panel) {
            gdk.panel.open(PanelId.CityMapView, (node) => {
                let ctrl: WorldMapViewCtrl;
                ctrl = node.getComponent(WorldMapViewCtrl);
                let cityData = ctrl.getCityDataById(targetChapterId);
                if (cityData) {
                    cityData.isTrack = true;
                    ctrl.moveToCenter(cityData);
                }
            })
        }
        else {
            let ctrl: WorldMapViewCtrl;
            ctrl = panel.getComponent(WorldMapViewCtrl);
            let cityData = ctrl.getCityDataById(targetChapterId);
            if (cityData) {
                cityData.isTrack = true;
                ctrl.moveToCenter(cityData);
            }
        }
    }

    /**?????????????????? */
    unLockNewChapter(params: any[]) {
        let guideCfg = GuideUtil.getCurGuide();
        if (!guideCfg) return;
        let targetChapterId = parseInt(guideCfg.bindBtnId) || null;
        if (!targetChapterId) return;
        let panel = gdk.panel.get(PanelId.WorldMapView);
        if (!panel) {
            gdk.panel.open(PanelId.WorldMapView, (node) => {
                let ctrl: WorldMapViewCtrl;
                ctrl = node.getComponent(WorldMapViewCtrl);
                ctrl.unLockNewChapter(targetChapterId);
            })
        }
        else {
            let ctrl: WorldMapViewCtrl;
            ctrl = panel.getComponent(WorldMapViewCtrl);
            ctrl.unLockNewChapter(targetChapterId);
        }
    }

    /**
     * ????????????
     * @param args 
     */
    closePanel(params?: any[]) {
        if (!params || !params.length) {
            // ??????????????????
            let excludes = [
                PanelId.MainDock,
                PanelId.MainTopInfoView,
                PanelId.MiniChat,
                PanelId.GrowTaskBtnView,
            ];
            Object.values(PanelId).forEach((i: gdk.PanelValue) => {
                if (excludes.indexOf(i) !== -1) return;
                if (i.isPopup && gdk.panel.isOpenOrOpening(i)) {
                    gdk.panel.hide(i);
                }
            });
            return;
        }
        // ?????????????????????
        params.forEach(i => gdk.panel.hide(i));
    }

    /**
     * ??????????????????????????????????????????????????????????????????
     */
    openPanel(args: {
        panelId: number | string | gdk.PanelValue,
        panelArgs?: gdk.PanelOption,
        callback?: (node?: cc.Node) => void,
        currId?: number | string | gdk.PanelValue | cc.Node,
        hideArgs?: gdk.PanelHideArg,
        preload?: boolean | number | string | gdk.PanelValue,
        tempHideMode?: gdk.HideMode,
        blockInput?: boolean,
    }) {
        // ??????????????????????????????????????????
        if (args instanceof Array) {
            args = {
                panelId: args[0],
                panelArgs: args[1],
                callback: args[2],
                currId: args[3],
                hideArgs: args[4],
                preload: args[5],
                tempHideMode: args[6],
                blockInput: args[7],
            };
        }
        // ????????????
        let {
            panelId, panelArgs, callback, currId, hideArgs, preload, tempHideMode, blockInput,
        } = args;
        (preload === void 0) && (preload = true);
        // ??????????????????
        let config: gdk.PanelValue;
        if (cc.js.isNumber(panelId) || cc.js.isString(panelId)) {
            config = gdk.PanelId.getValue(panelId);
        } else {
            config = panelId as any;
        }
        if (config) {
            // ?????????????????????
            let currCfg: gdk.PanelValue;
            if (currId !== void 0) {
                if (cc.js.isNumber(currId) || cc.js.isString(currId)) {
                    currCfg = gdk.PanelId.getValue(currId);
                } else if (currId instanceof cc.Node) {
                    currId = gdk.Tool.getResIdByNode(currId);
                    currCfg = gdk.PanelId.getValue(currId);
                } else {
                    currCfg = currId as any;
                }
                if (currCfg && tempHideMode !== void 0) {
                    currCfg.tempHidemode = tempHideMode;
                }
            }
            // ????????????????????????onHide??????
            if (hideArgs === void 0) {
                // ?????????????????????
                if (currCfg) {
                    let currNode = gdk.panel.get(currCfg);
                    if (currNode) {
                        let currPanel = currNode.getComponent(gdk.BasePanel);
                        if (currPanel && currPanel.hideArgs) {
                            hideArgs = currPanel.hideArgs;
                        }
                    }
                    config.onHide = hideArgs || { id: currCfg.__id__ };
                }
            } else {
                // ??????????????????????????????
                config.onHide = hideArgs;
            }
            // ????????????????????????
            if (blockInput) {
                this.showGuideMask();
            }
            // ???????????????????????????
            gdk.panel.open(
                panelId,
                (node: cc.Node) => {
                    // ????????????
                    if (blockInput) {
                        this.hideGuideMask();
                    }
                    // ??????
                    callback && callback(node);
                    // ??????????????????????????????
                    if (currCfg && currCfg !== config) {
                        gdk.panel.hide(currCfg);
                        // ???????????????
                        if (tempHideMode === void 0 && preload) {
                            gdk.DelayCall.addCall(() => {
                                if (preload === true) {
                                    // ????????????????????????????????????????????????
                                    gdk.panel.preload(currCfg);
                                } else if (preload !== false) {
                                    // ?????????????????????
                                    gdk.panel.preload(preload);
                                }
                            }, this, 0.8);
                        }
                    }
                },
                null,
                panelArgs,
            );
        }
    }

    /**
     * ??????panelId???????????????preId??????????????????????????????????????????preId??????????????????
     * @param panelId 
     * @param preId 
     * @param panelOpt
     */
    openPanelAfter(
        panelId: gdk.PanelValue,
        preIds: gdk.PanelValue[],
        panelOpt?: gdk.PanelOption,
        callback?: (node?: cc.Node) => void,
        thisArg?: any,
    ) {
        // ????????????
        if (panelOpt && panelOpt.args && panelOpt.args instanceof Array) {
            gdk.panel.setArgs(panelId, ...panelOpt.args);
            delete panelOpt.args;
        }
        if (gdk.panel.isOpenOrOpening(panelId)) {
            // ????????????????????????????????????????????????
            return;
        }
        // ??????????????????
        let aid = '__open_panel_after__';
        let after = this[aid];
        if (!after) {
            after = this[aid] = {};
        }
        let pid = panelId.__id__;
        let funcs: { [id: string]: Function } = after[pid];
        if (!funcs) {
            funcs = after[pid] = {};
        }
        // ?????????????????????
        let nopre = true;
        let ids = {};
        preIds.forEach(val => {
            if (!gdk.panel.isOpenOrOpening(val)) return;
            let vid = val.__id__;
            ids[vid] = true;
            nopre = false;
            // preId?????????????????????????????????
            let key = `${val.isPopup ? 'popup' : 'view'}#${vid}#close`;
            // ???????????????
            let func = funcs[key];
            if (func) {
                gdk.e.off(key, func, this);
            }
            // ????????????????????????
            func = funcs[key] = () => {
                delete funcs[key];
                delete ids[vid];
                if (Object.keys(ids).length == 0) {
                    delete after[pid];
                    if (Object.keys(after).length == 0) {
                        delete this[aid];
                    }
                    gdk.panel.open(panelId, callback, thisArg, panelOpt);
                }
            };
            gdk.e.once(key, func, this);
        });
        if (nopre) {
            // ????????????
            gdk.panel.open(panelId, callback, thisArg, panelOpt);
        }
    }

    /**
     * ??????????????????
     * @param oldp 
     * @param newp 
     */
    updatePowerTip(oldp: number, newp: number) {
        if (newp <= oldp) {
            // ?????????????????????
            return;
        }
        if (gdk.panel.isOpenOrOpening(PanelId.MainPowerTip)) {
            gdk.panel.hide(PanelId.MainPowerTip);
        }
        gdk.DelayCall.addCall(this._updatePowerTipLater, this, 0.5, [oldp, newp]);
    }

    /**
     * ????????????????????????
     * @param oldp 
     * @param newp 
     */
    private _updatePowerTipLater(oldp: number, newp: number) {
        this.openPanelAfter(
            PanelId.MainPowerTip,
            [
                PanelId.Achieve,
                PanelId.StarUpdateSuccess2,
                PanelId.CareerAdvanceTipCtrl2,
                PanelId.ChangeJobResult,
                PanelId.RoleUpgradeSkillEffect,
                PanelId.GWeaponUpgradeSucView,
                PanelId.UniqueEquipStarUpdateEffect,
            ],
            {
                args: [oldp, newp],
                parent: gdk.gui.layers.messageLayer,
            },
        );
    }

    /**
     * ??????????????????
     */
    updateAchieveTip() {
        let model = ModelManager.get(TaskModel);
        if (model.newAchieves.length < 0) {
            return;
        }
        gdk.DelayCall.addCall(this._updateAchieveTipLater, this, 0.5);
    }

    /**
     * ????????????????????????
     */
    private _updateAchieveTipLater() {
        this.openPanelAfter(PanelId.Achieve, [PanelId.MainPowerTip]);
    }

    /**
     * ????????????????????????
     * @param stageId
     */
    openReplayListView(stageId: number) {
        this.openPanel({ panelId: PanelId.ReplayView, panelArgs: { args: [stageId] } });
    }

    /**
     * ????????????
     * @param fight_id 
     * @param fromId
     */
    replayFight(fight_id: number, fromId?: string | number | gdk.PanelValue | cc.Node, info?: icmsg.FightBrief) {
        let key = 'fight_replay_msg_' + fight_id;
        let rmsg = gdk.Cache.get(key);
        if (rmsg) {
            this._onReplayFightRsp(rmsg, fromId);
        } else {
            gdk.gui.showWaiting('', "pvp_replay_request");
            // ????????????????????????
            let qmsg = new icmsg.FightReplayReq();
            qmsg.fightId = fight_id;
            NetManager.send(qmsg, (rmsg: icmsg.FightReplayRsp) => {
                // ??????????????????????????????
                this._onReplayFightRsp(rmsg, fromId, info);
                // ???????????????10???????????????
                gdk.Cache.put(key, rmsg, 10 * 60);
                gdk.gui.hideWaiting("pvp_replay_request");
            });
        }
    }

    /**???????????? */
    bountyReplay(rmsg: icmsg.FightReplayRsp) {
        this._onReplayFightRsp(rmsg)
    }

    /**
     * ??????PVP??????
     */
    openPvpCopyScene(stage: Copy_stageCfg) {

    }


    /**????????????????????? */
    openArenaTeamView() {
        if (!JumpUtils.ifSysOpen(2877)) {
            return;
        }
        gdk.panel.open(PanelId.ArenaTeamView)
    }

    /**
     * ??????????????????
     */
    openDiaryView() {
        if (!JumpUtils.ifSysOpen(2858)) {
            return;
        }
        gdk.panel.open(PanelId.DiaryView);
    }

    // ??????????????????????????????
    private _onReplayFightRsp(rmsg: icmsg.FightReplayRsp, fromId?: string | number | gdk.PanelValue | cc.Node, info?: icmsg.FightBrief) {
        let stageConfig = CopyUtil.getStageConfig(rmsg.stageId);
        if (!stageConfig) {
            cc.error(`????????? id: ${rmsg.stageId} ???????????????`);
            return;
        }
        // ???????????????????????????????????????
        if (gdk.panel.isOpenOrOpening(PanelId.PveReplay)) {
            let node = gdk.panel.get(PanelId.PveReplay);
            if (node) {
                // ????????????????????????????????????
                let ctrl = node.getComponent(PveReplayCtrl);
                ctrl.rmsg = rmsg;
                ctrl.updateTitle(info);
                ctrl.heroes = null;
                ctrl.general = null;
                ctrl.fsm.broadcastEvent(PveFsmEventId.PVE_SCENE_RESTART);
            } else {
                // ?????????????????????????????????
                gdk.panel.setArgs(PanelId.PveReplay, [rmsg, info]);
            }
        } else {
            // ??????????????????
            this.openPanel({
                panelId: PanelId.PveReplay,
                panelArgs: { args: [rmsg, info] },
                currId: fromId || gdk.gui.getCurrentView(),
            });
        }
    }

    /**
     * ????????????????????????
     * @param args 
     * @param name 
     * @param type 
     */
    openPveArenaScene(args: any[], name: string, type: 'FOOTHOLD' | 'ARENA' | 'CHAMPION_GUESS' | 'CHAMPION_MATCH' | 'RELIC' | "VAULT" | "ENDRUIN" | 'ARENATEAM' | 'PEAK' | 'FOOTHOLD_GATHER' | 'GUARDIANTOWER' | 'PIECES_CHESS' | 'PIECES_ENDLESS' | 'ARENAHONOR_GUESS' | 'WORLDHONOR_GUESS' | 'ROYAL' | 'ROYAL_TEST') {
        let bossId = 1;
        let power = 0;
        let arr: Copy_stageCfg[];
        let interval: number;
        let pvpRivalPlayerId: number;
        switch (type) {
            case 'CHAMPION_MATCH':
                let championModel = ModelManager.get(ChampionModel);
                let mainCfg = ConfigManager.getItemByField(Champion_mainCfg, 'season', championModel.infoData.seasonId);
                arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                    return item.copy_id == CopyType.NONE && item.id == mainCfg.stage_id[0];
                });
                bossId = mainCfg.bossborn[0];
                break;

            case 'FOOTHOLD':
            case "FOOTHOLD_GATHER":
                let index = ModelManager.get(FootHoldModel).activityIndex
                let mapType = ModelManager.get(FootHoldModel).curMapData.mapType
                let saveStr = "foothold_local_map"
                if (mapType == 4) {
                    saveStr = 'foothold_corss_map'
                }
                let mapData = GlobalUtil.getLocal(`${saveStr}#${mapType}#${index}`);
                if (!mapData) {
                    mapData = FootHoldUtils.getFootHoldMapData(mapType, index)
                    GlobalUtil.setLocal(`${saveStr}#${mapType}#${index}`, mapData)
                }
                arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                    return item.copy_id == CopyType.NONE && item.id == mapData[0]
                });
                bossId = mapData[2];
                pvpRivalPlayerId = args[3];
                break;

            case 'RELIC':
                let relicModel = ModelManager.get(RelicModel);
                let t = parseInt(relicModel.curAtkCity.split('-')[0]);
                let cityId = parseInt(relicModel.curAtkCity.split('-')[1]);
                let d = RelicUtils.getPointMapData(t, cityId);
                arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                    return item.copy_id == CopyType.NONE && item.id == d[0];
                });
                bossId = d[2];
                pvpRivalPlayerId = args[0];
                break;

            case 'ARENATEAM':
                // ???????????????
                let atcfg = ConfigManager.getItemById(GlobalCfg, 'teamarena_invoke').value;
                let atval = MathUtil.shuffle(atcfg)[0] as string;
                let atarr = atval.split(',');
                arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                    return item.copy_id == CopyType.NONE && item.id == parseInt(atarr[0]);
                });
                bossId = parseInt(atarr[1]);
                break;

            case 'PEAK':
                // ????????????
                let pkcfg = ConfigManager.getItemById(GlobalCfg, 'peak_invoke').value;
                let pkval = MathUtil.shuffle(pkcfg)[0] as string;
                let pkarr = pkval.split(',');
                arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                    return item.copy_id == CopyType.NONE && item.id == parseInt(pkarr[0]);
                });
                bossId = parseInt(pkarr[1]);
                break;
            case 'GUARDIANTOWER':
                //????????????
                let temModel = ModelManager.get(GuardianTowerModel)
                let guardianVal = MathUtil.shuffle(temModel.curCfg.copy_id)[0] as string;
                let guardianArr = guardianVal.split(',');
                arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                    return item.copy_id == CopyType.NONE && item.id == parseInt(guardianArr[0]);
                });
                bossId = parseInt(guardianArr[1]);
                break
            case 'PIECES_CHESS':
                //?????????
                let m = ModelManager.get(PiecesModel);
                let id = ConfigManager.getItemByField(Pieces_initialCfg, 'team', m.computerTeamId, { power_type: 2 }).stage_id;
                arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                    return item.copy_id == CopyType.NONE && item.id == id;
                });
                let c = ConfigManager.getItems(Pieces_power1Cfg);
                let rewardType = Math.min(c[c.length - 1].type, m.curRewardType);
                power = ConfigManager.getItemByField(Pieces_power1Cfg, 'round', 1, { type: rewardType }).general;
                bossId = 1;
                interval = -1;
                break;
            case 'PIECES_ENDLESS':
                //????????? ????????????
                let m1 = ModelManager.get(PiecesModel);
                let id1 = ConfigManager.getItemByField(Pieces_initialCfg, 'team', m1.computerTeamId, { power_type: 1 }).stage_id;
                arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                    return item.copy_id == CopyType.NONE && item.id == id1;
                });
                let c2 = ConfigManager.getItems(Pieces_power2Cfg);
                let type = Math.min(c2[c2.length - 1].type, m1.curRewardType);
                let pCfg = ConfigManager.getItemByField(Pieces_power2Cfg, 'round', m1.startRound + 1, { type: type });
                power = pCfg.endless * pCfg.monster_power / 100;
                bossId = 1;
                interval = -1;
                break;
            case 'ARENAHONOR_GUESS':
                let curPro = ArenaHonorUtils.getCurProgressId();
                let cfg = ConfigManager.getItemById(Arenahonor_progressCfg, curPro);
                if (cfg) {
                    arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                        return item.copy_id == CopyType.NONE && item.id == cfg.pvp[0];
                    });
                    bossId = cfg.pvp[1]
                } else {
                    arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                        return item.copy_id == CopyType.NONE && item.id < 100 && item.id % 10 == 0;
                    });
                    bossId = 1;
                }
                break;
            case 'WORLDHONOR_GUESS':
                let curProId = WorldHonorUtils.getCurProgressId();
                let cfg1 = ConfigManager.getItemById(Arenahonor_worldwideCfg, curProId);
                if (cfg1) {
                    arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                        return item.copy_id == CopyType.NONE && item.id == cfg1.pvp[0];
                    });
                    bossId = cfg1.pvp[1]
                } else {
                    arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                        return item.copy_id == CopyType.NONE && item.id < 100 && item.id % 10 == 0;
                    });
                    bossId = 1;
                }
                break;
            case 'ROYAL':
                let rM = ModelManager.get(RoyalModel);
                let sceneId = rM.playerData.maps[rM.curFightNum];
                let sceneCfg = ConfigManager.getItemById(Royal_sceneCfg, sceneId)
                arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                    return item.copy_id == CopyType.NONE && item.id == sceneCfg.stage_id;
                });
                bossId = 1;
                interval = -1;
                break;
            case 'ROYAL_TEST':
                let rM1 = ModelManager.get(RoyalModel);
                let sceneCfg1 = ConfigManager.getItemById(Royal_sceneCfg, rM1.testSceneId)
                arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                    return item.copy_id == CopyType.NONE && item.id == sceneCfg1.stage_id;
                });
                bossId = 1;
                interval = -1;
                break;
            default:
                // ??????????????????
                arr = ConfigManager.getItems(Copy_stageCfg, (item: Copy_stageCfg) => {
                    return item.copy_id == CopyType.NONE && item.id < 100 && item.id % 10 == 0;
                });
                bossId = 1;
                pvpRivalPlayerId = args[0];
                break;
        }
        let stageCfg: Copy_stageCfg = MathUtil.shuffle(arr)[0];
        let model = new PveSceneModel();
        //model.id = stageCfg.id;
        model.pvpRivalPlayerId = pvpRivalPlayerId;
        model.arenaSyncData = {
            args: args,
            defenderName: name,
            fightType: type,
            pwoer: power,
            waveTimeOut: 1,
            bossId: bossId,
            bossTimeOut: interval ? interval : ConfigManager.getItemById(Pve_bossbornCfg, 1).interval,
            mainModel: model,
            mirrorModel: null,
        };
        model.id = stageCfg.id;
        this.openPanel({
            panelId: PanelId.PveScene,
            currId: gdk.gui.getCurrentView(),
            blockInput: true,
            panelArgs: { args: model },
        });
    }

    openPvpDefenderScene(args: any[], name: string, type: 'FOOTHOLD' | 'ARENA' | 'CHAMPION_GUESS' | 'CHAMPION_MATCH' | 'RELIC' | "VAULT" | "ENDRUIN" | 'ARENATEAM' | 'PEAK' | 'FOOTHOLD_GATHER' | 'GUARDIANTOWER' | 'ARENAHONOR_GUESS' | 'WORLDHONOR_GUESS' | 'ROYAL' | 'ROYAL_TEST') {
        let bossId = 1;
        //let arr: Copy_stageCfg[];
        let stageId: number;
        let heroModel = ModelManager.get(HeroModel)
        switch (type) {
            case 'CHAMPION_MATCH':
                stageId = heroModel.getDefenderStageId(4)
                break;
            case 'FOOTHOLD':
                stageId = heroModel.getDefenderStageId(2)
                break;

            case 'RELIC':
                stageId = heroModel.getDefenderStageId(3)
                break;

            case 'ARENATEAM':
                // ???????????????
                stageId = heroModel.getDefenderStageId(5)
                break;
            case 'ARENAHONOR_GUESS':
                // ???????????????
                stageId = heroModel.getDefenderStageId(6)
                break;
            case 'WORLDHONOR_GUESS':
                // ???????????????
                stageId = heroModel.getDefenderStageId(6)
                break;
            case 'ROYAL':
                let rM = ModelManager.get(RoyalModel);
                let sceneId = rM.defenderSceneId;
                let sceneCfg = ConfigManager.getItemById(Royal_sceneCfg, sceneId)
                stageId = sceneCfg.stage_id + 1;
                break;
            default:
                // ??????????????????
                stageId = heroModel.getDefenderStageId(1)
                bossId = 1;
                break;
        }
        let model = new PveSceneModel();
        model.isDefender = true;
        model.id = stageId;
        model.arenaSyncData = {
            args: args,
            defenderName: name,
            fightType: type,
            pwoer: 0,
            waveTimeOut: 1,
            bossId: bossId,
            bossTimeOut: ConfigManager.getItemById(Pve_bossbornCfg, 1).interval,
            mainModel: model,
            mirrorModel: null,
        };
        this.openPanel({
            panelId: PanelId.PvpDefender,
            currId: gdk.gui.getCurrentView(),
            blockInput: true,
            panelArgs: { args: model },
        });
    }


    //?????????????????????
    openLittleGameScene() {
        let stageId: number = 1;
        let model = new PveLittleGameModel();
        model.id = stageId;
        let hpNum = ConfigManager.getItemByField(Little_game_globalCfg, 'key', 'general_blood').value[0];
        model.generalHp = hpNum
        model.enterGeneralHp = hpNum
        gdk.panel.setArgs(PanelId.PveLittleGameView, model)
        this.openPanel({
            panelId: PanelId.PveLittleGameView,
            currId: gdk.gui.getCurrentView(),
            blockInput: true,
            panelArgs: { args: model },
        });
    }

}

const JumpUtils = gdk.Tool.getSingleton(JumpUtilsClass);
export default JumpUtils;

// ??????????????????????????????
CC_DEBUG && (window['JumpUtils'] = JumpUtils);