import ConfigManager from '../../../common/managers/ConfigManager';
import GlobalUtil from '../../../common/utils/GlobalUtil';
import GuildModel, { GuildMemberLocal } from '../model/GuildModel';
import GuildUtils from '../utils/GuildUtils';
import ModelManager from '../../../common/managers/ModelManager';
import NetManager from '../../../common/managers/NetManager';
import PanelId from '../../../configs/ids/PanelId';
import RoleModel from '../../../common/models/RoleModel';
import ServerModel from '../../../common/models/ServerModel';
import StringUtils from '../../../common/utils/StringUtils';
import { Guild_lvCfg } from '../../../a/config';
import { GuildEventId } from '../enum/GuildEventId';
import { ListView, ListViewDir } from '../../../common/widgets/UiListview';

/*
 * @Author: luoyong 
 * @Date: 2020-02-11 15:03:17 
 * @Last Modified by: luoyong
 * @Last Modified time: 2021-02-02 16:50:25
 */
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("qszc/view/guild/GuildJoinCtrl")
export default class GuildJoinCtrl extends gdk.BasePanel {

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    frame: cc.Node = null;

    @property(cc.Node)
    bottom: cc.Node = null;

    @property(cc.Label)
    guildNumTitle: cc.Label = null;

    @property(cc.Label)
    guildNum: cc.Label = null;

    @property(cc.Label)
    guildName: cc.Label = null;

    @property(cc.Label)
    guildLv: cc.Label = null;

    @property(cc.Label)
    power: cc.Label = null;

    @property(cc.RichText)
    guildNotice: cc.RichText = null;

    @property(cc.Label)
    limitLv: cc.Label = null;

    @property(cc.Label)
    memberNum: cc.Label = null;

    @property(cc.Label)
    checkType: cc.Label = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Node)
    content: cc.Node = null

    @property(cc.Node)
    btnJoin: cc.Node = null

    @property(cc.Prefab)
    guildJoinMemberItem: cc.Prefab = null

    list: ListView = null;
    guildId: number = 0

    _isCross = false

    get model() { return ModelManager.get(GuildModel); }
    get roleModel() { return ModelManager.get(RoleModel); }

    onLoad() {

    }

    start() {

    }

    onEnable() {
        let args = gdk.panel.getArgs(PanelId.GuildJoin)
        let guildId = args[0]
        this._isCross = args[1]
        gdk.e.emit(GuildEventId.REQ_GUILD_DETAIL, guildId)

        this.btnJoin.active = this.roleModel.guildId <= 0
        if (this.btnJoin.active) {
            this.scrollView.node.height = 370
            this.content.height = 370
        } else {
            this.scrollView.node.height = 450
            this.content.height = 450
        }
    }

    onDisable() {
        gdk.e.targetOff(this)
    }

    onDestroy() {

    }

    _initListView() {
        if (this.list) {
            return
        }
        this.list = new ListView({
            scrollview: this.scrollView,
            mask: this.scrollView.node,
            content: this.content,
            item_tpl: this.guildJoinMemberItem,
            cb_host: this,
            async: true,
            gap_y: 5,
            direction: ListViewDir.Vertical,
        })
    }

    @gdk.binding("model.guildDetail")
    async updateGuildDetail() {
        if (!this.model.guildDetail) {
            return
        }
        let guildId = this.model.guildDetail.info.id
        await ModelManager.get(ServerModel).reqServerNameByIds([guildId], 2);

        GlobalUtil.setSpriteIcon(this.node, this.icon, GuildUtils.getIcon(this.model.guildDetail.info.icon))
        GlobalUtil.setSpriteIcon(this.node, this.frame, GuildUtils.getIcon(this.model.guildDetail.info.frame))
        GlobalUtil.setSpriteIcon(this.node, this.bottom, GuildUtils.getIcon(this.model.guildDetail.info.bottom))

        this.guildNum.string = `${this.model.guildDetail.info.id}`
        this.guildName.string = `${this.model.guildDetail.info.name}`
        this.guildLv.string = `${this.model.guildDetail.info.level}`
        this.power.string = `${this.model.guildDetail.info.maxPower}`

        this.guildNotice.string = this.model.guildDetail.notice ? this.model.guildDetail.notice : gdk.i18n.t("i18n:GUILD_TIP22")
        this.limitLv.string = `${this.model.guildDetail.minLevel}`
        let cfg = ConfigManager.getItemByField(Guild_lvCfg, "clv", this.model.guildDetail.info.level)
        this.memberNum.string = `${this.model.guildDetail.info.num}/${cfg.number}`
        this.checkType.string = this.model.guildDetail.autoJoin ? gdk.i18n.t("i18n:GUILD_TIP23") : gdk.i18n.t("i18n:GUILD_TIP24")
        this._initListView()
        let members = this.model.guildDetail.members
        GlobalUtil.sortArray(members, this.sortPositionFunc)
        this.list.set_data(members)

        if (this._isCross) {
            this.guildNumTitle.string = gdk.i18n.t("i18n:GUILD_TIP51")//`?????????`
            this.guildNum.string = `[s${GlobalUtil.getSeverIdByGuildId(guildId)}]`
            this.guildNum.string += ModelManager.get(ServerModel).serverNameMap[Math.floor(guildId / 10000)]
        }
    }

    joinFunc() {
        if (this.model.guildDetail.info.num >= GuildUtils.getMaxNum()) {
            gdk.gui.showMessage(gdk.i18n.t("i18n:GUILD_TIP25"))
            return
        }

        if (this.roleModel.level < this.model.guildDetail.minLevel) {
            gdk.gui.showMessage(StringUtils.format(gdk.i18n.t("i18n:GUILD_TIP26"), this.model.guildDetail.minLevel))//`????????????${this.model.guildDetail.minLevel}????????????????????????`
            return
        }

        if (!this.model.guildDetail.autoJoin) {
            // gdk.gui.showMessage("????????????????????????????????????????????????")
            this.sendJoin()
            this.close()
            return
        } else {
            this.sendJoin()
            this.close()
        }
    }


    sendJoin() {
        let msg = new icmsg.GuildJoinReq()
        msg.guildId = this.model.guildDetail.info.id
        let self = this
        NetManager.send(msg, (data: icmsg.GuildJoinRsp) => {
            // //????????????
            // if (data.error == -1) {
            //     gdk.gui.showMessage("?????????????????????????????????")
            // } else if (data.error == 0) {
            //     if (data.guildId && data.camp) {
            //         gdk.gui.showMessage(`????????????${data.camp.guild.name}??????`)
            //         self.roleModel.guildId = data.guildId
            //         self.roleModel.guildName = data.camp.guild.name
            //         gdk.panel.open(PanelId.GuildMain)

            //         // let msg2 = new FootholdRedPointsReq()
            //         // NetManager.send(msg2)
            //         let reqList = [
            //             FootholdRedPointsReq,
            //             GuildBossStateReq
            //         ]
            //         reqList.forEach(element => {
            //             let clz = element;
            //             if (clz) {
            //                 NetManager.send(new clz());
            //             }
            //         })
            //     }
            // } else {
            //     gdk.gui.showMessage(ErrorManager.get(data.error))
            // }
        }, this)
    }

    /**???????????? */
    sortPositionFunc(a: any, b: any) {
        let infoA = <GuildMemberLocal>a
        let infoB = <GuildMemberLocal>b
        if (infoA.position == infoB.position) {
            if (infoA.logoutTime == 0) {
                return -1
            } else if (infoB.logoutTime == 0) {
                return 1
            } else {
                return infoB.logoutTime - infoA.logoutTime
            }
        }
        return infoB.position - infoA.position
    }

}