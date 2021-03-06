import {
    Copy_stageCfg,
    Global_powerCfg, HeadframeCfg, Headframe_titleCfg, HeroCfg, Hero_careerCfg, ItemCfg, Item_dropCfg,
    Item_equipCfg, Monster2Cfg,
    SkillCfg,
    SoldierCfg,
    Tech_stoneCfg,
    UniqueCfg,
    VipCfg
} from '../../a/config';
import ButtonSoundId from '../../configs/ids/ButtonSoundId';
import PanelId from '../../configs/ids/PanelId';
import GuideModel from '../../guide/model/GuideModel';
import { HeadItemInfo } from '../../scenes/main/ctrl/HeadChangeViewCtrl';
import SdkTool from '../../sdk/SdkTool';
import { EnergyStoneInfo } from '../../view/bingying/model/BYModel';
import GuardianGetCtrl from '../../view/lottery/ctrl/GuardianGetCtrl';
import HeroDetailViewCtrl from '../../view/lottery/ctrl/HeroDetailViewCtrl';
import HeroGetCtrl from '../../view/lottery/ctrl/HeroGetCtrl';
import LotteryModel from '../../view/lottery/model/LotteryModel';
import PveRes from '../../view/pve/const/PveRes';
import { CostumeTipsType } from '../../view/role/ctrl2/costume/CostumeTipsCtrl';
import { GuardianEquipTipsType } from '../../view/role/ctrl2/guardian/equip/GuardianEquipTipsCtrl';
import ConfigManager from '../managers/ConfigManager';
import ModelManager from '../managers/ModelManager';
import NetManager from '../managers/NetManager';
import { BagItem, BagType } from '../models/BagModel';
import { CopyType } from '../models/CopyModel';
import GeneralModel from '../models/GeneralModel';
import LoginModel from '../models/LoginModel';
import RoleModel, { AttTypeName } from '../models/RoleModel';
import ServerModel from '../models/ServerModel';
import AskPanel, { AskInfoCacheType, AskInfoType } from '../widgets/AskPanel';
import BtnMenuCtrl, { BtnMenuType, BtnTypePlayer } from '../widgets/BtnMenuCtrl';
import CareerTipCtrl from '../widgets/CareerTipCtrl';
import CommonInfoTipCtrl from '../widgets/CommonInfoTipCtrl';
import RewardCtrl, { RewardInfoType, RewardType } from '../widgets/RewardCtrl';
import RewardPreviewCtrl from '../widgets/RewardPreviewCtrl';
import TipsPanel, { TipType } from '../widgets/TipsPanel';
import { GuardianCfg } from './../../a/config';
import { EquipTipsType } from './../../view/bag/ctrl/EquipsTipsCtrl';
import BagUtils from './BagUtils';
import CopyUtil from './CopyUtil';
import JumpUtils from './JumpUtils';
import StringUtils from './StringUtils';

/**
 * @Last Modified by: yaozu.hu
 * @Last Modified time: 2021-04-06 13:57:57
 * @Date: 2019-03-25 14:41:33
 * @Last Modified by: jiangping
 * @Last Modified time: 2021-10-12 10:35:31
 */
class GlobalUtilClass extends iclib.GlobalUtilClass {

    get serverModel() {
        return ModelManager.get(ServerModel);
    }

    get guideModel() {
        return ModelManager.get(GuideModel);
    }

    get lotteryModel() {
        return ModelManager.get(LotteryModel);
    }

    get loginModel() {
        return ModelManager.get(LoginModel);
    }

    /**???????????? */
    sortArray<T>(arr: T[], sortFunc: (a: T, b: T) => number) {
        if (!sortFunc) {
            return arr
        }
        // for (let i = 0; i < arr.length - 1; i++) {
        //     for (let j = 0; j < arr.length - 1 - i; j++) {
        //         if (sortFunc(arr[j], arr[j + 1]) > 0) {
        //             let temp = arr[j];
        //             arr[j] = arr[j + 1];
        //             arr[j + 1] = temp;
        //         }
        //     }
        // }
        return arr.sort(sortFunc);
    }

    /**
     * ????????????
     * @param num ?????????
     * @param total ?????????
     * @param pad ????????????
     */
    padLeft(num: number | string, total, pad: string = "0") {
        if (num === void 0) {
            return
        }
        let text = ""
        if (typeof (num) == "number") {
            text = num.toString()
        } else if (typeof (num) == "string") {
            text = num
        }
        if (text.length >= total) {
            return text
        }

        return (Array(total).join(pad) + text).slice(-total);
    }

    /**
     * ????????????????????????
     * @param item ????????????
     * @param cb ????????????,????????????????????????????????????
     * @param maxNum ????????????
     */
    // openUsePanel(item: BagItem, cb: Function = null, maxNum: number = 0) {
    //     gdk.panel.open(PanelId.Use, (node: cc.Node) => {
    //         let comp = node.getComponent(UsePanel)
    //         comp.updatePanelShow(item, cb, maxNum)
    //     })
    // }

    /**????????????????????? */
    getServerTime() {
        return this.serverModel.serverTime
    }

    /**?????????????????? */
    getServerOpenTime() {
        return this.loginModel.serverOpenTime
    }

    /**
     * ???????????????????????????????????? 
     * @param openW ??????
     * @param curW  ????????????
     */
    getCurWeek(): number {
        //??????????????????0
        let curW = (new Date(this.getServerTime())).getDay();
        if (curW == 0) {
            return 0;
        }
        let openTime = this.getServerOpenTime();
        let curTime = Math.ceil(this.getServerTime() / 1000)
        let res = 0;
        let dayNum = Math.ceil((curTime - openTime) / 86400)
        res = dayNum % 3;
        if (res == 0) res = 3;
        return res;
    }

    /**
     * ???????????????????????????????????????
     */
    getCurDays(): number {
        let openTime = GlobalUtil.getServerOpenTime();
        let curTime = Math.ceil(GlobalUtil.getServerTime() / 1000);
        let dayNum = Math.ceil((curTime - openTime) / 86400);
        return dayNum;
    }

    /**????????????????????????????????? */
    getCrossOpenDays() {
        let crossTime = ModelManager.get(RoleModel).CrossOpenTime
        let curTime = Math.ceil(GlobalUtil.getServerTime() / 1000);
        let dayNum = Math.ceil((curTime - crossTime) / 86400);
        return dayNum;
    }

