import ConfigManager from '../../../../../common/managers/ConfigManager';
import FootHoldModel, { FhPointInfo } from '../FootHoldModel';
import GlobalUtil from '../../../../../common/utils/GlobalUtil';
import GuildUtils from '../../../utils/GuildUtils';
import ModelManager from '../../../../../common/managers/ModelManager';
import NetManager from '../../../../../common/managers/NetManager';
import RoleModel from '../../../../../common/models/RoleModel';
import StringUtils from '../../../../../common/utils/StringUtils';
import UiListItem from '../../../../../common/widgets/UiListItem';
import VipFlagCtrl from '../../../../../common/widgets/VipFlagCtrl';
import { Foothold_globalCfg } from '../../../../../a/config';
import { GuildMemberLocal } from '../../../model/GuildModel';

/*
 * @Author: luoyong 
 * @Date: 2020-02-11 15:03:17 
 * @Last Modified by: luoyong
 * @Last Modified time: 2021-05-25 21:02:48
 */
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("qszc/view/guild/footHold/gather/FHGatherInviteItemCtrl")
export default class FHGatherInviteItemCtrl extends UiListItem {

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    frame: cc.Node = null;

    @property(cc.Label)
    memberName: cc.Label = null;

    @property(cc.Label)
    powerLab: cc.Label = null;

    @property(cc.Label)
    state: cc.Label = null;

    @property(cc.Label)
    memberLv: cc.Label = null;

    @property(cc.Node)
    postionIcon: cc.Node = null;

    @property(cc.Label)
    teamNum: cc.Label = null;

    @property(cc.Node)
    vipFlag: cc.Node = null

    @property(cc.Button)
    btnInvite: cc.Button = null

    @property(cc.Node)
    hasGather: cc.Node = null;

    guildMember: GuildMemberLocal = null
    get footHoldModel(): FootHoldModel { return ModelManager.get(FootHoldModel); }
    get roleModel(): RoleModel { return ModelManager.get(RoleModel); }

    updateView() {
        this.guildMember = this.data
        GlobalUtil.setSpriteIcon(this.node, this.head, GlobalUtil.getHeadIconById(this.guildMember.head))
        GlobalUtil.setSpriteIcon(this.node, this.frame, GlobalUtil.getHeadFrameById(this.guildMember.frame))
        this.memberName.string = this.guildMember.name
        this.memberName.node.color = cc.color("#E5B88C")
        if (this.guildMember.id == this.roleModel.id) {
            this.memberName.node.color = cc.color("#00ff00")
        }
        this.powerLab.string = `${this.guildMember.power}`
        this.state.string = this.guildMember.logoutTime == 0 ? gdk.i18n.t("i18n:FOOTHOLD_TIP110") : ""
        this.memberLv.string = `.${this.guildMember.level.toString()}`

        let joinedNum = 0
        let gatherInfo: icmsg.FootholdTeamBrief = this.footHoldModel.gatherInviteInfos[this.guildMember.id]
        if (gatherInfo) {
            joinedNum = gatherInfo.joinedNum
        }

        let forces = ConfigManager.getItemById(Foothold_globalCfg, "forces").value[0]
        this.teamNum.string = StringUtils.format(gdk.i18n.t("i18n:FOOTHOLD_TIP111"), forces - joinedNum, forces)//`???????????????:(${forces - joinedNum}/${forces})`


        this.postionIcon.active = true
        if (this.guildMember.position >= 0) {
            let path = GuildUtils.getMemberTitlePath(this.guildMember.position)
            GlobalUtil.setSpriteIcon(this.node, this.postionIcon, `view/guild/texture/common/${path}`)
        } else {
            GlobalUtil.setSpriteIcon(this.node, this.postionIcon, `view/guild/texture/common/xzgh_xiezi`)
        }

        let vipCtrl = this.vipFlag.getComponent(VipFlagCtrl)
        vipCtrl.updateVipLv(this.guildMember.vipLv)

        let pos = this.footHoldModel.pointDetailInfo.pos
        let pointInfo: FhPointInfo = this.footHoldModel.warPoints[`${pos.x}-${pos.y}`]
        this.btnInvite.node.active = true
        this.hasGather.active = false
        let btnLab = cc.find("txt", this.btnInvite.node).getComponent(cc.Label)
        if (this.guildMember.id == this.roleModel.id) {
            btnLab.string = gdk.i18n.t("i18n:FOOTHOLD_TIP112")
            if (gatherInfo && gatherInfo.joined) {
                this.btnInvite.node.active = false
                this.hasGather.active = true
            }
        } else {
            btnLab.string = gdk.i18n.t("i18n:FOOTHOLD_TIP114")
            if (gatherInfo && gatherInfo.joined) {
                this.btnInvite.node.active = false
                this.hasGather.active = true
            }
        }
    }


    onInviteFunc() {
        let self = this
        if (this.guildMember.id == this.roleModel.id) {
            //?????????????????????
            let msg = new icmsg.FootholdGatherJoinReq()
            msg.pos = this.footHoldModel.pointDetailInfo.pos
            msg.index = 0
            NetManager.send(msg, () => {
                gdk.gui.showMessage(gdk.i18n.t("i18n:FOOTHOLD_TIP101"))
                self.btnInvite.node.active = false
                self.hasGather.active = true

                //?????????????????????????????????????????????
                let gMsg = new icmsg.FootholdGatherTeamReq()
                gMsg.pos = this.footHoldModel.pointDetailInfo.pos
                NetManager.send(gMsg)
            }, this)
        } else {
            let msg = new icmsg.FootholdGatherInviteReq()
            msg.pos = this.footHoldModel.pointDetailInfo.pos
            msg.targetId = this.guildMember.id
            NetManager.send(msg, () => {
                gdk.gui.showMessage(gdk.i18n.t("i18n:FOOTHOLD_TIP95"))
                self.btnInvite.interactable = false
                let lab = this.btnInvite.node.getChildByName("txt").getComponent(cc.Label)
                lab.string = gdk.i18n.t("i18n:FOOTHOLD_TIP96")
            }, this)
        }
    }
}