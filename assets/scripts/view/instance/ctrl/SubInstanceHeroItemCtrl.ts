import BagUtils from '../../../common/utils/BagUtils';
import GlobalUtil from '../../../common/utils/GlobalUtil';
import GuideUtil from '../../../common/utils/GuideUtil';
import InstanceModel from '../model/InstanceModel';
import JumpUtils from '../../../common/utils/JumpUtils';
import ModelManager from '../../../common/managers/ModelManager';
import NetManager from '../../../common/managers/NetManager';
import UiListItem from '../../../common/widgets/UiListItem';
import UiSlotItem from '../../../common/widgets/UiSlotItem';
import { Copy_stageCfg } from '../../../a/config';
import { InstanceEventId } from '../enum/InstanceEnumDef';

/**
 * @Description: 英雄副本列表子项
 * @Author: yaozu.hu
 * @Date: 2020-09-22 15:53:11
 * @Last Modified by: luoyong
 * @Last Modified time: 2020-12-22 12:38:51
 */
const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("qszc/view/instance/SubInstanceHeroItemCtrl")
export default class SubInstanceHeroItemCtrl extends UiListItem {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    listItem: cc.Prefab = null;

    @property(cc.Node)
    RaidBtn: cc.Node = null;

    @property(cc.Node)
    attackBtn: cc.Node = null;
    @property(cc.Node)
    lockNode: cc.Node = null;

    @property(cc.Node)
    tips: cc.Node = null;

    @property(cc.Label)
    stageNum: cc.Label = null;

    @property(cc.Node)
    redNode: cc.Node = null;

    lock = false;
    private info: { curStageId: number, stageData: Copy_stageCfg, raidNum: number, curIndex: number }
    get model() { return ModelManager.get(InstanceModel); }

    updateView() {
        this.info = this.data;
        this.RaidBtn.active = false;
        this.attackBtn.active = false;
        this.lockNode.active = false;
        this.tips.active = false;
        this.redNode.active = false;
        GlobalUtil.setGrayState(this.lockNode, 1);
        this.lock = false;
        let state = this.info.stageData.id <= this.info.curStageId;
        let attack = (this.info.curStageId == 0 && this.curIndex == 0) || this.info.stageData.id == this.info.curStageId + 1;
        if (state) {
            this.RaidBtn.active = true;
        } else if (attack) {
            this.attackBtn.active = true;
            this.redNode.active = this.info.raidNum > 0 && this.model.heroEnterCopy.indexOf(this.info.stageData.subtype) < 0;//!this.model.heroEnterCopy
            this.tips.active = true;
            let tipLabel = this.tips.getComponent(cc.Label);
            tipLabel.string = gdk.i18n.t("i18n:INS_HERO_ITEM_TIP1")//'挑战不消耗次数'
            GuideUtil.bindGuideNode(13000, this.attackBtn);
        } else {
            this.lockNode.active = true;
            this.tips.active = true;
            let tipLabel = this.tips.getComponent(cc.Label);
            tipLabel.string = gdk.i18n.t("i18n:INS_HERO_ITEM_TIP2")//'通关前置关卡后开启'
            this.lock = true;
        }
        this.stageNum.string = (this.info.stageData.id % 1000) + '';

        this.content.removeAllChildren();
        let itemIDs: any[][] = [];
        itemIDs = this.info.stageData.id <= this.info.curStageId ? this.info.stageData.sweep : this.info.stageData.first_reward
        for (let i = 0; i < itemIDs.length; i++) {
            let temp: number[] = itemIDs[i]//BagUtils.getConfigById(itemIDs[i][0])
            //if (temp != null) {
            let node = cc.instantiate(this.listItem)
            this.content.addChild(node);
            let slot: UiSlotItem = node.getChildByName("UiSlotItem").getComponent(UiSlotItem) //.getChildByName('nameLab').getComponent(cc.Label).string = temp.name + '';
            slot.updateItemInfo(temp[0], temp[1]);
            let first = node.getChildByName("first")
            first.active = this.info.stageData.id > this.info.curStageId;
            slot.itemInfo = {
                series: temp[0],
                itemId: temp[0],
                itemNum: 1,
                type: BagUtils.getItemTypeById(temp[0]),
                extInfo: null,
            }
            //}
        }
    }

    onClick(e: cc.Event.EventTouch, param: string): void {

        //检测是否开启
        if (this.lock) {
            gdk.gui.showMessage(gdk.i18n.t("i18n:INS_RUNE_ITEM_TIP2"))
            return;
        }

        // if (this.info.allNum <= this.info.info.num) {
        //     gdk.gui.showMessage('今日次数已经用完')
        //     return;
        // }

        //设置最后进入记录
        let type = this.info.stageData.copy_id + '';
        let instanceM = ModelManager.get(InstanceModel);
        if (instanceM) {
            instanceM.instanceFailStage[type] = this.info.stageData.id
        }

        if (this.model.heroEnterCopy.indexOf(this.info.stageData.subtype) < 0) {
            this.model.heroEnterCopy.push(this.info.stageData.subtype)
        }
        this.model.heroCopyCurIndex = this.info.curIndex;

        if (this.info.stageData.type_pk == 'pvp') {
            JumpUtils.openPvpCopyScene(this.info.stageData);
        } else {
            JumpUtils.openInstance(this.info.stageData.id);
        }
    }

    //扫荡按钮点击事件
    raidsClick() {

        if (this.info.raidNum > 0) {
            let msg = new icmsg.DungeonHeroRaidReq();
            msg.stageId = this.info.stageData.id
            NetManager.send(msg, (rsp: icmsg.DungeonHeroRaidRsp) => {
                GlobalUtil.openRewadrView(rsp.rewards);
                if (this.model.heroCopySweepTimes.length > this.info.curIndex) {
                    this.model.heroCopySweepTimes[this.info.curIndex] -= 1;
                } else {
                    this.model.heroCopySweepTimes[this.info.curIndex] = 0;
                }
                gdk.e.emit(InstanceEventId.RSP_HEROCOPY_SWEEP_REFRESH)
            }, this);
        } else {
            gdk.gui.showMessage(gdk.i18n.t("i18n:INS_RUNE_ITEM_TIP6"))//('已达到今日可扫荡次数上限');
        }

    }
}