    /**???????????????????????? */
    openItemTips(item: BagItem, noBtn: boolean = false, isOther: boolean = false, from?: string | number) {
        switch (item.type) {
            case BagType.MONEY:
            case BagType.ITEM:
                let config = <ItemCfg>BagUtils.getConfigById(item.itemId);
                let dropCfgs = ConfigManager.getItemsByField(Item_dropCfg, 'drop_id', config ? config.func_args[0] : null);
                if (config && dropCfgs && config.use_type == 4 && dropCfgs.length > 0 && !gdk.panel.isOpenOrOpening(PanelId.GiftItemTips)) {
                    gdk.panel.setArgs(PanelId.GiftItemTips, item, noBtn);
                    gdk.panel.open(PanelId.GiftItemTips);
                }
                else {
                    if (config.func_id == `add_title`) {
                        let titleCfg = ConfigManager.getItemById(Headframe_titleCfg, config.func_args[0])
                        gdk.panel.setArgs(PanelId.TitlelTips, titleCfg);
                        gdk.panel.open(PanelId.TitlelTips);
                    } else if (config.func_id == 'add_head_frame') {
                        let item: HeadItemInfo = {
                            type: 1,
                            id: config.func_args[0],
                            isActive: false,
                            isSelect: false
                        }
                        gdk.panel.setArgs(PanelId.FrameDetailsView, item);
                        gdk.panel.open(PanelId.FrameDetailsView)
                    } else {
                        gdk.panel.setArgs(PanelId.ItemTips, item, noBtn);
                        gdk.panel.open(PanelId.ItemTips);
                    }
                }
                break;
            case BagType.EQUIP:
                let tipsArgs: EquipTipsType = {
                    itemInfo: item,
                    noBtn: noBtn,
                    isOther: isOther,
                    from: from,
                };
                gdk.panel.setArgs(PanelId.EquipTips, tipsArgs);
                gdk.panel.open(PanelId.EquipTips);
                break;

            case BagType.JEWEL:
                gdk.panel.setArgs(PanelId.JewelTips, item);
                gdk.panel.open(PanelId.JewelTips);
                break;

            case BagType.HERO:
                // gdk.gui.showMessage(ConfigManager.getItemById(HeroCfg, item.itemId).name);
                gdk.panel.open(PanelId.HeroDetail, (node: cc.Node) => {
                    let comp = node.getComponent(HeroDetailViewCtrl);
                    comp.initHeroInfo(ConfigManager.getItemById(HeroCfg, item.itemId));
                });
                break;

            case BagType.RUNE:
                gdk.panel.setArgs(PanelId.RuneInfo, [item.itemId, null, null]);
                gdk.panel.open(PanelId.RuneInfo);
                break;
            case BagType.COSTUME:
                let tipsInfo: CostumeTipsType = {
                    itemInfo: item,
                    from: from,
                };
                gdk.panel.setArgs(PanelId.CostumeTips, tipsInfo)
                gdk.panel.open(PanelId.CostumeTips)
                break;
            case BagType.GUARDIAN:
                let guardian = item.extInfo as icmsg.Guardian;
                if (!guardian) {
                    let cfg = ConfigManager.getItemById(GuardianCfg, item.itemId);
                    guardian = new icmsg.Guardian();
                    guardian.id = 0;
                    guardian.level = 1;
                    guardian.star = cfg.star_min;
                    guardian.type = cfg.id;
                }
                gdk.panel.setArgs(PanelId.GuardianInfoTip, guardian, guardian.id == 0);
                gdk.panel.open(PanelId.GuardianInfoTip);
                break;
            case BagType.GUARDIANEQUIP:
                let guardianEquip = item.extInfo as icmsg.GuardianEquip
                if (!guardianEquip) {
                    return
                }
                //?????????????????????
                let guardianEquipTips: GuardianEquipTipsType = {
                    itemInfo: item,
                    from: from,
                };
                gdk.panel.open(PanelId.GuardianEquipTips, null, null, { args: guardianEquipTips });
                break
            case BagType.ENERGSTONE:
                let obj: EnergyStoneInfo = {
                    slot: -2,
                    itemId: item.itemId,
                    itemNum: item.itemNum
                }
                gdk.panel.setArgs(PanelId.BYTechStoneInfoView, [obj, null]);
                gdk.panel.open(PanelId.BYTechStoneInfoView);
                break;
            case BagType.UNIQUEEQUIP:
                let uniqueCfg = ConfigManager.getItemById(UniqueCfg, item.itemId)
                let uniqueEquip = new icmsg.UniqueEquip()
                uniqueEquip.id = -1
                uniqueEquip.itemId = uniqueCfg.id
                uniqueEquip.star = 0//uniqueCfg.star_max
                gdk.panel.setArgs(PanelId.UniqueEquipTip, uniqueEquip)
                gdk.panel.open(PanelId.UniqueEquipTip)
                break;
        }
    }

    /**???????????????????????? */
    openGainWayTips(itemId, target?) {
        gdk.panel.setArgs(PanelId.GainWayTips, itemId, [])
        gdk.panel.open(PanelId.GainWayTips)
        if (target) {
            target.close()
        }
    }

    /**??????2???????????????????????? */
    openAskPanel(info: AskInfoType) {
        if (info.isShowTip && info.tipSaveCache && info.sureCb) {
            let loginModel = ModelManager.get(LoginModel);
            if (loginModel.operateMap[info.tipSaveCache]) {
                if (info.tipSaveCache == AskInfoCacheType.tower_check_tip) {
                    info.closeCb();
                } else {
                    info.sureCb();
                }
                return;
            }
        }

        gdk.panel.open(PanelId.AskPanel, (node: cc.Node) => {
            let comp: AskPanel = node.getComponent(AskPanel)
            comp.updatePanelInfo(info)
        })
    }

    /**????????????????????????,??????????????? */
    openTipsPanel(info: TipType) {
        gdk.panel.open(PanelId.TipsPanel, (node: cc.Node) => {
            let comp: TipsPanel = node.getComponent(TipsPanel)
            comp.showTips(info)
        })
    }

    /**
     * ????????????????????????
     * @param id 
     */
    openLimitGiftPanel() {
        if (gdk.panel.isOpenOrOpening(PanelId.LimitGiftView)) return;
        gdk.panel.open(PanelId.LimitGiftView);
    }

    /**??????????????????????????????????????????(????????????)
     * number ??????
     * isChange ???????????? ???????????????K???????????????M???????????????B
     * useFont ?????????????????????????????????( K = : ) (M = ;) (B = <)
    */
    numberToStr2(number: number, isChange: boolean = false, useFont = false) {

        let text = number + ""
        if (isChange) {
            if (number > 1000 * 1000 * 1000 * 1000) {
                text = `${(number / (1000 * 1000 * 1000 * 1000)).toFixed(2)}` + (useFont ? "=" : "T")
            } else if (number > 1000 * 1000 * 1000) {
                text = `${(number / (10 * 10000 * 10000)).toFixed(2)}` + (useFont ? "<" : "B")
            } else if (number >= 1000 * 1000) {
                text = `${(number / 1000000).toFixed(2)}` + (useFont ? ";" : "M")
            } else if (number >= 1000) {
                text = `${(number / 1000).toFixed(1)}` + (useFont ? ":" : "K")
            }
        } else {
            text = `${number}`
        }

        return text
    }

