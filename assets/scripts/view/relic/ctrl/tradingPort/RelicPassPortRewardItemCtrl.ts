import BagUtils from '../../../../common/utils/BagUtils';
import ConfigManager from '../../../../common/managers/ConfigManager';
import GlobalUtil from '../../../../common/utils/GlobalUtil';
import ModelManager from '../../../../common/managers/ModelManager';
import NetManager from '../../../../common/managers/NetManager';
import PanelId from '../../../../configs/ids/PanelId';
import RelicModel from '../../model/RelicModel';
import RelicUtils from '../../utils/RelicUtils';
import RoleModel from '../../../../common/models/RoleModel';
import UiListItem from '../../../../common/widgets/UiListItem';
import UiSlotItem from '../../../../common/widgets/UiSlotItem';
import { Relic_passCfg } from '../../../../a/config';

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("qszc/view/relic/tradingPort/RelicPassPortRewardItemCtrl")
export default class RelicPassPortRewardItemCtrl extends UiListItem {
    @property(UiSlotItem)
    freeItem: UiSlotItem = null;

    @property(UiSlotItem)
    passPortItem1: UiSlotItem = null;

    @property(UiSlotItem)
    passPortItem2: UiSlotItem = null;

    @property(cc.Node)
    progressFlag: cc.Node = null;

    @property(cc.Label)
    targetExpNum: cc.Label = null;

    @property(cc.Node)
    received: cc.Node = null;

    @property(cc.Button)
    getBtn: cc.Button = null;

    cfg: Relic_passCfg;

    onEnable() {
        NetManager.on(icmsg.RelicCertRewardRsp.MsgType, this._onRelicCertRewardRsp, this);
    }

    onDisable() {
        NetManager.targetOff(this);
    }

    updateView() {
        this.cfg = this.data;
        this.targetExpNum.string = this.cfg.point[1] + '';

        GlobalUtil.setSpriteIcon(this.node, this.progressFlag, `${ModelManager.get(RoleModel).relic >= this.cfg.point[1] ? 'view/relic/texture/tradingPort/yzzz_jingdutiao04' : 'view/relic/texture/tradingPort/txz_jingdutiao00'}`);
        //免费物品
        this.freeItem.updateItemInfo(this.cfg.reward1[0][0], this.cfg.reward1[0][1]);
        this.freeItem.itemInfo = {
            series: 0,
            itemId: this.cfg.reward1[0][0],
            itemNum: this.cfg.reward1[0][1],
            type: BagUtils.getItemTypeById(this.cfg.reward1[0][0]),
            extInfo: null,
        }
        //通行证解锁物品
        let passPortItems = [this.passPortItem1, this.passPortItem2];
        passPortItems.forEach((item, idx) => {
            let reward = this.cfg.reward2[idx];
            if (reward) {
                item.node.active = true;
                item.updateItemInfo(reward[0], reward[1]);
                item.itemInfo = {
                    series: 0,
                    itemId: reward[0],
                    itemNum: reward[1],
                    type: BagUtils.getItemTypeById(reward[0]),
                    extInfo: null,
                }
            }
            else {
                item.node.active = false;
            }
        });

        this.updateRewardState();
    }

    updateRewardState() {
        let recevie1 = RelicUtils.getPassPortRewardState(this.cfg.taskid, 1);
        let recevie2 = RelicUtils.getPassPortRewardState(this.cfg.taskid, 2);
        this.freeItem.node.getChildByName('mask').active = recevie1;
        let recived = this.freeItem.node.getChildByName('sub_lingqu02');
        recived.active = recevie1;
        let passPortItems = [this.passPortItem1, this.passPortItem2];
        passPortItems.forEach((item, idx) => {
            if (item.node.active) {
                let lock = item.node.getChildByName('lock');
                let recived = item.node.getChildByName('sub_lingqu02');
                let mask = item.node.getChildByName('mask');
                recived.active = recevie2;
                recived.zIndex = 999
                if (!ModelManager.get(RelicModel).isBuyPassPort) {
                    lock.active = true;
                    lock.zIndex = 999
                    mask.active = true;
                }
                else {
                    lock.active = false;
                    mask.active = recevie2;
                }
            }
        });

        let label = this.getBtn.node.getChildByName('label').getComponent(cc.Label);
        this.getBtn.node.active = true;
        if (ModelManager.get(RoleModel).relic < this.cfg.point[1]) {
            this.received.active = false;
            this.getBtn.interactable = false;
            label.string = gdk.i18n.t('i18n:MINECOPY_PASSPORT_TIP4');
        }
        else {
            this.received.active = false;
            this.getBtn.interactable = true;
            if (!recevie1) {
                label.string = gdk.i18n.t('i18n:MINECOPY_PASSPORT_TIP4');
                return;
            }
            if (!recevie2) {
                label.string = gdk.i18n.t('i18n:MINECOPY_PASSPORT_TIP5');
            }
            else {
                this.received.active = true;
                this.getBtn.node.active = false;
            }
        }
    }

    onGetBtnClick() {
        let recevie1 = RelicUtils.getPassPortRewardState(this.cfg.taskid, 1);
        if (recevie1 && !ModelManager.get(RelicModel).isBuyPassPort) {
            //TODO
            // gdk.gui.showMessage('购买通行证后可继续领取');
            let cfgs = ConfigManager.getItemsByField(Relic_passCfg, 'cycle', this.cfg.cycle);
            gdk.panel.setArgs(PanelId.RelicPassPortBuyView, cfgs);
            gdk.panel.open(PanelId.RelicPassPortBuyView);
        }
        else {
            let req = new icmsg.RelicCertRewardReq();
            req.id = this.cfg.taskid
            NetManager.send(req, (resp: icmsg.RelicCertRewardRsp) => {
                GlobalUtil.openRewadrView(resp.list);
            });
        }
    }

    _onRelicCertRewardRsp(resp: icmsg.RelicCertRewardRsp) {
        if (this.cfg && resp.id == this.cfg.taskid) {
            this.updateRewardState();
        }
    }
}