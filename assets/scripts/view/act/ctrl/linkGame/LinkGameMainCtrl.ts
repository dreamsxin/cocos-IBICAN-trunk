import ActivityUtils from '../../../../common/utils/ActivityUtils';
import ConfigManager from '../../../../common/managers/ConfigManager';
import GlobalUtil from '../../../../common/utils/GlobalUtil';
import ModelManager from '../../../../common/managers/ModelManager';
import PanelId from '../../../../configs/ids/PanelId';
import RedPointCtrl from '../../../../common/widgets/RedPointCtrl';
import StoreModel from '../../../store/model/StoreModel';
import { Store_pushCfg } from '../../../../a/config';
import { StoreEventId } from '../../../store/enum/StoreEventId';

/** 
  * @Author: jiangping  
  * @Description: 
  * @Date: 2021-04-25 11:38:51 
  */
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("qszc/view/act/linkGame/LinkGameMainCtrl")
export default class LinkGameMainCtrl extends gdk.BasePanel {

    // @property(UiTabMenuCtrl)
    // tabMenu: UiTabMenuCtrl = null;

    @property(cc.Node)
    tabBtns: cc.Node[] = [];

    @property(cc.Node)
    panelParent: cc.Node = null;

    @property({ type: cc.String })
    _panelNames: string[] = [];

    @property({ type: gdk.PanelId, tooltip: "子界面，如果没可选值，请先配置gdk.PanelId" })
    get panels() {
        let ret = [];
        for (let i = 0; i < this._panelNames.length; i++) {
            ret[i] = gdk.PanelId[this._panelNames[i]] || 0;
        }
        return ret;
    }
    set panels(value) {
        this._panelNames = [];
        for (let i = 0; i < value.length; i++) {
            this._panelNames[i] = gdk.PanelId[value[i]];
        }
    }

    get storeModel(): StoreModel { return ModelManager.get(StoreModel); }
    panelIndex: number = -1;    // 当前打开的界面索引
    first: boolean = true;
    onEnable() {
        this.scheduleOnce(this.checkArgs, 0);
        gdk.e.on(StoreEventId.UPDATE_PAY_SUCC, this._onPaySucc, this);
        gdk.e.on("popup#LinkGameGiftView#close", this._hideLinkGameGiftViewFunc, this);
    }
    onDisable() {
        gdk.e.off("popup#LinkGameGiftView#close", this._hideLinkGameGiftViewFunc, this);
        gdk.Timer.clearAll(this);
        this.unschedule(this.checkArgs);
        // 关闭打开或打开中的子界面
        for (let i = 0, n = this._panelNames.length; i < n; i++) {
            let panelId = gdk.PanelId.getValue(this._panelNames[i]);
            if (panelId) {
                gdk.panel.hide(panelId);
            }
        }
        this.panelIndex = -1;
        this._onPanelShow = null;

        this.storeModel.starGiftDatas = this.storeModel.starGiftDatas
    }

    _onPaySucc(e: gdk.Event) {
        let data = <icmsg.PaySuccRsp>e.data;
        let cfg = ConfigManager.getItemById(Store_pushCfg, data.paymentId);
        if (cfg && cfg.event_type == 3) {
            GlobalUtil.openRewadrView(data.list);
        }
    }

    @gdk.binding('storeModel.starGiftDatas')
    _updateBtns() {
        if (ActivityUtils.getLinkGameGiftDatas().length == 0) {
            this.tabBtns[1].active = false;
            this.selectFunc(999, 0);
        }
    }

    _hideLinkGameGiftViewFunc() {
        this.tabBtns[1].active = ActivityUtils.getLinkGameGiftDatas().length > 0;
        if (!this.tabBtns[1].active) {
            this.selectFunc(999, 0);
        }
    }


    /**
     * 打开角色面板,额外参数可带一个次级面板数据,
     * 0:强化界面 1:突破界面 2:镶嵌界面 3:附魔界面 4:融合界面 5.符文合成
     */
    _onPanelShow: (node?: cc.Node) => void;   // 当子界面打开时回调
    checkArgs() {
        // //初始化按钮状态
        // let actCfg = ActUtil.getCfgByActId(92);
        // let rewardCfgs = ConfigManager.getItemsByField(Twist_eggCfg, "type", actCfg.reward_type)

        this.tabBtns[0].active = true
        this.tabBtns[1].active = false
        // if (ActivityUtils.getUseTwistEggTime() < rewardCfgs.length) {
        //     this.tabBtns[0].active = true
        // }
        if (ActivityUtils.getLinkGameGiftDatas().length > 0) {
            this.tabBtns[1].active = true
        }
        let args = gdk.panel.getArgs(PanelId.LuckyTwistMain)
        let idx = 0;
        if (args && args.length > 0) {
            // 有外部参数
            if (args[0] instanceof Array) {
                args = args[0];
            }
            // 更新当前选中的下层子界面索引
            idx = args[0];

        } else {
            // 没有参数时
            idx = 0;
            if (!this.tabBtns[0].active) {
                idx = 1;
            }
        }

        this.selectFunc(999, idx)
    }
    selectFunc(e: any, utype: any) {
        if (!e) return;
        utype = utype ? parseInt(utype) : 0;
        if (utype == this.panelIndex) {
            return
        }

        for (let i = 0; i < this.tabBtns.length; i++) {
            let node = this.tabBtns[i]
            let select = node.getChildByName("select")
            let normal = node.getChildByName("normal")
            select.active = utype == i
            normal.active = utype != i
        }

        if (this.panelIndex > -1) {
            let panelId = gdk.PanelId.getValue(this._panelNames[this.panelIndex]);
            if (panelId) {
                gdk.panel.hide(panelId);
            }
            this.panelIndex = -1;
        }
        // 打开新的子界面
        let panelId = gdk.PanelId.getValue(this._panelNames[utype]);

        if (panelId) {
            gdk.panel.open(
                panelId,
                this._onPanelShow,
                this,
                {
                    parent: this.panelParent
                },
            );
        }
        this.panelIndex = utype;
        this._updateSelectBtns();
    }

    /**更新按钮红点状态 */
    _updateSelectBtns() {
        gdk.Timer.once(100, this, this._updateSelectBtnsLater);
    }
    _updateSelectBtnsLater() {
        if (!cc.isValid(this.node)) return;
        if (!this.enabledInHierarchy) return;
        let toggleItems = this.tabBtns
        for (let i = 0, n = toggleItems.length; i < n; i++) {
            let toggle = toggleItems[i];
            let ctrl = toggle.getComponent(RedPointCtrl);
            if (ctrl) {
                ctrl.isShow = this.toggleRedPointHandle(i);
            }
        }
    }

    // tab按钮的额外红点逻辑
    toggleRedPointHandle(index: string | number) {
        let panelId = gdk.PanelId.getValue(this._panelNames[index]);
        if (panelId) {
            return !gdk.panel.isOpenOrOpening(panelId);
        }
        return false;
    }
}