    /**
     * ????????????????????????
     * @param list
     * @param title
     * @param label
     * @param callback
     * @param thisArg
     */
    openRewardPreview(list: icmsg.GoodsInfo[], title?: string, label?: string, callback?: Function, thisArg?: any) {
        if (!list) return;
        if (!list.length) return;
        gdk.panel.open(PanelId.RewardPreview, (node: cc.Node) => {
            let ctrl = node.getComponent(RewardPreviewCtrl);
            ctrl.setRewards(list, title, label, callback, thisArg);
        });
    }

    /**????????????????????????
     * @param list ????????????
     * @param showType ??????????????????
     */
    openRewadrView(list: icmsg.GoodsInfo[], showType: RewardType = RewardType.NORMAL, extraInfo: any = {}, bagItems: BagItem[] = [], isSort: boolean = true) {
        if (list.length == 0) {
            return
        }

        let privilegeGoods = [];
        let normalGoods = [];
        list.forEach(goods => {
            if (goods['up']) privilegeGoods.push(goods);
            else normalGoods.push(goods);
        });
        if (isSort) {
            list = this.sortGoodsInfo(privilegeGoods).concat(this.sortGoodsInfo(normalGoods));
        }
        else {
            list = privilegeGoods.concat(normalGoods);
        }

        let heroList = []
        let itemList = []
        let guardianList = [];
        for (let i = 0; i < list.length; i++) {
            let typeId = list[i].typeId.toString().length >= 8 ? parseInt(list[i].typeId.toString().slice(0, 6)) : list[i].typeId;
            let type = BagUtils.getItemTypeById(typeId)
            if (type == BagType.HERO) {
                heroList.push(list[i])
            } else if (type == BagType.GUARDIAN) {
                guardianList.push(list[i])
            } else {
                itemList.push(list[i])
            }
        }
        //let guideModel = this.guideModel
        //????????????
        let showItemGetView = function () {
            let info: RewardInfoType = {
                goodList: list,
                showType: showType,
                bagItems: bagItems
            }
            gdk.panel.open(PanelId.Reward, (node: cc.Node) => {
                let comp = node.getComponent(RewardCtrl)
                comp.initRewardInfo(info, null, extraInfo)
            })
        }
        if (heroList.length > 0) {
            //??????????????????????????? ???????????????
            if (guardianList.length > 0) {
                let cb = () => {
                    this.openGuardianRewardView(guardianList, showItemGetView);
                }
                this.openHeroRewardView(heroList, cb)
            }
            else {
                this.openHeroRewardView(heroList, showItemGetView)
            }
        } else if (guardianList.length > 0) {
            //??????????????????????????? ???????????????
            this.openGuardianRewardView(guardianList, showItemGetView)
        } else {
            //??????????????????
            showItemGetView()
        }
    }

    /**
     * ????????????????????????
     * @param id ????????????id
     */
    openHeroRewardView(list, callFunc?) {
        this.lotteryModel.resultGoods = list
        this.lotteryModel.showGoodsId = []
        this.lotteryModel.showGoodsInfo = {};

        //?????????id--num??????
        let showGoodsInfo = this.lotteryModel.showGoodsInfo;
        for (let i = 0; i < list.length; i++) {
            let typeId = list[i].typeId.toString().length >= 8 ? parseInt(list[i].typeId.toString().slice(0, 6)) : list[i].typeId;
            let cfg = BagUtils.getConfigById(typeId)
            if (cfg) {
                if (!showGoodsInfo[list[i].typeId]) {
                    showGoodsInfo[list[i].typeId] = list[i].num
                } else {
                    showGoodsInfo[list[i].typeId] += list[i].num
                }
            }
        }
        //?????????????????????
        if (Object.keys(showGoodsInfo).length > 0) {
            gdk.panel.open(PanelId.HeroReward, (node: cc.Node) => {
                let comp = node.getComponent(HeroGetCtrl)
                comp.isLotteryShow = true
                if (callFunc) {
                    comp.callFunc = callFunc
                }
                comp.showLotteryResult()

                //??????
                if (this.isSoundOn) {
                    if (list.length > 0) {
                        let info = list[0]
                        let typeId = info.typeId.toString().length >= 8 ? parseInt(info.typeId.toString().slice(0, 6)) : info.typeId;
                        let heroCfg = ConfigManager.getItemById(HeroCfg, typeId)
                        let star = info.typeId.toString().length >= 8 ? parseInt(info.typeId.toString().slice(6)) : heroCfg.star_min;
                        if (star >= 4) {
                            this.isSoundOn && gdk.sound.play(gdk.Tool.getResIdByNode(node), ButtonSoundId.result)
                        } else {
                            this.isSoundOn && gdk.sound.play(gdk.Tool.getResIdByNode(node), ButtonSoundId.common)
                        }
                    }
                }

            })
        } else {
            //???????????????????????????
            this.openRewadrView(list)
        }
    }

    /**
     * ????????????????????????
     * @param id ????????????id
     */
    openGuardianRewardView(list, callFunc?) {
        this.lotteryModel.resultGoods = list
        this.lotteryModel.showGoodsId = []
        this.lotteryModel.showGoodsInfo = {};

        //?????????id--num??????
        let showGoodsInfo = this.lotteryModel.showGoodsInfo;
        for (let i = 0; i < list.length; i++) {
            //let typeId = list[i].typeId.toString().length >= 8 ? parseInt(list[i].typeId.toString().slice(0, 6)) : list[i].typeId;
            let cfg = ConfigManager.getItemById(GuardianCfg, list[i].typeId);
            if (cfg) {
                if (!showGoodsInfo[list[i].typeId]) {
                    showGoodsInfo[list[i].typeId] = list[i].num
                } else {
                    showGoodsInfo[list[i].typeId] += list[i].num
                }
            }
        }
        //?????????????????????
        let temLength = Object.keys(showGoodsInfo).length
        if (temLength > 0) {
            gdk.panel.open(PanelId.GuardianReward, (node: cc.Node) => {
                let comp = node.getComponent(GuardianGetCtrl)
                comp.isLotteryShow = true
                if (callFunc) {
                    comp.callFunc = callFunc
                }
                comp.showLotteryResult()
            })
        } else {
            //???????????????????????????
            this.openRewadrView(list)
        }
    }


    /**??????????????????
     * @param skillId ??????id
     */
    getSkillIcon(skillId: number) {
        let cfg = ConfigManager.getItemByField(SkillCfg, "skill_id", skillId, null)
        if (!cfg) {
            return ""
        }
        let icon = cfg.icon || ""
        let path = `icon/skill/${icon}`
        return path
    }

    /**???????????????????????????
    * iconType  0 ??????  1 ??????
   */
    // getCareerSoldierIcon(heroInfo: HeroInfo, iconType: number = 0) {
    //     let careerLv = HeroUtils.getHeroJobLv(heroInfo.heroId, heroInfo.careerId)
    //     if (careerLv == -1) {
    //         let careers = heroInfo.careers
    //         for (let i = 0; i < careers.length; i++) {
    //             if (careers[i].careerId == heroInfo.careerId) {
    //                 careerLv = careers[i].careerLv
    //             }
    //         }
    //     }
    //     let careerCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", heroInfo.careerId, { career_lv: careerLv })
    //     if (iconType == 0) {
    //         return `view/role/texture/careerIcon/rank_${careerCfg.rank}_${careerLv == 0 ? 0 : 1}`
    //     }
    //     let cfg = ConfigManager.getItemById(SoldierCfg, heroInfo.soldierId);
    //     return `view/role/texture/careerIcon/type_${careerCfg.rank}_${cfg.type}`
    // }

    /** ?????????????????????*/
    // getCareerLvIcon(heroInfo: HeroInfo) {
    //     let careerLv = HeroUtils.getHeroJobLv(heroInfo.heroId, heroInfo.careerId)
    //     if (careerLv == -1) {
    //         let careers = heroInfo.careers
    //         for (let i = 0; i < careers.length; i++) {
    //             if (careers[i].careerId == heroInfo.careerId) {
    //                 careerLv = careers[i].careerLv
    //             }
    //         }
    //     }
    //     if (careerLv == 0) {
    //         return ""
    //     }
    //     return `view/role/texture/careerIcon/level_${careerLv}`
    // }

    getHeroCareerLv(heroInfo: icmsg.HeroInfo) {
        // let careerLv = HeroUtils.getHeroJobLv(heroInfo.heroId, heroInfo.careerId)
        // if (careerLv == -1) {
        //     let careers = heroInfo.careers
        //     for (let i = 0; i < careers.length; i++) {
        //         if (careers[i].careerId == heroInfo.careerId) {
        //             careerLv = careers[i].careerLv
        //         }
        //     }
        // }
        return heroInfo.careerLv
    }

    // getCareerSoldierIconById(careerId, careerLv, soldierId: number = 0, iconType: number = 0) {
    //     let careerCfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", careerId, { career_lv: careerLv })
    //     if (iconType == 0) {
    //         return `view/role/texture/careerIcon/rank_${careerCfg.rank}_${careerLv == 0 ? 0 : 1}`
    //     }
    //     let cfg = ConfigManager.getItemById(SoldierCfg, soldierId);
    //     return `view/role/texture/careerIcon/type_${careerCfg.rank}_${cfg.type}`
    // }

    // getCareerLvIconById(careerLv) {
    //     if (careerLv == 0) {
    //         return ""
    //     }
    //     return `view/role/texture/careerIcon/level_${careerLv}`
    // }

    /**?????????????????? */
    getSoldierClassIconById(id) {
        if (id == 0) {
            return ""
        }
        return `view/role/texture/soldier2/soldier_class_${id}`
    }

    /**?????????????????? */
    getSoldierNameColor(color, isLabeloutLine = false) {
        let colorStr = ""
        switch (color) {
            case 1:
                colorStr = isLabeloutLine ? "#44291e" : "#5effaa"
                break
            case 2:
                colorStr = isLabeloutLine ? "#292d46" : "#2df7f5"
                break
            case 3:
                colorStr = isLabeloutLine ? "#5a0000" : "#fff600"
                break
            default:
                colorStr = isLabeloutLine ? "#44291e" : "#5effaa"
                break
        }
        return colorStr
    }

    /**????????????????????????
     * @param skillId ??????id
     */
    getSkillCfg(skillId: number) {
        return ConfigManager.getItemByField(SkillCfg, "skill_id", skillId)
    }

    /**????????????????????????
     * @param skillId ??????id
     */
    getSkillLvCfg(skillId: number, lv: number) {
        return ConfigManager.getItemByField(SkillCfg, "skill_id", skillId, { level: lv })
    }

    /**????????????????????????
     * @param skillId ??????id
     */
    getSkillMaxLv(skillId: number) {
        let list = ConfigManager.getItemsByField(SkillCfg, "skill_id", skillId)
        return list.length
    }

    /**
     * ???????????????
     * @param target ????????????,????????????node?????????????????????????????????
     * @param btns ??????????????????
     * @param info ??????????????????
     */
    openBtnMenu(target: cc.Node = null, btns: BtnMenuType[], info: BtnTypePlayer) {
        if (btns.length == 0) {
            return
        }
        let node = gdk.panel.get(PanelId.BtnMenu)
        if (!node) {
            gdk.panel.open(PanelId.BtnMenu, (node: cc.Node) => {
                let comp = node.getComponent(BtnMenuCtrl)
                comp.showBtns(target, btns, info)
            })
        }
    }


    /**
    * ????????????tip
    * @param target ????????????,????????????node?????????????????????????????????
    */
    openCareerTip(target: cc.Node = null, type) {
        let panel = gdk.panel.get(PanelId.CareerTip)
        if (panel) {
            let comp = panel.getComponent(CareerTipCtrl)
            comp.showTip(target, type)
        } else {
            gdk.panel.open(PanelId.CareerTip, (node: cc.Node) => {
                let comp = node.getComponent(CareerTipCtrl)
                comp.showTip(target, type)
            })
        }
    }


    /**
   * ????????????tip
   * @param target ????????????,????????????node?????????????????????????????????
   */
    openCommonInfoTip(target: cc.Node = null, itemId, desc = '') {
        let panel = gdk.panel.get(PanelId.CommonInfoTip)
        if (panel) {
            let comp = panel.getComponent(CommonInfoTipCtrl)
            comp.showTip(target, itemId, desc)
        } else {
            gdk.panel.open(PanelId.CommonInfoTip, (node: cc.Node) => {
                let comp = node.getComponent(CommonInfoTipCtrl)
                comp.showTip(target, itemId, desc)
            })
        }
    }

    /**
     * ??????????????????   ?????? > ??????????????? > ???????????? > ?????? > ??????id
     * @param list 
     */
    sortGoodsInfo(list: icmsg.GoodsInfo[]): icmsg.GoodsInfo[] {
        // ????????????
        let tempList: any[] = [];
        let coin: any[] = [];
        let commandExp: any;
        let heroExp: any[] = [];
        let temp2: any[] = [];
        for (let i = 0, n = list.length; i < n; i++) {
            let typeId = list[i].typeId;
            if (typeId == 1) commandExp = list[i];
            else if (typeId == 3) coin.push(list[i]);
            else if (typeId == 10) heroExp.push(list[i]);
            else temp2.push(list[i]);
        }

        // ?????? > ??????????????? > ????????????
        tempList = coin;
        commandExp && tempList.push(commandExp);
        tempList = tempList.concat(...heroExp);

        // ?????? > ??????id
        temp2.sort((a, b) => {
            let typeIdA = a.typeId.toString().length >= 8 ? parseInt(a.typeId.toString().slice(0, 6)) : a.typeId;;
            let typeIdB = b.typeId.toString().length >= 8 ? parseInt(b.typeId.toString().slice(0, 6)) : b.typeId;;
            let cfgA = BagUtils.getConfigById(typeIdA);
            let cfgB = BagUtils.getConfigById(typeIdB);
            if (cfgA.defaultColor == cfgB.defaultColor) return cfgB.id - cfgA.id;
            else return cfgB.defaultColor - cfgA.defaultColor;
        })
        return tempList.concat(...temp2);
    }

    /**??????id????????????/??????????????????
     * @param id ????????????id
     * @param type ????????????
     */
    getQualityById(id: number, type?: BagType): string {
        let itemCfg = BagUtils.getConfigById(id);
        let path = itemCfg.defaultColor > 0 ? `common/texture/sub_itembg0${itemCfg.defaultColor}` : null;
        return path;
    }

    /**??????id????????????/??????/????????????
     * @param id ????????????id
     * @param type ????????????
     */
    getIconById(id: number, type?: BagType): string {
        if (!type) {
            type = BagUtils.getItemTypeById(id)
        }
        let path = ""
        let itemConfig = <any>BagUtils.getConfigById(id, type)
        if (!itemConfig) {
            return ""
        }
        switch (type) {
            case BagType.MONEY:
                path = `icon/item/${itemConfig.icon}`
                break;
            case BagType.EQUIP:
            case BagType.COSTUME:
            case BagType.UNIQUEEQUIP:
                path = `icon/equip/${itemConfig.icon}`
                break
            case BagType.HERO:
                path = `icon/hero/${itemConfig.icon}_s`
                break
            case BagType.MONSTER:
                path = `icon/monster/${itemConfig.icon}`
                break
            // case BagType.RUNE:
            //     path = `icon/rune/${itemConfig.icon}`
            //     break
            case BagType.GUARDIAN:
                path = `icon/guardian/${itemConfig.icon}`
                break
            default:
                path = `icon/item/${itemConfig.icon}`
                break;
        }
        return path
    }

    /**??????????????? */
    getSmallMoneyIcon(id: number) {
        let itemConfig = <any>BagUtils.getConfigById(id, BagType.MONEY)
        if (!itemConfig) {
            return ""
        }
        let path = `common/texture/${itemConfig.icon}`
        return path
    }

    /*????????????????????????*/
    getHeadIconById(head: number) {
        if (!head) {
            return `icon/hero/300000${ModelManager.get(RoleModel).gender == 1 ? 'nv' : ''}_s`;
        }
        let heroCfg = ConfigManager.getItemById(HeroCfg, head);
        if (heroCfg) {
            return this.getIconById(heroCfg.id, BagType.HERO);
        }
        if (head >= 310000) {
            return `icon/hero/${head}_s`
        }
        return `icon/hero/300000${ModelManager.get(RoleModel).gender == 1 ? 'nv' : ''}_s`;
    }

    /*???????????????????????????*/
    getHeadFrameById(headFrame: number) {
        let frameCfg = ConfigManager.getItemById(HeadframeCfg, headFrame);
        if (frameCfg && frameCfg.icon) {
            return `icon/headframe/${frameCfg.icon}`;
        }
        return "common/texture/sub_touxiangkuang";
        // return `common/texture/sub_itembg0${headFrame}`;
    }

    /**?????????????????? */
    getHeadTitleById(titleId) {
        let titleCfg = ConfigManager.getItemById(Headframe_titleCfg, titleId);
        if (titleCfg && titleCfg.icon) {
            return `icon/headframe/${titleCfg.icon}`;
        }
        return ''
    }

    /**??????????????????
     * @param careerId ????????????
     */
    getCareerIcon(careerId: number): string {
        let icon = ""
        let cfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", careerId, null)
        if (cfg) {
            icon = `icon/career/${cfg.icon}`
        }
        return icon
    }

    /**??????????????????
     * @param careerId
     */
    getCareerName(careerId: number): string {
        let str = ""
        let cfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", careerId, null)
        if (cfg) {
            str = cfg.name
        }
        return str
    }

    /**????????????????????????
     * @param careerId ??????id
     */
    getCareerRankName(heroId: number, careerId: number): string {
        let rankName = "";
        // let level = HeroUtils.getHeroJobLv(heroId, careerId)
        // let cfg = ConfigManager.getItemByField(Hero_careerCfg, "career_id", careerId, { career_lv: level });
        // if (cfg) {
        //     let rankNameArr = ["??????", "??????", "??????"];
        //     rankName = `${rankNameArr[cfg.rank]}`;
        //     //if (cfg.career_lv > 0) {
        //     rankName += `+${cfg.career_lv + 1}`;
        //     //}
        // }
        return rankName
    }

    /**??????????????????
     * @param soldierId ????????????
     */
    getSoldierIcon(soldierId: number, isSmall: boolean = false): string {
        let icon = "";
        let cfg;
        if (soldierId < 1000) {
            cfg = ConfigManager.getItemById(SoldierCfg, soldierId);
            if (cfg) {
                icon = `icon/soldier/${cfg.icon}`;
            }
            if (isSmall) {
                icon = icon + "_s";
            }
        } else {
            cfg = ConfigManager.getItemById(Monster2Cfg, soldierId);
            if (cfg) {
                icon = `icon/soldier/${cfg.icon}`;
            }
        }
        return icon;
    }

    /**????????????????????????
     * @param soldierId
     */
    getSoldierTypeIcon(soldierId: number): string {
        let icon = "";
        if (soldierId < 1000) {
            let cfg = ConfigManager.getItemById(SoldierCfg, soldierId);
            if (cfg) {
                icon = `icon/soldier/type_${cfg.type}`;
            } else {
                icon = `icon/soldier/type_${soldierId}`;
            }
        } else {
            let cfg = ConfigManager.getItemById(Monster2Cfg, soldierId);
            if (cfg) {
                icon = `icon/soldier/type_${cfg.show_type}`;
            }
        }
        return icon;
    }

    /**??????????????????????????????????????????
     * @param state 0:?????? 1:??????
     */
    setAllNodeGray(node: cc.Node, state: 0 | 1 = 0) {
        this.setGrayState(node, state);
        let n = node.childrenCount;
        if (n > 0) {
            let children = node.children;
            for (let i = 0; i < n; i++) {
                const child = children[i];
                if (cc.isValid(child) && child.active) {
                    this.setAllNodeGray(child, state);
                }
            }
        }
    }

    /**????????????/??????
     * @param state 0:?????? 1:??????
     */
    setGrayState(node: cc.Node | cc.Sprite | cc.Label, state: 0 | 1 = 0) {
        if (!node) {
            return
        }
        let sprite: cc.Sprite | cc.Label = null
        if (node instanceof cc.Node) {
            sprite = node.getComponent(cc.Sprite)
            if (!sprite) {
                sprite = node.getComponent(cc.Label)
            }
        } else if (node instanceof cc.Sprite) {
            sprite = node
        } else if (node instanceof cc.Label) {
            sprite = node
        }
        if (sprite && this.getGrayState(sprite) != state) {
            sprite.setMaterial(
                0,
                cc.Material['getBuiltinMaterial'](
                    state == 1 ? '2d-gray-sprite' : '2d-sprite'
                ),
            );
        }
    }

    getGrayState(node: cc.Node | cc.Sprite | cc.Label): 0 | 1 {
        if (!node) {
            return 0
        }
        let sprite: cc.Sprite | cc.Label = null
        if (node instanceof cc.Node) {
            sprite = node.getComponent(cc.Sprite)
        } else if (node instanceof cc.Sprite) {
            sprite = node
        } else if (node instanceof cc.Label) {
            sprite = node
        }
        if (sprite) {
            let m = sprite.getMaterial(0);
            let b = !m || StringUtils.startsWith(m.name, 'builtin-2d-sprite');
            return b ? 0 : 1;
        }
        return 0;
    }

    /**????????????spine */
    setSoldierSpineData(resNode: cc.Node, spine: sp.Skeleton, skin: string, release: boolean = true, standDir: string = "stand_s", isFadeIn: boolean = true) {
        let url: string = StringUtils.format(PveRes.PVE_SOLDIER_RES, skin);
        this.setSpineData(resNode, spine, url, release, standDir, true, isFadeIn);
    }

    /**????????????spine ??????UI????????????????????????*/
    setUiSoldierSpineData(resNode: cc.Node, spine: sp.Skeleton, skin: string, release: boolean = true, standDir: string = "stand_s", isFadeIn: boolean = true) {
        let url: string = StringUtils.format("spine/monster/{0}/ui/{0}", skin);
        this.setSpineData(resNode, spine, url, release, standDir, true, isFadeIn);
    }

    /**
     * ??????spine????????????
     * @param resNode
     * @param spine
     * @param url
     * @param release
     * @param animation
     * @param loop
     * @param isFadeIn
     * @param callback
     */
    setSpineData(
        resNode: cc.Node,
        spine: sp.Skeleton,
        url: string,
        release?: boolean,
        animation?: string,
        loop?: boolean,
        isFadeIn?: boolean,
        callback?: (spine?: sp.Skeleton) => void,
    ) {
        const flag = '$curr_spine_path$';
        const cbflag = '$curr_spine_callback$';
        const cbargs = '$curr_spine_args$';
        let resId: string = gdk.Tool.getResIdByNode(resNode);
        let res = spine.skeletonData;
        if (res && url && res === gdk.rm.getResByUrl(url, sp.SkeletonData)) {
            // ???????????????resId??????????????????
            gdk.rm.loadRes(resId, url, sp.SkeletonData);
            if (spine.animation != animation) {
                spine.loop = loop;
                spine.animation = animation;
            }
            callback && callback(spine);
        } else if (url && spine[flag] == url) {
            // ???????????????????????????????????????????????????
            spine[cbflag] = callback;
            spine[cbargs] = [release, animation, loop, isFadeIn];
        } else {
            // ??????SkeletonData??????
            if (release) {
                // ??????????????????
                if (res) {
                    // ?????????????????????
                    gdk.rm.releaseRes(resId, res, sp.SkeletonData);
                } else if (spine[flag] && spine[flag] != url) {
                    // ?????????????????????
                    gdk.rm.releaseRes(resId, spine[flag], sp.SkeletonData);
                    delete spine[flag];
                }
            }
            spine.node.stopActionByTag(9527);
            spine.node.active = !!url;
            spine.skeletonData = null;
            spine.premultipliedAlpha = false;
            // ???????????????
            if (url) {
                spine[flag] = url;
                spine[cbflag] = callback;
                spine[cbargs] = [release, animation, loop, isFadeIn];
                gdk.rm.loadRes(resId, url, sp.SkeletonData, (res: sp.SkeletonData) => {
                    let [release, animation, loop, isFadeIn] = spine[cbargs];
                    if (cc.isValid(resNode) &&
                        cc.isValid(spine.node) &&
                        spine[flag] == url) {
                        // ??????????????????????????????????????????
                        spine.skeletonData = res;
                        spine.loop = loop;
                        spine.animation = animation;
                        if (isFadeIn) {
                            let action = cc.fadeIn(0.25);
                            action.setTag(9527);
                            spine.node.opacity = 0;
                            spine.node.runAction(action);
                        }
                        spine[cbflag] && spine[cbflag](spine);
                    } else if (release) {
                        // ????????????
                        gdk.rm.releaseRes(resId, res, sp.SkeletonData);
                    }
                    // ????????????
                    delete spine[flag];
                    delete spine[cbflag];
                    delete spine[cbargs];
                });
            } else {
                // ????????????
                delete spine[flag];
                delete spine[cbflag];
                delete spine[cbargs];
            }
        }
    }

    /**
     * ??????????????????
     * @param name
     * @param val
     * @param isSelf ??????????????????????????????
     */
    setLocal(name: string, val: any, isSelf: boolean = true) {
        let l = cc.sys.localStorage;
        if (isSelf) {
            let t = SdkTool.tool;
            let s = ModelManager.get(ServerModel).current;
            let m = ModelManager.get(RoleModel);
            let o = JSON.parse(l.getItem(name) || '{}');
            let id = `${s.serverId}#${t.channelId}#${t.account}#${m.id}`;
            o[id] = val;
            l.setItem(name, JSON.stringify(o));
        } else {
            if (typeof val === 'object') {
                val = JSON.stringify(val);
            }
            l.setItem(name, val)
        }
    }

    /**
     * ???????????????????????????
     * @param name
     * @param isSelf ????????????????????????
     * @param def ?????????
     */
    getLocal(name: string, isSelf: boolean = true, def?: any) {
        let l = cc.sys.localStorage;
        let r: any;
        if (isSelf) {
            let t = SdkTool.tool;
            let s = ModelManager.get(ServerModel).current;
            let m = ModelManager.get(RoleModel);
            let o = JSON.parse(l.getItem(name) || '{}');
            let id = `${s.serverId}#${t.channelId}#${t.account}#${m.id}`;
            r = o[id];
        } else {
            let v = l.getItem(name);
            try {
                v = JSON.parse(v);
            } catch (err) { };
            r = v;
        }
        return (r === void 0 || r === null) ? def : r;
    }



    /**
    * ??????Cookie??????
    * @param name
    * @param val
    */
    setCookie(name: string, val: any) {
        let model = ModelManager.get(RoleModel);
        let cookie = model.cookie;
        let obj = {};
        if (cookie) obj = JSON.parse(cookie);
        if (val) {
            obj[name] = val
        } else {
            if (obj[name]) delete obj[name]
        }
        model.cookie = JSON.stringify(obj);
        let req = new icmsg.RoleCookieSetReq();
        req.cookie = model.cookie;
        NetManager.send(req);
    }

    /**
     * ??????Cookie???????????????
     * @param name
     */
    getCookie(name: string) {
        let model = ModelManager.get(RoleModel);
        let cookie = model.cookie;
        let obj = {};
        if (cookie) obj = JSON.parse(cookie);
        return obj[name] || null
    }

    getColorStr(str, color) {
        let colorStr = BagUtils.getColorInfo(color).color;
        return `<color=${colorStr}>${str}</c>`
    }

    /**???????????????????????????????????????????????????????????? (???????????????global_power)
     * _w(white) ????????????
     * _g(green) ????????????
     * _r()      ????????? _w*_r??? ????????????2
     * isAddBase ???????????????????????? ????????????
     */
    getPowerValue(cfg: any, isAddBase: boolean = true): number {
        if (!cfg) return 0
        let powerValue = 0
        //?????????????????????
        let attr_wKeys = ["atk_speed_w", "atk_w", "hp_w", "def_w", "hit_w", "dodge_w", "crit_w", "hurt_w"]
        let attr_gKeys = ["atk_speed_g", "atk_g", "hp_g", "def_g", "hit_g", "dodge_g", "crit_g", "hurt_g"]
        let attr_rKeys = ["atk_speed_r", "atk_r", "hp_r", "def_r", "hit_r", "dodge_r", "crit_r", "hurt_r"]
        let attr_ulKeys = ["ul_atk_speed_w", "ul_atk_w", "ul_hp_w", "ul_def_w", "ul_hit_w", "ul_dodge_w", "ul_crit_w", "ul_hurt_w"]

        let cfg_keys = ["atk_speed", "atk", "hp", "def", "hit", "dodge", "crit", "hurt"]
        let other_keys = ["cold_res", "elec_res", "fire_res", "punc_res", "radi_res", "atk_res", "dmg_cold", "dmg_elec", "dmg_fire", "dmg_punc", "dmg_radi", "atk_dmg",
            "cold_res_fix", "elec_res_fix", "fire_res_fix", "punc_res_fix", "radi_res_fix", "atk_res_fix",
            "dmg_cold_fix", "dmg_elec_fix", "dmg_fire_fix", "dmg_punc_fix", "dmg_radi_fix", "atk_dmg_fix",
            "crit_v", "crit_v_res"]
        let vList = []
        for (let i = 0; i < attr_wKeys.length; i++) {
            let w = cfg[attr_wKeys[i]] ? cfg[attr_wKeys[i]] : 0
            let g = cfg[attr_gKeys[i]] ? cfg[attr_gKeys[i]] : 0
            let r = cfg[attr_rKeys[i]] ? cfg[attr_rKeys[i]] : 0
            let ul = cfg[attr_ulKeys[i]] ? cfg[attr_ulKeys[i]] : 0//???????????????
            vList.push((isAddBase ? w : 0) * 100 + g * 100 + (w * r / 100) + ul * 100)
        }
        //??????
        for (let j = 0; j < cfg_keys.length; j++) {
            let config = ConfigManager.getItemById(Global_powerCfg, cfg_keys[j])
            powerValue += (cfg[cfg_keys[j]] ? cfg[cfg_keys[j]] : 0) * (config && config.value ? config.value : 0) * 100
        }

        //??????
        for (let j = 0; j < cfg_keys.length; j++) {
            let config = ConfigManager.getItemById(Global_powerCfg, cfg_keys[j])
            powerValue += vList[j] * (config && config.value ? config.value : 0)
        }

        //?????? ???????????????????????????
        for (let j = 0; j < other_keys.length; j++) {
            let config = ConfigManager.getItemById(Global_powerCfg, other_keys[j])
            powerValue += (cfg[other_keys[j]] ? cfg[other_keys[j]] : 0) * (config && config.value ? config.value : 0) * 100
        }

        return Math.floor(powerValue / 100);
    }

    /**
     * ???????????? ??????????????????
     * ?????? ---??????????????????
     * ??????----??????????????????
     *
     * targetArg //??????
     * popViews [] ???????????? panelId????????????
     *
     * ?????? true ????????????
     *      false ???????????????
     */
    checkMoneyEnough(value, moneyType, targetArg?, popViews?, cancelFunc?: Function, callFunc?: Function): boolean {
        let itemCfg = ConfigManager.getItemById(ItemCfg, moneyType)
        if (!itemCfg) {
            gdk.gui.showMessage("?????????????????????")
            return;
        }
        let hasNum = BagUtils.getItemNumById(moneyType);
        if (value > hasNum) {
            if ((moneyType != 2 && moneyType != 3) || !SdkTool.tool.can_charge) {
                // this.showMessageAndSound(`${itemCfg.name}??????`);
                GlobalUtil.openGainWayTips(itemCfg.id);
                return;
            }
            gdk.gui.showAskAlert(
                `??????${itemCfg.name}??????????????????????????????`,
                "??????",
                "",
                (index: number) => {
                    //????????????
                    if (index == -1) {
                        if (cancelFunc) {
                            cancelFunc.call(this)
                        }
                    } else if (index == 1) {
                        //??????
                        if (cancelFunc) {
                            cancelFunc.call(this)
                        }
                    } else {
                        //??????
                        //?????????????????????
                        if (targetArg) {
                            targetArg.close()
                        }

                        if (callFunc) {
                            callFunc.call(this)
                        }
                        // if (popViews) {
                        //     popViews.forEach(element => {
                        //         gdk.panel.hide(element)
                        //     });
                        // }
                        switch (moneyType) {
                            case 2://??????
                                {
                                    if (popViews && popViews.length > 0) {
                                        JumpUtils.openPanel({
                                            panelId: PanelId.Recharge,
                                            panelArgs: { args: 3 },
                                            currId: popViews[0],
                                        });
                                    } else {
                                        JumpUtils.openRechargeView([3]);
                                    }

                                    break
                                }
                            case 3://??????
                                {
                                    if (popViews && popViews.length > 0) {
                                        JumpUtils.openPanel({
                                            panelId: PanelId.Alchemy,
                                            currId: popViews[0],
                                        });
                                    } else {
                                        JumpUtils.openAlchemyView(null);
                                        // JumpUtils.openStore([StoreMenuType.Gold])
                                    }
                                    break
                                }
                        }
                    }
                }, this, {
                cancel: "??????",
                ok: "??????"
            }
            )
            return false
        }

        return true
    }

    /**????????????????????? */
    getMoneyNum(moneyType): number {
        let roleModel = ModelManager.get(RoleModel);
        return roleModel[AttTypeName[moneyType]];
    }

    /**
     * ??????????????????????????????
     * @param list
     * @param delayShow //??????????????????
     * @param effect //??????????????????
     * @param showCommonEffect //??????????????????????????????
     * @param cxEffect //????????????????????????
     * @param isGet //????????????????????????????????????????????????
     */
    getEffectItemList(list: Array<icmsg.GoodsInfo>, delayShow: boolean = false, effect: boolean = false, showCommonEffect: boolean = false, cxEffect: boolean = true, isGet: boolean = false) {
        let newList = []
        list.forEach((element, index) => {
            newList.push({
                index: index,
                typeId: element.typeId,
                num: element.num,
                delayShow: delayShow,
                effect: effect,
                showCommonEffect: showCommonEffect,
                cxEffect: cxEffect,
                up: element['up'],
                isGet: isGet,
            });
        });
        return newList
    }

    /**???????????????????????? */
    getEquipPower(bagItem: BagItem) {
        //???????????????
        let basePower = 0
        let equipCfg = ConfigManager.getItemById(Item_equipCfg, bagItem.itemId)
        basePower += this.getPowerValue(equipCfg)
        if (equipCfg.power && equipCfg.power > 0) {
            basePower += equipCfg.power
        }
        return basePower
    }

    /**??????system??????id??????????????? */
    getSysFbLimitStr(id: any) {
        let cfg = CopyUtil.getStageConfig(id);
        let str = '';
        if (cfg.copy_id == CopyType.MAIN) {
            str = `????????????${CopyUtil.getChapterId(id)}-${CopyUtil.getSectionId(id)}??????`;
        }
        else if (cfg.copy_id == CopyType.Rune) {
            str = `??????????????????-${cfg.name}??????`;
        }
        return str;
    }

    /**???????????? ??????????????? */
    showMessageAndSound(tips: string, targetNode?: cc.Node, soundId: ButtonSoundId = ButtonSoundId.invalid) {
        gdk.gui.showMessage(tips)
        let currNode = targetNode ? targetNode : gdk.gui.getCurrentView()
        this.isSoundOn && gdk.sound.play(gdk.Tool.getResIdByNode(currNode), soundId);
    }

    // ????????????
    get isSoundOn(): boolean {
        return gdk.sound.isOn;
        // return (ModelManager.get(RoleModel).setting & (1 << RoleSettingValue.Effect)) == 0;
    }

    // ????????????
    get isMusicOn(): boolean {
        return gdk.music.isOn;
        // return (ModelManager.get(RoleModel).setting & (1 << RoleSettingValue.Music)) == 0;
    }

    /**vip????????????vip?????? */
    getVipLv(exp): number {
        let vigCfgs = ConfigManager.getItems(VipCfg)
        for (let i = vigCfgs.length - 2; i >= 0; i--) {
            if (exp >= vigCfgs[i].exp) {
                return vigCfgs[i].level + 1
            }
        }
        return 0
    }

    saveOperateMap(key: string, isActive: boolean) {
        this.loginModel.operateMap[key] = isActive
    }

    //?????????????????????
    makeItemDes(item_id: number) {
        let cfg = <ItemCfg>BagUtils.getConfigById(item_id);
        let str = '';
        if (cfg instanceof Tech_stoneCfg) {
            str = GlobalUtil.getSkillCfg(cfg.unique[0]).des;
        } else if (cfg instanceof HeroCfg) {
            str = cfg.desc
        }
        else {
            str = cfg.des;
            let args = cfg.func_args;
            let n: number = args ? args.length : 0;
            let func_args = "func_args";
            let disint_item = "disint_item";
            if (n > 0) {
                for (let i = 0; i < n; i++) {
                    str = StringUtils.replace(str, "{" + func_args + "}", args[i]);
                }
            } else {
                //???????????????
                if (cfg.func_args == "" && cfg.disint_item.length > 0) {
                    let num = cfg.disint_item[0][1];
                    str = StringUtils.replace(str, "{" + disint_item + "}", num);
                }
            }
        }
        return str;
    }

    /**
     *
     * @param color ?????????????????? ????????????????????????isLabeloutLine ??? true ??????????????????
     * @param isLabeloutLine
     */
    getHeroNameColor(color, isLabeloutLine = false) {
        let colorStr = ""
        switch (color) {
            case 1:
                colorStr = isLabeloutLine ? "#1d620a" : "#d1ffd1"
                break
            case 2:
                colorStr = isLabeloutLine ? "#3171c7" : "#c3f2ff"
                break
            case 3:
                colorStr = isLabeloutLine ? "#b019b6" : "#ffd1fb"
                break
            case 4:
                colorStr = isLabeloutLine ? "#c65827" : "#fff9c3"
                break
            case 5:
                colorStr = isLabeloutLine ? "#b91314" : "#ffa78f"
                break
            default:
                colorStr = isLabeloutLine ? "#b91314" : "#ffa78f"
                break
        }
        return colorStr
    }

    /**
     * ?????? ????????? ?????? ????????? ??????????????????
     * */
    getDropAddNum(cfg: Copy_stageCfg, itemId) {
        for (let i = 0; i < cfg.bonus.length; i++) {
            if (cfg.bonus[i][0] == itemId) {
                if (cfg.bonus[i][2]) {
                    return [cfg.bonus[i][1], cfg.bonus[i][2]]
                } else {
                    return [cfg.bonus[i][1], 0]
                }

            }
        }
        return [0, 0]
    }

    /**
     * ????????????id???????????????id
     * @param playerId 
     */
    getSeverIdByPlayerId(playerId: number) {
        return Math.floor((playerId % (10000 * 100000)) / 100000)
    }

    /**
    * ????????????id???????????????id
    * @param guildId 
    */
    getSeverIdByGuildId(guildId: number) {
        return Math.floor((guildId % (10000 * 10000)) / 10000)
    }

    /** 
     * ????????????id????????????id
    */
    getChannelIdByPlayerId(playerId: number) {
        return Math.floor((playerId / (10000 * 100000)))
    }

    /**
   * ????????????id????????????id
   * @param guildId 
   */
    getChannelIdByGuildId(guildId: number) {
        return Math.floor((guildId / (10000 * 10000)))
    }

    getGeneralSkillLv(skillId) {
        let lv = 0
        let generalModel = ModelManager.get(GeneralModel)
        let skills = generalModel.generalInfo.skills
        for (let i = 0; i < skills.length; i++) {
            if (skills[i].skillId == skillId) {
                lv = skills[i].skillLv
                break
            }
        }
        return lv
    }

    /**
     * ??????????????????
     * @param isBig ?????????
     */
    getGroupIcon(group: number, isBig: boolean = true) {
        return `icon/group/group${group}` + `${isBig ? '' : '_s'}`;
    }
}

// ?????????????????????
export const CommonNumColor = {
    red: cc.color("#FF1D1D"),
    green: cc.color("#5EE015"),
    white: cc.color("#FFFFFF"),
}

// ???????????????
gdk.Tool.destroySingleton(iclib.GlobalUtilClass);
const GlobalUtil = gdk.Tool.getSingleton(GlobalUtilClass);
iclib.addProp('GlobalUtilClass', GlobalUtilClass);
iclib.addProp('GlobalUtil', GlobalUtil);
export default GlobalUtil;

